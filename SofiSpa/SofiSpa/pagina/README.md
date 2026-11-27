# SofiSpa — página web

Proyecto estático desarrollado con HTML, CSS y JavaScript, sin base de datos ni backend.

## Estructura

```text
pagina/
├── README.md
├── contenido/
│   ├── index.html
│   ├── servicios.js
│   └── script.js
├── diseño/
│   └── styles.css
└── src/
    └── img/
        ├── portada/
        ├── manicure/
        ├── pedicure/
        ├── cabello/
        ├── cejas/
        ├── labios/
        ├── galeria/
        └── sofi/
```

## Cómo abrir el proyecto

1. Abre la carpeta `pagina` en Visual Studio Code.
2. Instala/usa la extensión Live Server.
3. Haz clic derecho sobre `contenido/index.html`.
4. Selecciona **Open with Live Server**.

No abras el archivo desde una ruta `file://` si quieres probar todas las funciones de navegación y rutas.

## Imágenes

Agrega manualmente tus fotografías en `src/img/` usando estos nombres de referencia:

- `portada/portada-1.jpg`
- `manicure/manicure-semipermanente.jpg`
- `manicure/manicure-tradicional.jpg`
- `manicure/francesa.jpg`
- `pedicure/pedicure-tradicional.jpg`
- `pedicure/pedicure-semipermanente.jpg`
- `cabello/tinturado.jpg`
- `cabello/retoque-raiz.jpg`
- `cejas/pigmentacion-cejas.jpg`
- `labios/pigmentacion-labios.jpg`
- `galeria/manicure-01.jpg`
- `galeria/pedicure-01.jpg`
- `galeria/cabello-01.jpg`
- `galeria/cejas-01.jpg`
- `galeria/labios-01.jpg`
- `galeria/manicure-02.jpg`
- `sofi/sofi.jpg`

Si cambias un nombre de archivo, actualiza también la ruta correspondiente en `contenido/servicios.js`.

## Antes de publicar

### 1. Número de WhatsApp

Abre `contenido/script.js` y reemplaza:

```js
whatsappNumber: "573000000000"
```

Por el número real de Sofi con código de país, sin `+`, espacios ni guiones. Ejemplo ficticio de Colombia: `573001234567`.

### 2. Redes sociales

En el mismo archivo configura `instagramUrl` y `facebookUrl`. Los botones sin dirección configurada permanecen ocultos.

### 3. Precios

Abre `contenido/servicios.js`. Los precios actuales son valores ilustrativos y deben reemplazarse por los precios reales antes de publicar.

### 4. Información de Sofi

Completa su presentación, dirección, horarios, cobertura a domicilio y reseñas reales directamente en `contenido/index.html` y `contenido/servicios.js`.

### 5. Fotografías y WhatsApp

Las imágenes elegidas se agregan al mensaje de WhatsApp como enlaces. En desarrollo, el enlace apunta al servidor local y solo funcionará en tu propio equipo. Cuando publiques el sitio, la URL será pública y Sofi podrá abrirla desde su teléfono.

## Nota sobre reservas

El sitio prepara una solicitud por WhatsApp; no confirma citas ni administra una agenda. Sofi debe confirmar la disponibilidad y el precio final por conversación.

El carrito se conserva en `localStorage` del navegador del cliente. No se envían datos a una base de datos.

## Cambios de la versión 2

- La portada usa `src/video/sofispa-portada.mp4` (video MP4 horizontal). Conserva `src/img/portada/portada-1.jpg` como imagen de respaldo/poster.
- El logo se carga desde `src/img/logo-sofispa.png`.
- La navegación incluye Preguntas frecuentes.
- Las redes flotantes están en la esquina inferior derecha. Configura el número y las URL de redes en `contenido/script.js`.
- El bloque de contacto muestra horarios y ubicación; configura `businessHours`, `businessAddress` y `mapsUrl` en `contenido/script.js`.
- Cada tarjeta permite elegir varios colores y escribir una descripción libre del diseño. Los colores seleccionados y el texto se incluyen en el mensaje de WhatsApp.
- Paletas de cabello y cejas usan tonos naturales; manos, pies y labios tienen paletas cosméticas.

### Archivos nuevos para agregar manualmente

- `src/img/logo-sofispa.png`
- `src/video/sofispa-portada.mp4`

### Configurar Google Maps

Abre Google Maps, busca el establecimiento exacto, selecciona **Compartir** y copia el enlace. Pégalo en `mapsUrl` dentro de `contenido/script.js`. Reemplaza también `businessAddress` y `businessHours` por los datos reales.


## Versión 3 - ajustes de navegación y presentación
- La portada conserva el fondo rosa y muestra el video al lado derecho del texto (en móvil pasa debajo).
- El menú funciona por vistas: solo se muestra la sección seleccionada. El acceso “Mi cita” también abre su propia vista.
- “Horario y ubicación” reemplaza “Contacto”.
- Redes flotantes circulares: WhatsApp, Instagram, Facebook y TikTok. Configura sus enlaces en `contenido/script.js`.
- Carrusel de “Sobre Sofi”: agrega `sofi-01.jpg`, `sofi-02.jpg` y `sofi-03.jpg` en `src/img/sofi/`.
- El mensaje de WhatsApp incluye emojis y enlaces a las imágenes. Para que los enlaces abran en el teléfono de Sofi, publica el sitio en un hosting HTTPS y configura `siteUrl` con la URL pública completa de la página `contenido/index.html` (por ejemplo, `https://tudominio.com/contenido/index.html`), para que los enlaces a las imágenes apunten correctamente.

### Archivos de imágenes y video
- Portada: `src/img/portada/portada-1.jpg`
- Servicios y galería: revisa los nombres de ejemplo en `contenido/servicios.js`.
- Carrusel Sobre Sofi: `src/img/sofi/sofi-01.jpg`, `sofi-02.jpg` y `sofi-03.jpg`.
- Video portada: `src/video/sofispa-portada.mp4`.
