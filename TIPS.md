# 💡 Tips y Trucos

## Estrategias de Juego

### 🎯 Mantener Stats Óptimos

**Rutina Básica:**
1. **Cada hora**: Alimentar y jugar
2. **Antes de dormir (real)**: Poner a dormir al Pokémon
3. **Al despertar**: Despertar y alimentar

**Stats Críticos:**
- 🟢 Verde (70-100): Pokémon feliz
- 🟡 Amarillo (30-69): Necesita atención
- 🔴 Rojo (0-29): ¡Emergencia!

### ⚡ Ganar Experiencia Rápido

**Mejores Métodos:**
- Jugar (10 XP) > Alimentar (5 XP)
- Completar mini-juego: +10 XP bonus
- Mantener felicidad alta para más interacciones

**Cálculo de Nivel:**
- Nivel 2: 20 XP
- Nivel 3: 40 XP total
- Nivel 16: 320 XP total

### 🔄 Evolución Estratégica

**Pokémon que NO evolucionan:**
- Legendarios (ej: Articuno, Zapdos, Moltres)
- Pokémon de una sola etapa (ej: Pinsir, Tauros)

**Mejores para evoluciones múltiples:**
- Bulbasaur → Ivysaur → Venusaur
- Charmander → Charmeleon → Charizard
- Squirtle → Wartortle → Blastoise
- Dratini → Dragonair → Dragonite

---

## 🎨 Customización

### Modificar Colores del Tema

En `styles.css`, busca `:root`:

```css
:root {
    --pokemon-yellow: #ffcb05;  /* Color principal */
    --pokemon-blue: #3d7dca;    /* Botones secundarios */
    --pokemon-red: #ff0000;     /* Game over */
}
```

**Temas Alternativos:**

**Modo Oscuro:**
```css
--pokemon-yellow: #ffd700;
--pokemon-blue: #1e3a8a;
--bg-primary: #1a1a1a;
--bg-secondary: #0a0a0a;
```

**Tema Fuego:**
```css
--pokemon-yellow: #ff6b35;
--pokemon-blue: #ff8c42;
--pokemon-red: #8b0000;
```

### Cambiar Velocidad del Juego

En `app.js`, modifica `CONFIG`:

```javascript
const CONFIG = {
    STAT_DECAY_INTERVAL: 30000, // Cambiar a 60000 para modo fácil
    STAT_DECAY_AMOUNT: 5,        // Cambiar a 3 para menos decay
    EVOLUTION_LEVEL: 16,         // Cambiar a 10 para evolución rápida
};
```

### Añadir Más Pokémon de Inicio

```javascript
const STARTER_POKEMON = [25, 1, 4, 7, 150]; // Pikachu, Bulbasaur, Charmander, Squirtle, Mewtwo

function loadRandomStarter() {
    const randomIndex = Math.floor(Math.random() * STARTER_POKEMON.length);
    loadPokemon(STARTER_POKEMON[randomIndex]);
}
```

---

## 🐛 Debugging

### Ver Estado Actual en Consola

Abre DevTools (F12) y ejecuta:

```javascript
// Ver estado completo
console.log(gameState);

// Ver stats específicos
console.log(`Hambre: ${gameState.hunger}`);
console.log(`Felicidad: ${gameState.happiness}`);
console.log(`Energía: ${gameState.energy}`);
```

### Restaurar Stats Manualmente

```javascript
// En la consola del navegador
gameState.hunger = 100;
gameState.happiness = 100;
gameState.energy = 100;
```

### Forzar Evolución

```javascript
gameState.level = 16;
addExperience(1);
```

### Limpiar LocalStorage

```javascript
// En consola
localforage.clear();
location.reload();
```

---

## 🎮 Easter Eggs y Secretos

### Pokémon Especiales

**Legendarios Gen 1:**
- Articuno: `144`
- Zapdos: `145`
- Moltres: `146`
- Mewtwo: `150`
- Mew: `151`

**Favoritos Clásicos:**
- Pikachu: `25`
- Charizard: `6`
- Gyarados: `130`
- Dragonite: `149`

### Comandos de Consola Secretos

```javascript
// God Mode - Stats infinitos
setInterval(() => {
    gameState.hunger = 100;
    gameState.happiness = 100;
    gameState.energy = 100;
}, 1000);

// XP Boost
gameState.experience = 300;

// Cambiar nombre
gameState.name = "Mi Mejor Amigo";
```

---

## 📱 Mobile Tips

### Gestos Táctiles

- **Tap en canvas**: Interactuar durante mini-juego
- **Doble tap**: (Futuro) Acariciar Pokémon
- **Swipe**: (Futuro) Cambiar entre Pokémon

### Optimización Mobile

**Para mejor rendimiento:**
1. Cierra apps en segundo plano
2. Usa modo horizontal para mejor visualización
3. Añade a pantalla de inicio (PWA)

**Añadir a Inicio (Chrome Mobile):**
1. Menú (⋮)
2. "Añadir a pantalla de inicio"
3. Nombre: "Pokémon Tamagotchi"

---

## 🔧 Desarrollo Avanzado

### Añadir Nuevas Animaciones

En `app.js`, función `render()`:

```javascript
case 'custom':
    // Tu animación personalizada
    const rotation = Math.sin(animationFrame * 0.1);
    ctx.rotate(rotation);
    break;
```

### Nuevo Sistema de Comida

```javascript
const FOOD_TYPES = {
    berry: { hunger: +10, happiness: +5 },
    potion: { energy: +20, happiness: +3 },
    rare_candy: { level: +1, happiness: +10 },
};

function feedWithType(foodType) {
    const food = FOOD_TYPES[foodType];
    gameState.hunger += food.hunger || 0;
    gameState.happiness += food.happiness || 0;
    // ...
}
```

### Sistema de Achievements

```javascript
const ACHIEVEMENTS = {
    first_feed: { title: "Primera comida", condition: () => feedCount >= 1 },
    level_10: { title: "Nivel 10", condition: () => gameState.level >= 10 },
    evolution: { title: "Evolución", condition: () => hasEvolved },
};

function checkAchievements() {
    Object.entries(ACHIEVEMENTS).forEach(([key, achievement]) => {
        if (achievement.condition() && !unlockedAchievements.includes(key)) {
            unlockAchievement(key);
        }
    });
}
```

---

## 📊 Estadísticas

### Ver Tiempo Jugado

```javascript
// Añadir a gameState
gameState.startTime = Date.now();

// Calcular
const playTime = Math.floor((Date.now() - gameState.startTime) / 1000);
const hours = Math.floor(playTime / 3600);
const minutes = Math.floor((playTime % 3600) / 60);
console.log(`Tiempo jugado: ${hours}h ${minutes}m`);
```

### Contador de Interacciones

```javascript
let stats = {
    totalFeeds: 0,
    totalPlays: 0,
    totalSleeps: 0,
};

// Incrementar en cada función
function feedPokemon() {
    stats.totalFeeds++;
    // ... resto del código
}
```

---

## 🎓 Recursos de Aprendizaje

### APIs Útiles
- [PokéAPI Docs](https://pokeapi.co/docs/v2)
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [LocalForage Docs](https://localforage.github.io/localForage/)

### Tutoriales Relacionados
- JavaScript Game Development
- HTML5 Canvas Pixel Art
- Web Storage APIs

---

**¡Diviértete experimentando! 🎮✨**
