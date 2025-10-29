# ⚡ QUICK START

## 🎮 Empezar a Jugar (Ya está corriendo!)

El servidor ya está activo en: **http://localhost:5173**

Abre tu navegador y visita esa URL para empezar a jugar.

---

## 🔄 Comandos Rápidos

### Reiniciar Servidor
```bash
# Si necesitas reiniciar
cd C:\Users\Lincubus\pokemon-tamagotchi
npm start
```

### Cerrar Servidor
```bash
# Presiona Ctrl + C en la terminal donde corre
```

### Build para Producción
```bash
npm run build
# Output en: dist/
```

---

## 🎯 Primeros Pasos en el Juego

1. **Al abrir**: Verás a Pikachu por defecto
2. **Alimentar** (🍖): Click en botón "Alimentar"
3. **Jugar** (🎾): Click en botón "Jugar" → Click 5 veces en el canvas
4. **Dormir** (💤): Click en botón "Dormir" para pausar
5. **Cambiar Pokémon**:
   - Escribe nombre (ej: "charizard") y click "Buscar"
   - O click en "Aleatorio" para uno random

---

## 📊 Mecánicas Básicas

### Stats que Decaen
- Cada 30 segundos: -5 en hambre, felicidad, energía
- Si cualquier stat llega a 0: **Game Over** 💀

### Acciones
| Acción | Hambre | Felicidad | Energía | XP |
|--------|--------|-----------|---------|-----|
| Alimentar | +20 | +5 | 0 | +5 |
| Jugar | 0 | +15 | -10 | +10 |
| Dormir | 0 | 0 | +30 | 0 |

### Niveles
- **XP por nivel**: nivel × 20
- **Nivel 16**: Evolución automática (si tiene)

---

## 🔍 Pokémon Recomendados

### Iniciales Clásicos
- **Bulbasaur**: 1
- **Charmander**: 4
- **Squirtle**: 7
- **Pikachu**: 25

### Legendarios
- **Articuno**: 144
- **Zapdos**: 145
- **Moltres**: 146
- **Mewtwo**: 150
- **Mew**: 151

### Favoritos
- **Eevee**: 133
- **Snorlax**: 143
- **Dragonite**: 149
- **Gyarados**: 130

---

## 🐛 Problemas Comunes

### "Cannot GET /"
→ El servidor no está corriendo. Ejecuta `npm start`

### Pokémon no carga
→ Verifica tu conexión a internet (usa PokéAPI)

### Stats no se guardan
→ Habilita cookies/localStorage en tu navegador

### Pantalla en blanco
→ Abre DevTools (F12) y revisa errores en Console

---

## 📱 Tips Pro

1. **Auto-Guardado**: Se guarda cada 10 segundos automáticamente
2. **Tiempo Offline**: El juego calcula el tiempo que estuviste offline
3. **Pausar Decay**: Pon a dormir tu Pokémon antes de cerrar
4. **XP Rápido**: Jugar da más XP que alimentar
5. **Mini-Juego**: Haz click 5 veces rápido para bonus de felicidad

---

## 📚 Documentación Completa

- **README.md**: Documentación principal
- **TIPS.md**: Trucos y customización
- **DEPLOYMENT.md**: Cómo publicar online
- **PROJECT_SUMMARY.md**: Resumen técnico completo

---

## 🎉 ¡Listo!

**Tu Tamagotchi Pokémon está corriendo en:**  
👉 **http://localhost:5173** 👈

**¡Diviértete! 🎮✨**

---

*Para más ayuda, lee README.md o abre un issue en GitHub*
