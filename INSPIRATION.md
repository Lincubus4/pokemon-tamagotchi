# Inspiración y Adaptación de PokeDeskBuddy

Este proyecto está inspirado en [PokeDeskBuddy](https://github.com/redromnon/poke-deskbuddy), una aplicación de escritorio que muestra un Pokémon como mascota en el escritorio.

## Diferencias Clave

### PokeDeskBuddy (Original)
- Aplicación de escritorio nativa
- Pokémon flotante en el escritorio
- Interacción limitada
- No tiene sistema de stats/cuidado

### Pokémon Tamagotchi (Esta Adaptación)
- **Web App**: Funciona en cualquier navegador
- **Sistema Tamagotchi completo**: Stats de hambre, felicidad, energía
- **Mecánicas de juego**: Alimentar, jugar, dormir
- **Evolución**: Sistema de niveles y evolución automática
- **Persistencia**: Los datos se guardan automáticamente
- **Integración PokéAPI**: Acceso a todos los Pokémon
- **Animaciones Canvas**: Animaciones pixel art suaves
- **Responsive**: Funciona en móvil y desktop

## Componentes Adaptados

### Gestión de Sprites
- **Original**: Usa sprites locales predefinidos
- **Adaptado**: Fetch dinámico desde PokéAPI
```javascript
// Fetch de sprites dinámico
const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
const data = await response.json();
const sprite = data.sprites.front_default;
```

### Sistema de Animaciones
- **Original**: Movimiento aleatorio por la pantalla
- **Adaptado**: Animaciones basadas en estados emocionales
  - Idle: Parpadeo sutil
  - Happy: Saltos animados
  - Sad: Temblor
  - Sleeping: Pulsación suave

### Interacciones
- **Original**: Click simple
- **Adaptado**: Botones de acción completos
  - Alimentar (afecta hambre)
  - Jugar (mini-juego interactivo)
  - Dormir (pausa decay)
  - Buscar/Aleatorio (cambiar Pokémon)

## Créditos

Agradecimientos especiales a:
- **redromnon** por el proyecto original PokeDeskBuddy
- **PokéAPI** por la API pública
- **The Pokémon Company** por los sprites oficiales

## Licencia

Este proyecto es una obra derivada para propósitos educativos y de fan art. No tiene afiliación oficial con Nintendo, Game Freak o The Pokémon Company.
