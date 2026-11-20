import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import outline from '../assets/geo/tlaxcala-inegi.svg?raw'
import barca from '../assets/commons/barca-de-la-fe.jpg'
import malinche from '../assets/commons/la-malinche.jpg'
import { capitulos, orden as places, type Place } from './contenido'

const stops: Record<Place, { x: number; y: number; line: string; label: string }> = {
  origen: { x: 530, y: 155, label: capitulos.origen.nombre, line: capitulos.origen.dialogo },
  contribuciones: { x: 710, y: 250, label: capitulos.contribuciones.nombre, line: capitulos.contribuciones.dialogo },
  taller: { x: 585, y: 380, label: capitulos.taller.nombre, line: capitulos.taller.dialogo },
  experiencia: { x: 735, y: 425, label: capitulos.experiencia.nombre, line: capitulos.experiencia.dialogo },
  conocimientos: { x: 415, y: 300, label: capitulos.conocimientos.nombre, line: capitulos.conocimientos.dialogo },
  bitacora: { x: 355, y: 440, label: capitulos.bitacora.nombre, line: capitulos.bitacora.dialogo },
  contacto: { x: 235, y: 315, label: capitulos.contacto.nombre, line: capitulos.contacto.dialogo },
}
const outlinePath = outline.match(/<path d="([^"]+)"/)?.[1] ?? ''
const routePath = 'M 530 155 C 610 145 680 180 710 250 S 675 355 585 380 S 430 425 355 440 S 240 410 235 315 Q 300 260 415 300 M585 380 Q665 465 735 425'
function PhotoCredit({ type }: { type: 'barca' | 'malinche' }) {
  return type === 'barca' ? <figcaption>La Barca de la Fe · <a href="https://commons.wikimedia.org/wiki/File:La_barca_de_la_fe.jpg" target="_blank" rel="noreferrer">El Sombrerero / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · versión reducida y recortada</figcaption>
    : <figcaption>La Malinche · <a href="https://commons.wikimedia.org/wiki/File:LaMalinche.JPG" target="_blank" rel="noreferrer">AlejandroLinaresGarcia / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a> · versión reducida y recortada</figcaption>
}

function Content({ place, pageIndex, onNavigate }: { place: Place; pageIndex: number; onNavigate: (next: Place, page: number) => void }) {
  const page = capitulos[place].paginas[pageIndex]
  return <>
    <h2 id="place-title">{page.titulo}</h2>
    <p className="atlas-lead">{page.introduccion}</p>
    {page.accesos && <nav className="portfolio-links" aria-label="Trabajos del portafolio">
      {page.accesos.map(access => <button key={access.texto} onClick={() => onNavigate(access.capitulo, access.pagina)}>{access.texto}<ArrowRight size={16}/></button>)}
    </nav>}
    {page.foto && <figure>
      <img src={page.foto === 'barca' ? barca : malinche}
        alt={page.foto === 'barca' ? 'La Barca de la Fe en Buenavista, Tlaxco' : 'La Malinche vista desde Ahuashuastepec, Tlaxcala'} />
      <PhotoCredit type={page.foto} />
    </figure>}
    {page.secciones.map((section, sectionIndex) => <section className="content-section" key={sectionIndex}>
      <h3>{section.titulo}</h3>
      {section.parrafos.map((text, paragraphIndex) => <p key={paragraphIndex} className={section.pendiente ? 'placeholder-text' : undefined}>{text}</p>)}
      {section.enlaces && <div className="atlas-list">{section.enlaces.map(link =>
        <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.texto} <ArrowUpRight size={17} /></a>
      )}</div>}
    </section>)}
  </>
}

export default function Atlas({ initialPlace, initialPage = 0 }: { initialPlace?: Place; initialPage?: number }) {
  const [place, setPlace] = useState<Place>(initialPlace ?? 'origen')
  const [destination, setDestination] = useState<Place>(initialPlace ?? 'origen')
  const [traveling, setTraveling] = useState(false)
  const [book, setBook] = useState(Boolean(initialPlace))
  const [pageIndex, setPageIndex] = useState(initialPage)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const bookRef = useRef<HTMLElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const travel = (next: Place) => {
    if (timer.current) clearTimeout(timer.current)
    setPageIndex(0)
    setDestination(next)
    if (next === place) { setTraveling(false); return }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setTraveling(true)
    timer.current = setTimeout(() => { setPlace(next); setTraveling(false) }, reduced ? 0 : 1050)
  }
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  useEffect(() => {
    if (!book) return
    bookRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBook(false)
        window.setTimeout(() => trigger.current?.focus(), 0)
      }
      if (e.key === 'Tab') {
        const controls = bookRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]')
        if (!controls?.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (e.shiftKey && (document.activeElement === first || document.activeElement === bookRef.current)) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && (document.activeElement === last || document.activeElement === bookRef.current)) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previousOverflow }
  }, [book])
  const closeBook = () => { setBook(false); window.setTimeout(() => trigger.current?.focus(), 0) }
  const openBook = () => { trigger.current = document.activeElement as HTMLElement; setBook(true) }
  const current = stops[place]
  const target = stops[destination]
  const index = places.indexOf(place)
  const chapter = capitulos[place]
  const changeChapter = (next: Place, nextPage = 0) => {
    setPlace(next)
    setDestination(next)
    setPageIndex(nextPage)
  }
  const openSection = (next: Place, nextPage = 0) => {
    if (timer.current) clearTimeout(timer.current)
    setTraveling(false)
    trigger.current = document.activeElement as HTMLElement
    changeChapter(next, nextPage)
    setBook(true)
  }
  const turnPage = (direction: -1 | 1) => {
    const next = pageIndex + direction
    if (next >= 0 && next < chapter.paginas.length) setPageIndex(next)
    else {
      const nextChapter = places[index + direction]
      if (nextChapter) changeChapter(nextChapter, direction === -1 ? capitulos[nextChapter].paginas.length - 1 : 0)
    }
  }
  return <main className="world">
    <header className="world-header" inert={book}>
      <a className="brand" href="#inicio" onClick={(e) => { e.preventDefault(); closeBook(); travel('origen') }}>nery<span>_</span></a>
      <nav className="career-nav" aria-label="Accesos profesionales">
        <button onClick={() => openSection('taller')}>Portafolio</button>
        <button onClick={() => openSection('experiencia')}>Experiencia</button>
        <button onClick={() => openSection('conocimientos')}>Habilidades</button>
        <button onClick={() => openSection('experiencia', 2)}>CV</button>
      </nav>
      <a className="header-link" href="https://github.com/ItsNery" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>
    </header>
    <div className="world-body" id="inicio" inert={book}>
      <div className="world-heading"><div><h1>Un pequeño mundo<br/><span>por recorrer.</span></h1><p>Soy Nery Pozos. Ingeniero en TI, desarrollador web y wikimedista.</p></div><div className="world-instruction"><span className="instruction-dot"/> ELIGE UN DESTINO<br/><small>y acompáñame en el camino</small></div></div>
      <div className="map-wrap">
        <div className="map-stage" aria-label="Mapa interactivo de Tlaxcala">
          <svg className="map-art" viewBox="-15 -15 1030 640.962" aria-hidden="true">
            <path d={outlinePath} className="state-outline" />
            <path className="route" d={routePath} />
            <path className="route-trace" d={routePath} pathLength="1" />
            <g className="map-ascii"><text x="360" y="180">/\　/\</text><text x="340" y="198">/　\/　\</text><text x="770" y="340">/\</text><text x="758" y="358">/　\</text><text x="445" y="325">♧　♧</text><text x="640" y="480">♧　♧　♧</text><text x="210" y="250">·　·　·</text></g>
          </svg>
          {places.map(id => <button key={id} className={`map-stop stop-${id} ${destination === id ? 'selected' : ''}`} style={{left:`${(stops[id].x+15)/1030*100}%`,top:`${(stops[id].y+15)/640.962*100}%`}} onClick={() => travel(id)} aria-label={`Viajar a ${stops[id].label}`} aria-current={!traveling && place === id ? 'location' : undefined}><span className="stop-point"/><span className="stop-label">{stops[id].label}</span></button>)}
          <div className={`traveler ${traveling ? 'is-walking' : ''}`} style={{left:`${(target.x+15)/1030*100}%`,top:`${(target.y+15)/640.962*100}%`}} aria-hidden="true"><span>o</span><span>/|\</span><span>/ \</span></div>
          <span className="map-note">TLAXCALA · MÉXICO</span>
        </div>
      </div>
      <div className="dialogue" aria-live="polite"><div className="dialogue-mark" aria-hidden="true">&gt;_</div><div className="dialogue-copy" key={`${traveling}-${traveling ? destination : place}`}><div className="dialogue-location">{traveling ? 'EN CAMINO' : `EN ${current.label.toUpperCase()}`}</div><p>{traveling ? `Caminando hacia ${target.label}...` : current.line}</p></div><button className="chapter-button" disabled={traveling} onClick={openBook}>Abrir capítulo <ArrowRight size={17}/></button></div>
      <div className="world-footer"><span>Una parada a la vez <span className="footer-star">✳</span></span><span>Los puntos cuentan una historia, no una ubicación exacta.</span><a href="https://gaia.inegi.org.mx/wscatgeo/v2/geo/mgee/29" target="_blank" rel="noreferrer">Contorno: INEGI ↗</a></div>
      <nav className="mobile-nav" aria-label="Destinos">{places.map(id => <button key={id} onClick={() => travel(id)} aria-current={destination === id ? 'location' : undefined}>{stops[id].label}</button>)}</nav>
    </div>
    {book && <div className="book-backdrop" onClick={closeBook}>
      <section className="book" role="dialog" aria-modal="true" aria-labelledby="place-title" ref={bookRef} tabIndex={-1} onClick={e => e.stopPropagation()}>
        <div className="book-top">
          <button onClick={closeBook}><ArrowLeft size={16}/> Volver al mapa</button>
          <span>EL CUADERNO DE NERY</span>
          <button onClick={closeBook} aria-label="Cerrar capítulo"><X size={20}/></button>
        </div>
        <nav className="book-chapters" aria-label="Capítulos del cuaderno">
          {places.map(id => <button key={id} onClick={() => changeChapter(id)} aria-current={place === id ? 'page' : undefined}>{capitulos[id].nombre}</button>)}
        </nav>
        {chapter.paginas.length > 1 && <nav className="book-pages" aria-label={`Páginas de ${chapter.nombre}`}>
          {chapter.paginas.map((page, i) => <button key={i} onClick={() => setPageIndex(i)} aria-current={pageIndex === i ? 'page' : undefined}>{page.titulo}</button>)}
        </nav>}
        <div className="book-page" key={`${place}-${pageIndex}`}>
          <div className="book-margin" aria-hidden="true">{String(pageIndex + 1).padStart(2, '0')} / {String(chapter.paginas.length).padStart(2, '0')}</div>
          <article><Content place={place} pageIndex={pageIndex} onNavigate={changeChapter}/></article>
        </div>
        <div className="book-bottom">
          <span aria-live="polite">{chapter.nombre} · Página {pageIndex + 1} de {chapter.paginas.length}</span>
          <div>
            <button disabled={index === 0 && pageIndex === 0} onClick={() => turnPage(-1)} aria-label="Página anterior"><ArrowLeft size={19}/></button>
            <button disabled={index === places.length - 1 && pageIndex === chapter.paginas.length - 1} onClick={() => turnPage(1)} aria-label="Página siguiente"><ArrowRight size={19}/></button>
          </div>
        </div>
      </section>
    </div>}
  </main>
}
