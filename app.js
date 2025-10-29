// ========================================
// POKEMON TAMAGOTCHI - APP PRINCIPAL
// ========================================

import localforage from 'localforage';

// Configuración
const CONFIG = {
    STAT_DECAY_INTERVAL: 30000, // 30 segundos
    STAT_DECAY_AMOUNT: 5,
    SAVE_INTERVAL: 10000, // 10 segundos
    MAX_STAT: 100,
    MIN_STAT: 0,
    EVOLUTION_LEVEL: 16,
    GEN1_MAX_ID: 151,
    ANIMATION_FPS: 60,
};

// Estado del juego
let gameState = {
    hunger: 100,
    happiness: 100,
    energy: 100,
    level: 1,
    experience: 0,
    name: 'Pikachu',
    pokemonId: 25,
    pokemonData: null,
    isSleeping: false,
    isGameOver: false,
    lastUpdate: Date.now(),
};

// Canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const evolutionCanvas = document.getElementById('evolutionCanvas');
const evolutionCtx = evolutionCanvas.getContext('2d');

// Sprites y animaciones
let currentSprite = new Image();
let spriteLoaded = false;
let animationFrame = 0;
let animationState = 'idle'; // idle, happy, sad, sleeping
let spriteOffset = { x: 0, y: 0 };

// Timers
let statDecayTimer = null;
let autoSaveTimer = null;
let animationTimer = null;

// ========================================
// INICIALIZACIÓN
// ========================================

async function init() {
    console.log('🎮 Inicializando Pokémon Tamagotchi...');
    
    // Configurar localforage
    localforage.config({
        name: 'PokemonTamagotchi',
        storeName: 'gameData',
    });

    // Cargar estado guardado
    await loadGameState();

    // Configurar event listeners
    setupEventListeners();

    // Cargar Pokémon inicial
    await loadPokemon(gameState.pokemonId);

    // Iniciar loops
    startGameLoops();

    console.log('✅ Juego iniciado correctamente');
}

// ========================================
// GESTIÓN DE ESTADO
// ========================================

async function loadGameState() {
    try {
        const savedState = await localforage.getItem('tamagotchiState');
        if (savedState) {
            // Calcular tiempo transcurrido
            const timeDiff = Date.now() - savedState.lastUpdate;
            const missedIntervals = Math.floor(timeDiff / CONFIG.STAT_DECAY_INTERVAL);
            
            // Aplicar decay por tiempo offline
            gameState = {
                ...savedState,
                hunger: Math.max(0, savedState.hunger - (missedIntervals * CONFIG.STAT_DECAY_AMOUNT)),
                happiness: Math.max(0, savedState.happiness - (missedIntervals * CONFIG.STAT_DECAY_AMOUNT)),
                energy: Math.max(0, savedState.energy - (missedIntervals * CONFIG.STAT_DECAY_AMOUNT)),
                lastUpdate: Date.now(),
            };
            
            console.log(`⏰ Tiempo offline: ${Math.round(timeDiff / 1000)}s, Intervalos perdidos: ${missedIntervals}`);
        }
    } catch (error) {
        console.error('Error cargando estado:', error);
    }
}

async function saveGameState() {
    try {
        gameState.lastUpdate = Date.now();
        await localforage.setItem('tamagotchiState', gameState);
        console.log('💾 Estado guardado');
    } catch (error) {
        console.error('Error guardando estado:', error);
    }
}

function updateUI() {
    // Actualizar barras de stats
    document.getElementById('hungerBar').style.width = `${gameState.hunger}%`;
    document.getElementById('hungerValue').textContent = Math.round(gameState.hunger);
    
    document.getElementById('happinessBar').style.width = `${gameState.happiness}%`;
    document.getElementById('happinessValue').textContent = Math.round(gameState.happiness);
    
    document.getElementById('energyBar').style.width = `${gameState.energy}%`;
    document.getElementById('energyValue').textContent = Math.round(gameState.energy);
    
    // Actualizar info del Pokémon
    document.getElementById('pokemonName').textContent = gameState.name;
    document.getElementById('pokemonLevel').textContent = `Nivel: ${gameState.level}`;
    
    // Verificar game over
    if (gameState.hunger <= 0 || gameState.happiness <= 0 || gameState.energy <= 0) {
        if (!gameState.isGameOver) {
            gameOver();
        }
    }
}

// ========================================
// POKÉAPI - CARGA DE DATOS
// ========================================

async function loadPokemon(pokemonId) {
    try {
        console.log(`🔍 Cargando Pokémon ID: ${pokemonId}`);
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const data = await response.json();
        gameState.pokemonData = data;
        gameState.pokemonId = data.id;
        gameState.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        
        // Actualizar tipos
        updatePokemonTypes(data.types);
        
        // Cargar sprite
        await loadSprite(data);
        
        // Actualizar UI
        updateUI();
        
        console.log(`✅ ${gameState.name} cargado correctamente`);
        
    } catch (error) {
        console.error('Error cargando Pokémon:', error);
        alert('Error al cargar el Pokémon. Intenta con otro nombre o ID.');
    }
}

function updatePokemonTypes(types) {
    const typesContainer = document.getElementById('pokemonTypes');
    typesContainer.innerHTML = '';
    
    types.forEach(({ type }) => {
        const badge = document.createElement('span');
        badge.className = `type-badge type-${type.name}`;
        badge.textContent = type.name;
        typesContainer.appendChild(badge);
    });
}

async function loadSprite(data) {
    return new Promise((resolve, reject) => {
        // Priorizar sprites pixel art pequeños
        const spriteUrl = data.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default ||
                         data.sprites.versions?.['generation-v']?.['black-white']?.front_default ||
                         data.sprites.front_default ||
                         data.sprites.other['official-artwork']?.front_default;
        
        if (!spriteUrl) {
            reject(new Error('No sprite disponible'));
            return;
        }
        
        currentSprite.onload = () => {
            spriteLoaded = true;
            console.log('🎨 Sprite cargado');
            resolve();
        };
        
        currentSprite.onerror = () => {
            reject(new Error('Error cargando sprite'));
        };
        
        currentSprite.src = spriteUrl;
    });
}

// ========================================
// RENDERIZADO Y ANIMACIONES
// ========================================

function render() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!spriteLoaded) {
        ctx.fillStyle = '#333';
        ctx.font = '16px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText('Cargando...', canvas.width / 2, canvas.height / 2);
        return;
    }
    
    // Aplicar animaciones según estado
    ctx.save();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.translate(centerX, centerY);
    
    // Animaciones
    switch (animationState) {
        case 'happy':
            // Animación de salto
            const bounceHeight = Math.sin(animationFrame * 0.2) * 30;
            ctx.translate(0, -Math.abs(bounceHeight));
            break;
            
        case 'sad':
            // Animación de temblor
            const shakeX = Math.sin(animationFrame * 0.5) * 5;
            ctx.translate(shakeX, 0);
            break;
            
        case 'sleeping':
            // Animación de parpadeo lento
            const pulseAlpha = 0.7 + Math.sin(animationFrame * 0.05) * 0.3;
            ctx.globalAlpha = pulseAlpha;
            break;
            
        case 'idle':
        default:
            // Parpadeo sutil
            if (animationFrame % 120 === 0 || animationFrame % 120 === 1) {
                ctx.globalAlpha = 0.3;
            }
            break;
    }
    
    // Dibujar sprite (más pequeño, estilo Tamagotchi)
    const spriteSize = 80;
    ctx.drawImage(
        currentSprite,
        -spriteSize / 2,
        -spriteSize / 2,
        spriteSize,
        spriteSize
    );
    
    // Dibujar estado de sueño
    if (gameState.isSleeping) {
        ctx.font = '24px Arial';
        ctx.fillText('💤', 30, -40);
    }
    
    ctx.restore();
    
    animationFrame++;
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

// ========================================
// MECÁNICAS TAMAGOTCHI
// ========================================

function feedPokemon() {
    if (gameState.isGameOver || gameState.isSleeping) return;
    
    gameState.hunger = Math.min(CONFIG.MAX_STAT, gameState.hunger + 20);
    gameState.happiness = Math.min(CONFIG.MAX_STAT, gameState.happiness + 5);
    
    // Animación
    animationState = 'happy';
    setTimeout(() => {
        animationState = 'idle';
    }, 1000);
    
    // Ganar experiencia
    addExperience(5);
    
    updateUI();
    playSound('feed');
}

function playWithPokemon() {
    if (gameState.isGameOver || gameState.isSleeping) return;
    
    if (gameState.energy < 10) {
        alert('¡Tu Pokémon está muy cansado! Necesita dormir.');
        animationState = 'sad';
        setTimeout(() => {
            animationState = 'idle';
        }, 1000);
        return;
    }
    
    gameState.happiness = Math.min(CONFIG.MAX_STAT, gameState.happiness + 15);
    gameState.energy = Math.max(CONFIG.MIN_STAT, gameState.energy - 10);
    
    // Animación
    animationState = 'happy';
    setTimeout(() => {
        animationState = 'idle';
    }, 2000);
    
    // Mini-juego simple (click en el canvas)
    startMiniGame();
    
    // Ganar experiencia
    addExperience(10);
    
    updateUI();
    playSound('play');
}

function sleepPokemon() {
    if (gameState.isGameOver) return;
    
    if (gameState.isSleeping) {
        // Despertar
        gameState.isSleeping = false;
        animationState = 'idle';
        document.getElementById('sleepBtn').innerHTML = '<span>💤</span><span>Dormir</span>';
        startStatDecay();
        playSound('wake');
    } else {
        // Dormir
        gameState.isSleeping = true;
        gameState.energy = Math.min(CONFIG.MAX_STAT, gameState.energy + 30);
        animationState = 'sleeping';
        document.getElementById('sleepBtn').innerHTML = '<span>☀️</span><span>Despertar</span>';
        stopStatDecay();
        playSound('sleep');
    }
    
    updateUI();
}

function startMiniGame() {
    let clicks = 0;
    const targetClicks = 5;
    
    const clickHandler = (e) => {
        clicks++;
        
        // Efecto visual
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (clicks >= targetClicks) {
            canvas.removeEventListener('click', clickHandler);
            gameState.happiness = Math.min(CONFIG.MAX_STAT, gameState.happiness + 10);
            updateUI();
        }
    };
    
    canvas.addEventListener('click', clickHandler);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        canvas.removeEventListener('click', clickHandler);
    }, 5000);
}

function addExperience(amount) {
    gameState.experience += amount;
    
    // Calcular si sube de nivel
    const expForNextLevel = gameState.level * 20;
    if (gameState.experience >= expForNextLevel) {
        gameState.level++;
        gameState.experience = 0;
        
        console.log(`🎉 ¡Nivel ${gameState.level}!`);
        
        // Verificar evolución
        if (gameState.level >= CONFIG.EVOLUTION_LEVEL) {
            checkEvolution();
        }
    }
}

async function checkEvolution() {
    try {
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${gameState.pokemonId}`);
        const speciesData = await speciesResponse.json();
        
        const chainResponse = await fetch(speciesData.evolution_chain.url);
        const chainData = await chainResponse.json();
        
        // Buscar siguiente evolución
        const nextEvolution = findNextEvolution(chainData.chain, gameState.name.toLowerCase());
        
        if (nextEvolution) {
            await evolve(nextEvolution);
        }
    } catch (error) {
        console.error('Error verificando evolución:', error);
    }
}

function findNextEvolution(chain, currentName) {
    if (chain.species.name === currentName) {
        if (chain.evolves_to.length > 0) {
            return chain.evolves_to[0].species.name;
        }
    }
    
    for (const evolution of chain.evolves_to) {
        const result = findNextEvolution(evolution, currentName);
        if (result) return result;
    }
    
    return null;
}

async function evolve(newPokemonName) {
    console.log(`🌟 ¡Evolucionando a ${newPokemonName}!`);
    
    // Mostrar pantalla de evolución
    document.getElementById('evolutionScreen').classList.remove('hidden');
    
    // Animación de evolución (simplificada)
    evolutionCtx.clearRect(0, 0, evolutionCanvas.width, evolutionCanvas.height);
    evolutionCtx.fillStyle = 'white';
    evolutionCtx.font = '20px "Press Start 2P"';
    evolutionCtx.textAlign = 'center';
    evolutionCtx.fillText('Evolucionando...', evolutionCanvas.width / 2, evolutionCanvas.height / 2);
    
    // Esperar 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Cargar nuevo Pokémon
    await loadPokemon(newPokemonName);
    
    // Ocultar pantalla
    document.getElementById('evolutionScreen').classList.add('hidden');
    
    playSound('evolve');
}

// ========================================
// DECAY DE STATS
// ========================================

function startStatDecay() {
    stopStatDecay();
    
    statDecayTimer = setInterval(() => {
        if (!gameState.isSleeping && !gameState.isGameOver) {
            gameState.hunger = Math.max(CONFIG.MIN_STAT, gameState.hunger - CONFIG.STAT_DECAY_AMOUNT);
            gameState.happiness = Math.max(CONFIG.MIN_STAT, gameState.happiness - CONFIG.STAT_DECAY_AMOUNT);
            gameState.energy = Math.max(CONFIG.MIN_STAT, gameState.energy - CONFIG.STAT_DECAY_AMOUNT);
            
            updateUI();
            
            // Cambiar animación según stats
            if (gameState.hunger < 30 || gameState.happiness < 30 || gameState.energy < 30) {
                if (animationState !== 'happy') {
                    animationState = 'sad';
                }
            }
        }
    }, CONFIG.STAT_DECAY_INTERVAL);
}

function stopStatDecay() {
    if (statDecayTimer) {
        clearInterval(statDecayTimer);
        statDecayTimer = null;
    }
}

// ========================================
// GAME OVER Y RESET
// ========================================

function gameOver() {
    gameState.isGameOver = true;
    stopStatDecay();
    animationState = 'sad';
    
    document.getElementById('gameOverScreen').classList.remove('hidden');
    playSound('faint');
    
    console.log('💀 Game Over');
}

async function resetGame() {
    // Restablecer estado
    gameState = {
        hunger: 100,
        happiness: 100,
        energy: 100,
        level: 1,
        experience: 0,
        name: 'Pikachu',
        pokemonId: 25,
        pokemonData: null,
        isSleeping: false,
        isGameOver: false,
        lastUpdate: Date.now(),
    };
    
    // Ocultar pantallas
    document.getElementById('gameOverScreen').classList.add('hidden');
    
    // Reiniciar
    await loadPokemon(gameState.pokemonId);
    startStatDecay();
    animationState = 'idle';
    
    updateUI();
}

async function loadRandomPokemon() {
    const randomId = Math.floor(Math.random() * CONFIG.GEN1_MAX_ID) + 1;
    await loadPokemon(randomId);
    
    // Reset stats
    gameState.hunger = 100;
    gameState.happiness = 100;
    gameState.energy = 100;
    gameState.level = 1;
    gameState.experience = 0;
    gameState.isGameOver = false;
    gameState.isSleeping = false;
    
    animationState = 'idle';
    updateUI();
}

async function searchPokemon() {
    const searchValue = document.getElementById('pokemonSearch').value.trim().toLowerCase();
    if (!searchValue) return;
    
    await loadPokemon(searchValue);
    
    // Reset stats
    gameState.hunger = 100;
    gameState.happiness = 100;
    gameState.energy = 100;
    gameState.level = 1;
    gameState.experience = 0;
    gameState.isGameOver = false;
    gameState.isSleeping = false;
    
    animationState = 'idle';
    updateUI();
    
    document.getElementById('pokemonSearch').value = '';
}

// ========================================
// SONIDOS
// ========================================

function playSound(type) {
    // Sonidos simples con beep
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch (type) {
        case 'feed':
            oscillator.frequency.value = 440;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'play':
            oscillator.frequency.value = 523;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'sleep':
            oscillator.frequency.value = 349;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'wake':
            oscillator.frequency.value = 659;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'faint':
            oscillator.frequency.value = 220;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
        case 'evolve':
            oscillator.frequency.value = 880;
            gainNode.gain.value = 0.1;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    document.getElementById('feedBtn').addEventListener('click', feedPokemon);
    document.getElementById('playBtn').addEventListener('click', playWithPokemon);
    document.getElementById('sleepBtn').addEventListener('click', sleepPokemon);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    document.getElementById('restartBtn').addEventListener('click', resetGame);
    document.getElementById('randomBtn').addEventListener('click', loadRandomPokemon);
    document.getElementById('searchBtn').addEventListener('click', searchPokemon);
    
    document.getElementById('pokemonSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });
}

// ========================================
// LOOPS DEL JUEGO
// ========================================

function startGameLoops() {
    // Loop de animación
    animate();
    
    // Loop de decay de stats
    startStatDecay();
    
    // Loop de auto-guardado
    autoSaveTimer = setInterval(() => {
        saveGameState();
    }, CONFIG.SAVE_INTERVAL);
}

// ========================================
// INICIO
// ========================================

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Guardar antes de cerrar
window.addEventListener('beforeunload', () => {
    saveGameState();
});
