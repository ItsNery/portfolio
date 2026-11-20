import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import Atlas from './Atlas'
import type { Place } from './contenido'
import outline from '../assets/geo/tlaxcala-inegi.svg?raw'
import barca from '../assets/commons/barca-de-la-fe.jpg'
import malinche from '../assets/commons/la-malinche.jpg'

type Chapter = { place?: Place; page?: number }
const outlinePath = outline.match(/<path d="([^"]+)"/)?.[1] ?? ''

export default function Sendero() {
  const [atlas, setAtlas] = useState<Chapter | null>(null)
  const lastScroll = useRef(0)
  const thread = useRef<SVGPathElement>(null)

  function openChapter(place: Place, page = 0) {
    lastScroll.current = window.scrollY
    setAtlas({ place, page })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function openMap() {
    lastScroll.current = window.scrollY
    setAtlas({})
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function backHome() {
    setAtlas(null)
    window.setTimeout(() => { window.scrollTo(0, lastScroll.current); document.querySelector<HTMLElement>('.sendero-brand')?.focus({ preventScroll: true }) }, 0)
  }

  useEffect(() => {
    document.title = 'Nery Pozos · Un territorio por conocer'
  }, [])

  useEffect(() => {
    const path = thread.current
    if (!path || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const draw = () => {
      frame = 0
      const bounds = path.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight * 0.4)))
      path.style.strokeDashoffset = String(1 - progress)
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(draw) }
    draw()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); if (frame) window.cancelAnimationFrame(frame) }
  }, [atlas])

  if (atlas) return <div className="atlas-return-wrapper">
    <button className="return-to-sendero" onClick={backHome}><ArrowLeft size={16} /> Volver al inicio</button>
    <Atlas initialPlace={atlas.place} initialPage={atlas.page} />
  </div>

  return <div className="sendero" id="inicio">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="sendero-header">
      <a href="#inicio" className="sendero-brand" aria-label="Nery Pozos, inicio">nery<span>.</span></a>
      <nav aria-label="Navegación principal">
        <a href="#proyectos">Proyectos</a><a href="#trayectoria">Trayectoria</a><a href="#contacto">Contacto</a>
      </nav>
      <a href="https://github.com/ItsNery" target="_blank" rel="noreferrer" className="header-github">GitHub <ArrowUpRight size={15}/></a>
    </header>

    <main id="contenido">
      <section className="sendero-hero" aria-labelledby="hello">
        <div className="hero-copy">
          <h1 id="hello">Hola, soy<br/><span>Nery.</span></h1>
          <p className="place-label"><span /> Buenavista, Tlaxco · México</p>
          <p className="hero-intro">Ingeniero en TI, wikimedista y orgullosamente tlaxcalteca.</p>
          <p className="hero-text">Me gusta crear cosas para la web, compartir nuestra historia y perderme un rato en la naturaleza.</p>
          <a href="#origen" className="start-link">Acompáñame <ArrowDown size={17}/></a>
        </div>
        <div className="hero-map" aria-label="Silueta de Tlaxcala a partir de datos del INEGI">
          <svg viewBox="-15 -15 1030 640.962" role="img" aria-label="Contorno del estado de Tlaxcala">
            <path className="hero-map-outline" d={outlinePath}/>
            <path className="hero-map-route" d="M530 155 C600 160 660 185 700 255 S650 345 585 380 S455 408 355 440"/>
            <circle cx="530" cy="155" r="8" className="hero-map-dot"/>
            <circle cx="585" cy="380" r="5" className="hero-map-small"/>
            <circle cx="355" cy="440" r="5" className="hero-map-small"/>
          </svg>
          <div className="map-caption"><span>Un punto de partida.</span><strong>Buenavista</strong></div>
          <span className="map-credit">Contorno: INEGI · Punto ilustrativo</span>
        </div>
      </section>

      <div className="story">
        <svg className="story-thread" viewBox="0 0 100 3000" preserveAspectRatio="none" aria-hidden="true"><path className="thread-guide" d="M53 0 C53 100 19 130 25 240 S80 380 72 540 S24 710 29 880 S73 1030 71 1190 S25 1350 28 1520 S75 1680 70 1850 S22 2010 28 2200 S73 2380 70 2520 S40 2800 50 3000"/><path ref={thread} pathLength="1" className="thread-progress" d="M53 0 C53 100 19 130 25 240 S80 380 72 540 S24 710 29 880 S73 1030 71 1190 S25 1350 28 1520 S75 1680 70 1850 S22 2010 28 2200 S73 2380 70 2520 S40 2800 50 3000"/></svg>

        <section className="story-section origin-section" id="origen">
          <div className="story-dot" aria-hidden="true" />
          <div className="section-copy">
            <h2>Todo empieza<br/>en Buenavista.</h2>
            <p>Vivo entre Puebla y mi pueblo, en Tlaxco. Prefiero el pueblo: sus caminos, la naturaleza y las historias que se cuentan de generación en generación.</p>
            <p>La Barca de la Fe y el sincretismo que conocí a través del padre Arnulfo Mejía son parte de ese vínculo con mi comunidad.</p>
            <button className="text-link" onClick={() => openChapter('origen', 1)}>Conoce mi origen <ArrowRight size={17}/></button>
          </div>
          <figure className="origin-photo"><img src={barca} alt="La Barca de la Fe en Buenavista, Tlaxco" loading="lazy"/><figcaption>La Barca de la Fe · <a href="https://commons.wikimedia.org/wiki/File:La_barca_de_la_fe.jpg" target="_blank" rel="noreferrer">El Sombrerero / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a> · recortada</figcaption></figure>
        </section>

        <section className="story-section knowledge-section" id="wikimedia">
          <div className="story-dot" aria-hidden="true" />
          <div className="section-copy">
            <h2>La historia es<br/>para compartirla.</h2>
            <p>Soy editor de Wikipedia en español. También contribuyo en Commons y Wikidata, siguiendo mi curiosidad por la historia y la antropología de Puebla-Tlaxcala.</p>
            <p>Trabajé para llevar el artículo de los tlaxcaltecas a <strong>Artículo Destacado</strong>. República de Tlaxcallan, Tlaxcallan y los cuatro señores también tienen un lugar especial en mi recorrido.</p>
            <button className="text-link" onClick={() => openChapter('contribuciones', 1)}>Mis contribuciones <ArrowRight size={17}/></button>
          </div>
          <div className="knowledge-aside" aria-hidden="true"><span>W</span><p>El conocimiento<br/>es de todos.</p></div>
        </section>

        <section className="story-section projects-section" id="proyectos">
          <div className="story-dot" aria-hidden="true" />
          <div className="section-copy wide-copy">
            <h2>Ideas que encuentran<br/>su camino.</h2>
            <p>Me gusta pensar en la tecnología como una forma de conectar personas, lugares e información.</p>
            <div className="project-list">
              <button onClick={() => openChapter('taller', 1)}><span><strong>RutasWiki</strong><small>Una enciclopedia colaborativa para mapear el transporte público. En desarrollo.</small></span><ArrowUpRight size={19}/></button>
              <button onClick={() => openChapter('taller', 3)}><span><strong>Indicadores municipales</strong><small>Un dashboard con datos geográficos para el Gobierno de Puebla.</small></span><ArrowUpRight size={19}/></button>
              <button onClick={() => openChapter('contribuciones', 1)}><span><strong>Historia de Tlaxcala</strong><small>Contribuciones a Wikipedia sobre las historias de mi estado.</small></span><ArrowUpRight size={19}/></button>
            </div>
            <a href="https://github.com/ItsNery" className="text-link" target="_blank" rel="noreferrer">Más en GitHub <ArrowUpRight size={16}/></a>
          </div>
        </section>

        <section className="story-section journey-section" id="trayectoria">
          <div className="story-dot" aria-hidden="true" />
          <div className="section-copy">
            <h2>Un poco de<br/>mi trayectoria.</h2>
            <p>Soy ingeniero en Tecnologías de la Información por la Universidad Politécnica de Tlaxcala. Trabajo con Laravel, PHP y datos geoespaciales; antes también trabajé en pruebas de software.</p>
            <ul className="experience-list"><li><strong>Gobierno de Puebla</strong><span>Desarrollador web · 2023 – actualidad</span></li><li><strong>Camp Tall Timbers</strong><span>Orientador de campamento · 2023</span></li><li><strong>ITW</strong><span>Pruebas de software · 2021 – 2023</span></li></ul>
            <div className="link-pair"><button className="text-link" onClick={() => openChapter('experiencia')}>Ver experiencia completa <ArrowRight size={17}/></button><a className="text-link" href="/cv-nery.pdf" target="_blank" rel="noreferrer">Abrir CV <ArrowUpRight size={16}/></a></div>
          </div>
        </section>

        <section className="story-section offscreen-section" id="intereses">
          <div className="story-dot" aria-hidden="true" />
          <figure className="nature-photo"><img src={malinche} alt="La Malinche vista desde Ahuashuastepec, Tlaxcala" loading="lazy"/><figcaption>La Malinche · <a href="https://commons.wikimedia.org/wiki/File:LaMalinche.JPG" target="_blank" rel="noreferrer">AlejandroLinaresGarcia / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noreferrer">CC BY-SA 3.0</a> · recortada</figcaption></figure>
          <div className="section-copy">
            <h2>Siempre hay<br/>otro sendero.</h2>
            <p>Me encanta caminar, jugar League of Legends y perderme en mundos como Blade Runner, Alien y El señor de los anillos.</p>
            <p>Tengo dos gatos, un perro y el sueño de algún día tener un ranchito propio.</p>
            <button className="text-link" onClick={() => openChapter('bitacora')}>Más sobre mí <ArrowRight size={17}/></button>
          </div>
        </section>

        <section className="story-section contact-section" id="contacto">
          <div className="story-dot" aria-hidden="true" />
          <div className="section-copy">
            <h2>¿Nos encontramos<br/>por ahí?</h2>
            <p>Si te interesa el conocimiento libre, la tecnología, Tlaxcala o simplemente quieres saludar, me encantará conectar.</p>
            <div className="contact-links"><a href="https://www.linkedin.com/in/nerypm/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={18}/></a><a href="https://github.com/ItsNery" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={18}/></a><button onClick={openMap}>Explorar mi mapa <ArrowRight size={18}/></button></div>
          </div>
        </section>
      </div>
    </main>
    <footer className="sendero-footer"><span>Hecho con curiosidad, desde Tlaxcala.</span><a href="#inicio">Volver arriba ↑</a></footer>
  </div>
}
