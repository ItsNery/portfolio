# Nery · Un territorio por conocer

Una experiencia personal explorable: el recorrido comienza en Buenavista, Tlaxco. Los destinos mueven a un personaje y abren diálogos y capítulos de lectura. La silueta procede del Marco Geoestadístico del INEGI; las paradas son narrativas y no representan ubicaciones exactas. La interfaz utiliza Poppins y dibujos de caracteres.

## Características

- Mapa interactivo con paradas narrativas y capítulos de lectura.
- Siete capítulos: Buenavista, Portafolio, Experiencia, Habilidades, Conocimiento libre, Bitácora y Contacto.
- Dieciséis páginas con datos del perfil de GitHub y del PDF de LinkedIn.
- CV descargable desde `public/cv-nery.pdf` (regenerable con `python scripts/generar-cv.py`).

## Tecnologías

- Vite + TypeScript
- React

## Desarrollo local

```bash
npm install
npm run dev
```

Para comprobar la compilación:

```bash
npm run build
```

## Editar el contenido

Los textos de los capítulos están en `src/contenido.ts`.

1. Busca `[Completar:` y sustituye el texto entre comillas por lo que quieras contar.
2. Cambia `pendiente: true` a `pendiente: false` en esa sección para quitar el estilo de borrador.
3. Edita `nombre` para el nombre del capítulo, `dialogo` para su mensaje en el mapa, `titulo` e `introduccion` para la página, y `parrafos` para su texto. Cada elemento de `parrafos` es un párrafo independiente.
4. Añade enlaces en `enlaces` con los campos `texto` y `url`. Para añadir otra página a un capítulo, copia un objeto dentro de su lista `paginas`. El índice y el contador se actualizan automáticamente.

El capítulo `taller` es el Portafolio: incluye un índice, el caso de RutasWiki, su proceso y una ficha para otros proyectos. El capítulo `experiencia` contiene experiencia profesional, comunidad y voluntariado, y formación y currículum.

## Créditos

La información y los enlaces de las fotografías de Wikimedia Commons se encuentran en `CREDITOS.md`; la procedencia de la geometría está en `assets/geo/README.md`.

## Estructura del repositorio

- `src/` — código fuente y contenido (`contenido.ts`)
- `public/` — assets estáticos (incluye `cv-nery.pdf`)
- `assets/` — geoestática y otros recursos
- `scripts/` — utilidades (generación de CV)
- `dist/` — salida de compilación (ignorado en git)
- `node_modules/` — dependencias (ignorado en git)
- `.impeccable/` — revisiones internas (ignoradas en git)

RutasWiki sigue en desarrollo.
