# Nery · Un territorio por conocer

Una experiencia personal explorable: el recorrido comienza en Buenavista, Tlaxco. Los destinos mueven a un personaje y abren diálogos y capítulos de lectura. La silueta procede del Marco Geoestadístico del INEGI; las paradas son narrativas y no representan ubicaciones exactas. La interfaz utiliza Poppins y dibujos de caracteres.

## Desarrollo local

Instalar dependencias con `npm install` y ejecutar `npm run dev`. Para comprobar la compilación, ejecutar `npm run build`.

La información y los enlaces de las fotografías de Wikimedia Commons se encuentran en `CREDITOS.md`; la procedencia de la geometría está en `assets/geo/README.md`. RutasWiki sigue en desarrollo.

## Editar el contenido

Los textos de los siete capítulos están en `src/contenido.ts`: Buenavista, Portafolio, Experiencia, Habilidades, Conocimiento libre, Bitácora y Contacto. Hay dieciséis páginas con datos del perfil de GitHub y del PDF de LinkedIn proporcionados por Nery. Solo quedan dos textos personales opcionales marcados para completar. Portafolio, Experiencia, Habilidades y CV también tienen accesos directos en la cabecera.

1. Busca `[Completar:` y sustituye el texto entre comillas por lo que quieras contar.
2. Cambia `pendiente: true` a `pendiente: false` en esa sección para quitar el estilo de borrador.
3. Edita `nombre` para el nombre del capítulo, `dialogo` para su mensaje en el mapa, `titulo` e `introduccion` para la página, y `parrafos` para su texto. Cada elemento de `parrafos` es un párrafo independiente.
4. Añade enlaces en `enlaces` con los campos `texto` y `url`. Para añadir otra página a un capítulo, copia un objeto dentro de su lista `paginas`. El índice y el contador se actualizan automáticamente.

Con el servidor de desarrollo encendido, guarda el archivo para ver los cambios en el navegador. Conserva las comillas y las comas; si necesitas comillas simples dentro de un texto, puedes usar comillas tipográficas (« »).

El capítulo `taller` es el Portafolio: incluye un índice, el caso de RutasWiki, su proceso y una ficha para otros proyectos. El capítulo `experiencia` contiene experiencia profesional, comunidad y voluntariado, y formación y currículum. El CV ya está disponible en `public/cv-nery.pdf`. Para regenerarlo tras actualizar sus textos, ejecuta `python scripts/generar-cv.py`. También puedes sustituirlo por tu propio PDF con el mismo nombre. El botón CV de la cabecera abre la página de formación y currículum.
