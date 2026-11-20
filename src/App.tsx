import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import terrain from "../assets/plates/terrain.png";
import paper from "../assets/plates/paper.png";
import silhouette from "../assets/geo/tlaxcala-inegi.svg";
import barca from "../assets/commons/barca-de-la-fe.jpg";
import malinche from "../assets/commons/la-malinche.jpg";

const wikipediaSearch = (term: string) =>
  `https://es.wikipedia.org/w/index.php?search=${encodeURIComponent(term)}`;

function JourneyPath() {
  const [path, setPath] = useState({
    height: 1,
    points: [] as number[],
    d: "",
  });
  useLayoutEffect(() => {
    const container = document.getElementById("recorrido");
    if (!container) return;
    const stops = Array.from(
      container.querySelectorAll<HTMLElement>("[data-parada]"),
    );
    const update = () => {
      const bounds = container.getBoundingClientRect();
      const points = stops.map((stop) =>
        Math.round(
          stop.getBoundingClientRect().top -
            bounds.top +
            Math.min(110, stop.offsetHeight * 0.16),
        ),
      );
      const d = points.length
        ? `M 36 0 L 36 ${points[0]} ` +
          points
            .slice(1)
            .map((point, index) => {
              const previous = points[index];
              const distance = point - previous;
              const bend = index % 2 === 0 ? 57 : 15;
              return `C ${bend} ${previous + distance * 0.3}, ${bend} ${previous + distance * 0.7}, 36 ${point}`;
            })
            .join(" ")
        : "";
      setPath((old) =>
        old.height === container.offsetHeight && old.d === d
          ? old
          : { height: container.offsetHeight, points, d },
      );
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    stops.forEach((stop) => observer.observe(stop));
    update();
    return () => observer.disconnect();
  }, []);
  return (
    <svg
      className="journey-path"
      viewBox={`0 0 72 ${path.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={path.d} className="journey-path-under" />
      <path d={path.d} className="journey-path-line" />
      {path.points.map((point, index) => (
        <g key={index}>
          <circle cx="36" cy={point} r="9" className="journey-marker-outer" />
          <circle cx="36" cy={point} r="4" className="journey-marker-inner" />
        </g>
      ))}
    </svg>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <main
        id="contenido"
        className="frame"
        style={{ backgroundImage: `url(${paper})` }}
      >
        <div className="terrain" aria-hidden="true">
          <img src={terrain} alt="" />
        </div>
        <img
          className="state-outline"
          src={silhouette}
          alt=""
          aria-hidden="true"
        />
        <header className="topbar">
          <a
            className="wordmark"
            href="#inicio"
            aria-label="Nery, ir al inicio"
          >
            Nery.
          </a>
          <nav aria-label="Navegación principal">
            <a href="#origen">Origen</a>
            <span>/</span>
            <a href="#contribuciones">Contribuciones</a>
            <span>/</span>
            <a href="#taller">Taller</a>
            <span>/</span>
            <a href="#bitacora">Bitácora</a>
            <span>/</span>
            <a
              href="https://github.com/ItsNery"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </nav>
        </header>
        <div className="hero-copy" id="inicio">
          <h1>
            Un territorio
            <br />
            por conocer.
          </h1>
          <p>
            Soy Nery. Wikimedista y caminante.
            <br />
            De Buenavista, Tlaxco.
          </p>
        </div>
        <div className="origin-stop">
          <h2>
            <span>01</span> Buenavista
          </h2>
          <p className="origin-subtitle">Mi punto de partida</p>
          <p className="origin-desc">Todo empieza en Buenavista.</p>
          <a href="#origen" className="origin-button">
            Abrir este lugar <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <a href="#contribuciones" className="stop knowledge">
          <span className="stop-number">02</span>
          <span>
            <strong>Conocimiento libre</strong>
            <small>Wikipedia · Commons · Wikidata</small>
          </span>
          <ChevronRight aria-hidden="true" />
        </a>
        <a href="#taller" className="stop project">
          <span className="stop-number">03</span>
          <span>
            <strong>RutasWiki</strong>
            <small>Proyecto personal · En desarrollo</small>
          </span>
          <ChevronRight aria-hidden="true" />
        </a>
        <a href="#bitacora" className="stop logbook">
          <span className="stop-number">04</span>
          <span>
            <strong>Bitácora</strong>
          </span>
          <ChevronRight aria-hidden="true" />
        </a>
        <p className="map-caption">Contorno: INEGI · Paisaje ilustrado</p>
        <h2 className="next-heading">Historia que compartimos</h2>
      </main>
      <div className="journey" id="recorrido">
        <JourneyPath />
        <section className="section origin-section" id="origen" data-parada>
          <div className="section-intro">
            <p className="section-tag">EL ORIGEN</p>
            <h2>
              Todo empieza
              <br />
              <em>en Buenavista.</em>
            </h2>
            <p className="lead">
              De un pueblito en Tlaxco a un mundo de historias por descubrir.
            </p>
            <p>
              Soy Nery, orgullosamente tlaxcalteca. Mi punto de partida es
              Buenavista: su paisaje, sus caminos y la curiosidad por las
              historias que guardan los lugares que habitamos.
            </p>
            <p>
              La Barca de la Fe y el sincretismo que conocí a través de las
              enseñanzas del padre Arnulfo Mejía forman parte de ese vínculo con
              mi comunidad.
            </p>
            <a className="next-stop" href="#contribuciones">
              <span>Seguir el camino</span>
              <strong>
                Conocimiento libre <span aria-hidden="true">↓</span>
              </strong>
            </a>
          </div>
          <figure className="photo-main">
            <img
              src={barca}
              alt="La Barca de la Fe en Buenavista, Tlaxco"
              loading="lazy"
            />
            <figcaption>
              La Barca de la Fe ·{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:La_barca_de_la_fe.jpg"
                target="_blank"
                rel="noreferrer"
              >
                El Sombrerero / Wikimedia Commons
              </a>{" "}
              ·{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY-SA 4.0
              </a>{" "}
              · versión reducida y recortada
            </figcaption>
          </figure>
        </section>
        <section
          className="section contributions-section"
          id="contribuciones"
          data-parada
        >
          <div className="section-intro">
            <p className="section-tag">EL CONOCIMIENTO COMPARTIDO</p>
            <h2>
              Historias que
              <br />
              <em>siguen vivas.</em>
            </h2>
            <p className="lead">
              Hay mucho de nuestra historia que merece ser conocido y
              compartido.
            </p>
            <p>
              Contribuyo principalmente a Wikipedia en español, y también a
              Wikimedia Commons y Wikidata. Me interesa documentar la historia
              de Tlaxcala y participar en el conocimiento que construimos entre
              todas las personas.
            </p>
            <a className="next-stop" href="#taller">
              <span>Seguir el camino</span>
              <strong>
                El taller <span aria-hidden="true">↓</span>
              </strong>
            </a>
          </div>
          <div className="article-list" aria-label="Temas destacados">
            <a
              href={wikipediaSearch("República de Tlaxcallan")}
              target="_blank"
              rel="noreferrer"
            >
              <span>HISTORIA</span>
              <strong>República de Tlaxcallan</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href={wikipediaSearch("Tlaxcallan")}
              target="_blank"
              rel="noreferrer"
            >
              <span>TERRITORIO</span>
              <strong>Tlaxcallan</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href={wikipediaSearch("Cuatro señoríos de Tlaxcala")}
              target="_blank"
              rel="noreferrer"
            >
              <span>MEMORIA</span>
              <strong>Los cuatro señores</strong>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p>
              Los enlaces abren búsquedas en Wikipedia para explorar estos
              temas.
            </p>
          </div>
        </section>
        <section className="workshop" id="taller" data-parada>
          <div className="workshop-inner">
            <div>
              <p className="section-tag">EL TALLER</p>
              <h2>
                Una idea puede
                <br />
                <em>abrir caminos.</em>
              </h2>
              <p className="lead">
                Proyectos que nacen de la curiosidad y de las ganas de
                compartir.
              </p>
            </div>
            <article className="project-feature">
              <div className="project-heading">
                <div>
                  <p className="project-status">
                    <span /> EN DESARROLLO
                  </p>
                  <h3>RutasWiki</h3>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </div>
              <p>
                Una enciclopedia libre y colaborativa para documentar rutas,
                paradas y horarios de transporte público. Una idea personal para
                hacer más accesible la información sobre cómo nos movemos.
              </p>
              <p className="technology">
                LARAVEL &nbsp; / &nbsp; MYSQL &nbsp; / &nbsp; ALPINE.JS &nbsp; /
                &nbsp; LEAFLET
              </p>
              <a
                className="light-link"
                href="https://github.com/ItsNery/rutaswiki"
                target="_blank"
                rel="noreferrer"
              >
                Ver repositorio <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="next-stop next-stop-light" href="#bitacora">
                <span>Seguir el camino</span>
                <strong>
                  La bitácora <span aria-hidden="true">↓</span>
                </strong>
              </a>
            </article>
          </div>
        </section>
        <section className="section log-section" id="bitacora" data-parada>
          <figure className="photo-secondary">
            <img
              src={malinche}
              alt="La Malinche vista desde Ahuashuastepec, Tlaxcala"
              loading="lazy"
            />
            <figcaption>
              La Malinche ·{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:LaMalinche.JPG"
                target="_blank"
                rel="noreferrer"
              >
                AlejandroLinaresGarcia / Wikimedia Commons
              </a>{" "}
              ·{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY-SA 3.0
              </a>{" "}
              · versión reducida y recortada
            </figcaption>
          </figure>
          <div className="section-intro">
            <p className="section-tag">LA BITÁCORA</p>
            <h2>
              Siempre hay
              <br />
              <em>otro sendero.</em>
            </h2>
            <p className="lead">
              Naturaleza, historias, videojuegos y cosas que todavía estoy
              aprendiendo.
            </p>
            <p>
              Me gusta caminar, explorar y encontrar conexiones entre lo que
              conozco y lo que todavía no. Este espacio crecerá con notas de
              esos recorridos, dentro y fuera de la pantalla.
            </p>
            <a className="next-stop" href="#contacto">
              <span>Seguir el camino</span>
              <strong>
                Contacto <span aria-hidden="true">↓</span>
              </strong>
            </a>
          </div>
        </section>
        <footer id="contacto" className="site-footer" data-parada>
          <div>
            <h2>Sigamos en contacto.</h2>
            <p>
              ¿Una idea, una pregunta o algo que podamos construir en
              colaboración?
            </p>
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/ItsNery"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/nerypm"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="map-source">
            Silueta:{" "}
            <a
              href="https://gaia.inegi.org.mx/wscatgeo/v2/geo/mgee/29"
              target="_blank"
              rel="noreferrer"
            >
              INEGI, Marco Geoestadístico, diciembre de 2025
            </a>
            . Paisaje ilustrado.
          </p>
          <a className="back-top" href="#inicio">
            Volver al inicio ↑
          </a>
        </footer>
      </div>
    </>
  );
}
