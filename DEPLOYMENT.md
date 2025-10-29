# 🚀 Guía de Deployment

## Opciones de Deployment

### 1. GitHub Pages (Recomendado)

#### Pasos:
1. **Build del proyecto**
```bash
npm run build
```

2. **Instalar gh-pages**
```bash
npm install --save-dev gh-pages
```

3. **Añadir scripts a package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Configurar base en vite.config.js**
```javascript
export default defineConfig({
  base: '/pokemon-tamagotchi/', // Tu repo name
});
```

5. **Deploy**
```bash
npm run deploy
```

6. **Configurar GitHub Pages**
   - Ve a Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

#### URL resultante:
`https://tu-usuario.github.io/pokemon-tamagotchi/`

---

### 2. Netlify

#### Opción A: Drag & Drop
1. Build: `npm run build`
2. Ve a [Netlify Drop](https://app.netlify.com/drop)
3. Arrastra la carpeta `dist/`

#### Opción B: GitHub Integration
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

#### Variables de entorno:
No son necesarias para este proyecto.

---

### 3. Vercel

#### Pasos:
1. Instalar Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
vercel
```

3. Seguir prompts:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Development Command: `npm start`

#### URL resultante:
`https://pokemon-tamagotchi-xxx.vercel.app`

---

### 4. Railway

#### Pasos:
1. Crear `Procfile`:
```
web: npm run preview
```

2. Añadir script en package.json:
```json
{
  "scripts": {
    "preview": "vite preview --port $PORT"
  }
}
```

3. Deploy via GitHub:
   - Conecta repositorio
   - Railway detectará automáticamente

---

### 5. Render

#### Pasos:
1. Crear cuenta en Render
2. New → Static Site
3. Conectar repositorio
4. Configuración:
   - Build Command: `npm run build`
   - Publish Directory: `dist`

---

## Consideraciones Importantes

### 1. CORS y PokéAPI
PokéAPI permite CORS, así que no necesitas configuración especial.

### 2. LocalForage/LocalStorage
Los datos se guardan localmente en el navegador. No se pierden al hacer deploy.

### 3. HTTPS
La mayoría de plataformas proveen HTTPS automáticamente (necesario para algunas APIs).

### 4. Cache
Para forzar actualización después de deploy:
```bash
# En el navegador
Ctrl + Shift + R  # Windows/Linux
Cmd + Shift + R   # Mac
```

### 5. Build Size
El build es muy ligero (~100KB) ya que no usa frameworks pesados.

---

## Testing Local del Build

Antes de hacer deploy, prueba el build localmente:

```bash
# Build
npm run build

# Preview
npm run preview
```

Abre `http://localhost:4173` para probar.

---

## Optimizaciones Pre-Deploy

### 1. Minificación
Vite lo hace automáticamente en `npm run build`.

### 2. Compresión de Imágenes
Los sprites vienen de PokéAPI, ya optimizados.

### 3. Service Worker (PWA)
Para hacerlo instalable como app:

```bash
npm install vite-plugin-pwa --save-dev
```

Actualizar `vite.config.js`:
```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pokémon Tamagotchi',
        short_name: 'PokéTama',
        description: 'Cuida tu Pokémon virtual',
        theme_color: '#ffcb05',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ]
});
```

---

## Troubleshooting

### Error: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: Build falla
Verificar que todas las rutas en el código sean relativas.

### Error: 404 en rutas
Añadir `404.html` que redirija a `index.html` (para SPAs).

---

## Monitoreo Post-Deploy

### Analytics (Opcional)
Añadir Google Analytics en `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Error Tracking
Considera [Sentry](https://sentry.io) para tracking de errores en producción.

---

**¡Listo para deployar! 🚀**
