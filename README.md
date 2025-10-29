# 🎮 Pokémon Tamagotchi

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-f7df1e.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![PokéAPI](https://img.shields.io/badge/Powered%20by-Pok%C3%A9API-EF5350.svg)](https://pokeapi.co/)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-222222.svg?logo=github)](https://lincubus4.github.io/pokemon-tamagotchi/)

> Un Tamagotchi virtual inspirado en Pokémon, construido con HTML5 Canvas, JavaScript vanilla y PokéAPI. Cuida tu Pokémon, aliméntalo, juega con él y observa cómo evoluciona.

![Pokémon Tamagotchi](https://img.shields.io/badge/Pok%C3%A9mon-Tamagotchi-ffcb05?style=for-the-badge&logo=pokemon)

---

---

## 🎯 Demo en Vivo

**[👉 Prueba el juego aquí](https://lincubus4.github.io/pokemon-tamagotchi/)**

![Screenshot Placeholder](https://via.placeholder.com/600x400/ffcb05/003a70?text=Pokemon+Tamagotchi+Screenshot)

## 🌟 Características

- **🎨 Pixel Art Animations**: Animaciones suaves usando HTML5 Canvas con sprites oficiales de PokéAPI
- **📊 Sistema Tamagotchi Completo**: 
  - Hambre, Felicidad y Energía que decaen con el tiempo
  - Alimentación, juego y sueño para cuidar tu Pokémon
  - Sistema de niveles y experiencia
- **🔄 Evolución**: Los Pokémon evolucionan al alcanzar el nivel 16
- **💾 Persistencia**: Estados guardados automáticamente con LocalForage
- **🎯 PokéAPI Integration**: Datos y sprites en tiempo real de más de 1000 Pokémon
- **📱 Responsive Design**: Optimizado para móviles y desktop
- **🎵 Efectos de Sonido**: Feedback audio para cada acción
- **🔍 Búsqueda**: Busca cualquier Pokémon por nombre o ID

## 🚀 Instalación

### Requisitos previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/pokemon-tamagotchi.git
cd pokemon-tamagotchi
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 🎮 Cómo Jugar

### Controles Básicos

- **🍖 Alimentar**: Aumenta el hambre +20, felicidad +5
- **🎾 Jugar**: Aumenta la felicidad +15, reduce energía -10 (incluye mini-juego)
- **💤 Dormir**: Restaura energía +30, pausa el decay de stats
- **🔄 Nuevo**: Reinicia con un nuevo Pokémon

### Mecánicas

1. **Stats que Decaen**: Cada 30 segundos, hambre, felicidad y energía disminuyen -5
2. **Game Over**: Si cualquier stat llega a 0, tu Pokémon se desmaya
3. **Sistema de Niveles**: Gana experiencia alimentando (+5 XP) y jugando (+10 XP)
4. **Evolución**: Al nivel 16, tu Pokémon evolucionará si tiene evolución disponible
5. **Búsqueda**: Busca Pokémon por nombre (ej: "pikachu") o ID (ej: "25")

### Mini-Juego

Cuando juegas con tu Pokémon, haz click 5 veces en el canvas para ganar +10 felicidad extra.

## 🛠️ Tecnologías Utilizadas

- **HTML5 Canvas**: Renderizado de sprites pixel art
- **JavaScript Vanilla (ES6+)**: Lógica del juego sin frameworks
- **LocalForage**: Almacenamiento persistente mejorado
- **PokéAPI**: Base de datos completa de Pokémon
- **Vite**: Build tool y hot module replacement
- **Google Fonts**: Press Start 2P para estética retro

## 📁 Estructura del Proyecto

```
pokemon-tamagotchi/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos pixel art retro
├── app.js              # Lógica del juego
├── package.json        # Dependencias y scripts
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar Intervalo de Decay
En `app.js`, modifica la constante:
```javascript
const CONFIG = {
    STAT_DECAY_INTERVAL: 30000, // Milisegundos (30s)
    STAT_DECAY_AMOUNT: 5,        // Cantidad por intervalo
};
```

### Cambiar Nivel de Evolución
```javascript
const CONFIG = {
    EVOLUTION_LEVEL: 16, // Nivel para evolucionar
};
```

### Añadir Nuevos Tipos de Animaciones
En la función `render()` de `app.js`, añade nuevos casos al switch de `animationState`.

## 🐛 Solución de Problemas

### El Pokémon no carga
- Verifica tu conexión a internet (PokéAPI requiere conexión)
- Intenta con un nombre diferente (sin acentos, en minúsculas)
- Revisa la consola del navegador para errores

### Los datos no se guardan
- Asegúrate de que las cookies/localStorage estén habilitados
- Limpia el caché y recarga la página

### Las animaciones van lentas
- Cierra otras pestañas del navegador
- Actualiza tu navegador a la última versión

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para cambios importantes:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📜 Créditos

### 🙏 Inspiración y Referencias

Este proyecto fue inspirado y se basó en los siguientes recursos:

#### **Proyecto Base**
- **[PokeDeskBuddy](https://github.com/redromnon/poke-deskbuddy)** por [@redromnon](https://github.com/redromnon)
  - Concepto de mascota Pokémon interactiva de escritorio
  - Lógica de sprites y animaciones básicas
  - Sistema de estados y comportamientos

#### **APIs y Recursos**
- **[PokéAPI](https://pokeapi.co/)** - Base de datos completa de Pokémon
  - Sprites oficiales (Gen 1-9)
  - Datos de tipos, evoluciones y estadísticas
  - Cadenas de evolución
  - [Documentación oficial](https://pokeapi.co/docs/v2)

#### **Tecnologías y Librerías**
- **[Vite](https://vitejs.dev/)** - Build tool ultrarrápido por [@Evan You](https://github.com/yyx990803)
- **[LocalForage](https://localforage.github.io/localForage/)** - Storage mejorado por [@Mozilla](https://github.com/localForage/localForage)
- **[Google Fonts - Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)** - Fuente pixel retro

#### **Inspiración de Diseño**
- **Tamagotchi Original** (1996) - Bandai
- **Game Boy Classic** - Diseño de pantalla monocromo verde
- **Pokémon Red/Blue/Yellow** (1996-1998) - Sprites pixel art Gen 1

### 📦 Repositorios Relacionados

Otros proyectos similares que nos inspiraron:
- [pokegotchi](https://github.com/PierreRambaud/pokegotchi) - Tamagotchi Pokémon en C con LVGL
- [7daysofcodeTamagotchi](https://github.com/sspacecoding/7daysofcodeTamagotchi) - Implementación en C#

### 🎨 Assets y Contenido

- **Sprites Pokémon**: © The Pokémon Company, Nintendo, Game Freak
- **Concepto Tamagotchi**: © Bandai
- **Emojis**: Unicode Consortium / Sistema operativo
- **Código fuente**: MIT License (ver [LICENSE](LICENSE))

### ⚠️ Disclaimer

Este es un proyecto de fan art no oficial y **no está afiliado, respaldado o asociado** con:
- The Pokémon Company
- Nintendo
- Game Freak
- Creatures Inc.
- Bandai

Pokémon y Tamagotchi son marcas registradas de sus respectivos propietarios. Este proyecto es únicamente para fines educativos y de entretenimiento personal.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

**Nota**: Pokémon y todos los personajes relacionados son marcas registradas de Nintendo, Game Freak y Creatures Inc. Este proyecto es una aplicación de fan no oficial y no está afiliado con The Pokémon Company.

## 🎯 Roadmap

- [ ] Más animaciones (ataque, defensa, etc.)
- [ ] Sistema de combate básico
- [ ] Múltiples Pokémon simultáneos
- [ ] Logros y trofeos
- [ ] Modo oscuro
- [ ] Compartir en redes sociales
- [ ] PWA (Progressive Web App)
- [ ] Multijugador básico

## 💬 Contacto

¿Preguntas o sugerencias? Abre un issue en GitHub.

---

**¡Diviértete cuidando tu Pokémon! 🎮✨**
