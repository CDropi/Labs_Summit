# Diagnóstico Dropi

App web estática: no necesita instalar nada ni compilar.

## Estructura
- `index.html`: punto de entrada.
- `css/estilos.css`: todos los estilos (colores en las variables de `:root`).
- `js/config.js`: **contenido editable**: verticales, las 10 preguntas, estados del diagnóstico, textos e imágenes.
- `js/app.js`: lógica de las pantallas (nombre, inicio, preguntas, analizando, diagnóstico).
- `media/`: Codi, logo de Dropi (versión blanca rellena), isotipos de las verticales e iconos.
- `fonts/`: Tusker y Montserrat (Light y Bold). Los pesos 500/600/800 de Montserrat llegan de Google Fonts.

## Probar en local
Basta con abrir `index.html` en el navegador. Con servidor: `npx serve .` o `python3 -m http.server`.

## Publicar
Sirve en cualquier hosting estático (Vercel, Netlify, GitHub Pages). En Vercel: importar la carpeta como proyecto, sin framework ni comando de build.

## Notas
- No hay base de datos: nada se guarda; al recargar se empieza de cero.
- Una vertical entra a la receta con un solo "No" en cualquiera de sus preguntas.
