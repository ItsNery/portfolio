import { readFile, writeFile } from 'node:fs/promises'

// Geometría oficial sin simplificar; proyección equirectangular local.
const geo = JSON.parse(await readFile('assets/geo/tlaxcala-inegi.geojson', 'utf8'))
const feature = geo.features.find((item) => item.properties.cve_ent === '29')
if (!feature || feature.geometry.type !== 'MultiPolygon') throw new Error('No se encontró la geometría de Tlaxcala')
const rings = feature.geometry.coordinates.flat()
const all = rings.flat()
const lat0 = all.reduce((sum, point) => sum + point[1], 0) / all.length
const correction = Math.cos(lat0 * Math.PI / 180)
const projected = rings.map((ring) => ring.map(([lon, lat]) => [lon * correction, -lat]))
const points = projected.flat()
const minX = Math.min(...points.map((p) => p[0]))
const maxX = Math.max(...points.map((p) => p[0]))
const minY = Math.min(...points.map((p) => p[1]))
const maxY = Math.max(...points.map((p) => p[1]))
const scale = 1000 / (maxX - minX)
const height = (maxY - minY) * scale
const d = projected.map((ring) => ring.map(([x, y], index) => `${index ? 'L' : 'M'}${((x - minX) * scale).toFixed(3)} ${((y - minY) * scale).toFixed(3)}`).join(' ') + ' Z').join(' ')
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -15 1030 ${(height + 30).toFixed(3)}" role="img" aria-labelledby="title desc"><title id="title">Silueta de Tlaxcala</title><desc id="desc">Contorno a partir del Marco Geoestadístico del INEGI, diciembre de 2025, sin simplificar.</desc><path d="${d}" fill="none" stroke="#284c24" stroke-width="3" stroke-linejoin="round"/></svg>`
await writeFile('assets/geo/tlaxcala-inegi.svg', svg)
console.log(`Silueta generada: ${all.length} coordenadas, ${rings.length} contorno(s). Fuente: ${geo.metadatos.Fuente_informacion_vectorial}.`)
