// EDITA AQUÍ LOS TEXTOS DEL SITIO.
// Cada capítulo tiene una o más páginas. Cada página tiene secciones.
// Sustituye los textos entre [Completar: ...] por tu contenido y cambia
// `pendiente: true` a `pendiente: false` para quitarles el estilo de borrador.
// Puedes agregar párrafos, secciones, páginas y enlaces copiando sus estructuras.
// Las coordenadas del mapa se editan en Atlas.tsx; aquí solo está el contenido.

export type Place = 'origen' | 'contribuciones' | 'taller' | 'experiencia' | 'conocimientos' | 'bitacora' | 'contacto'

type Enlace = { texto: string; url: string }
type Seccion = {
  titulo: string
  parrafos: string[]
  pendiente?: boolean
  enlaces?: Enlace[]
}
export type Pagina = {
  titulo: string
  introduccion: string
  foto?: 'barca' | 'malinche'
  accesos?: { texto: string; capitulo: Place; pagina: number }[]
  secciones: Seccion[]
}
type Capitulo = {
  nombre: string
  dialogo: string
  paginas: Pagina[]
}

const buscarWikipedia = (tema: string) =>
  `https://es.wikipedia.org/w/index.php?search=${encodeURIComponent(tema)}`

export const orden: Place[] = [
  'origen', 'taller', 'experiencia', 'conocimientos', 'contribuciones', 'bitacora', 'contacto',
]

export const capitulos: Record<Place, Capitulo> = {
  origen: {
    nombre: 'Buenavista',
    dialogo: 'Soy Nery Pozos: ingeniero en TI, desarrollador web y wikimedista. Todo empieza en Buenavista.',
    paginas: [
      {
        titulo: 'Nery Pozos, desde Tlaxcala.',
        introduccion: 'Ingeniero en Tecnologías de la Información, desarrollador web y orgullosamente tlaxcalteca.',
        secciones: [
          { titulo: 'Tecnología con territorio', parrafos: ['Me enfoco en Laravel/PHP y datos geoespaciales. Actualmente trabajo en herramientas de gobierno digital y desarrollo proyectos propios relacionados con la movilidad urbana.', 'Me interesan la historia y la antropología de Puebla-Tlaxcala, el conocimiento libre y las formas de hacer más accesible la información.'] },
          { titulo: 'Entre Puebla y mi pueblo', parrafos: ['Vivo entre Puebla y Buenavista, en Tlaxco, Tlaxcala. Prefiero el pueblo a la ciudad: disfruto la naturaleza, el senderismo y el vínculo con mi comunidad.'] },
          { titulo: 'Un poco más de mí', parrafos: ['Tengo dos gatos y un perro, me interesa la agricultura y sueño con tener un ranchito propio. Durante la prepa me interesé por la oratoria; soy algo tímido y sigo trabajando en ello.'] },
        ],
      },
      {
        titulo: 'La Barca de la Fe.',
        introduccion: 'La Barca de la Fe y el sincretismo que conocí a través del padre Arnulfo Mejía forman parte de mi vínculo con Buenavista.',
        foto: 'barca',
        secciones: [
          { titulo: 'Mi punto de partida', parrafos: ['Buenavista, Tlaxco, es mi pueblo. La Barca de la Fe es uno de sus lugares emblemáticos y el sincretismo de su arquitectura es algo que me llama especialmente la atención.'] },
          { titulo: 'Un recuerdo para compartir', pendiente: true, parrafos: ['[Completar: un detalle de la Barca o una enseñanza del padre Arnulfo Mejía que quieras contar con tus propias palabras.]'] },
        ],
      },
    ],
  },
  taller: {
    nombre: 'Portafolio',
    dialogo: 'Gobierno digital, movilidad urbana y conocimiento libre: estos son algunos de mis trabajos.',
    paginas: [
      {
        titulo: 'Mi portafolio.',
        introduccion: 'Proyectos en los que conecto desarrollo web, información geográfica y conocimiento libre.',
        accesos: [
          { texto: 'Dashboard de indicadores municipales', capitulo: 'taller', pagina: 3 },
          { texto: 'RutasWiki · Movilidad comunitaria', capitulo: 'taller', pagina: 1 },
          { texto: 'Contribuciones a Wikipedia', capitulo: 'contribuciones', pagina: 1 },
        ],
        secciones: [
          { titulo: 'Gobierno digital en Puebla', parrafos: ['Trabajo en un dashboard de indicadores municipales con datos geográficos para el Gobierno del Estado de Puebla.'] },
          { titulo: 'RutasWiki · Proyecto personal en desarrollo', parrafos: ['Una plataforma comunitaria para mapear y documentar rutas de transporte informal en municipios pequeños de México.'], enlaces: [{ texto: 'Ver el repositorio de RutasWiki', url: 'https://github.com/ItsNery/rutaswiki' }] },
          { titulo: 'Wikipedia en español', parrafos: ['Trabajé para llevar el artículo de los tlaxcaltecas a Artículo Destacado. También me llenan de orgullo mis contribuciones a República de Tlaxcallan, Tlaxcallan y los cuatro señores.'] },
        ],
      },
      {
        titulo: 'RutasWiki: una idea en marcha.',
        introduccion: 'Una enciclopedia libre, abierta y colaborativa para documentar el transporte público.',
        secciones: [
          { titulo: 'Qué quiero construir', parrafos: ['Una plataforma donde las comunidades puedan mapear y documentar rutas, paradas y horarios de autobuses, combis, colectivos y otros servicios de transporte.', 'El foco está en municipios pequeños de México y en el transporte informal. La propuesta es que cualquiera pueda colaborar para mantener la información actualizada.'] },
          { titulo: 'Mi participación y estado actual', parrafos: ['RutasWiki nació como una idea personal y sigue en desarrollo. Estoy construyendo el proyecto alrededor del mapeo colaborativo y la movilidad urbana.'] },
          { titulo: 'Herramientas', parrafos: ['Laravel, Leaflet y PostgreSQL/PostGIS forman parte del stack que planteo para la plataforma. También estoy profundizando en PostGIS para análisis geoespacial.'] },
          { titulo: 'Código abierto', parrafos: ['El repositorio permite consultar el código y seguir el desarrollo del proyecto.'], enlaces: [{ texto: 'Explorar RutasWiki en GitHub', url: 'https://github.com/ItsNery/rutaswiki' }] },
        ],
      },
      {
        titulo: 'Cómo trabajo.',
        introduccion: 'Mi recorrido combina desarrollo web, datos y pruebas manuales de software.',
        secciones: [
          { titulo: 'Desarrollo web', parrafos: ['Mi enfoque principal está en Laravel y PHP. Trabajo con JavaScript, HTML, CSS y bases de datos SQL, y estoy profundizando en JavaScript y React.'] },
          { titulo: 'Información geográfica', parrafos: ['Me interesa conectar el desarrollo web con información del territorio: indicadores municipales, mapas y rutas de transporte. Utilizo Leaflet y estoy aprendiendo más sobre PostGIS.'] },
          { titulo: 'Calidad de software', parrafos: ['Mi experiencia en pruebas manuales me ha permitido trabajar en la comprobación de productos de software frente a requisitos de calidad y necesidades del cliente.'] },
        ],
      },
      {
        titulo: 'Gobierno digital en Puebla.',
        introduccion: 'Desarrollo de un dashboard de indicadores municipales con información geográfica.',
        accesos: [{ texto: 'Ver mi experiencia en el Gobierno de Puebla', capitulo: 'experiencia', pagina: 0 }],
        secciones: [
          { titulo: 'El contexto', parrafos: ['Actualmente trabajo en herramientas de gobierno digital para el Gobierno del Estado de Puebla. Uno de mis proyectos es un dashboard de indicadores municipales con datos geográficos.'] },
          { titulo: 'Mi papel', parrafos: ['Soy desarrollador web en la Secretaría de Planeación, Finanzas y Administración del Gobierno del Estado de Puebla desde septiembre de 2023.'] },
          { titulo: 'Territorio y datos', parrafos: ['Este trabajo conecta mis intereses en el desarrollo web, los datos geoespaciales y la planeación regional de Puebla-Tlaxcala.'] },
        ],
      },
    ],
  },
  experiencia: {
    nombre: 'Experiencia',
    dialogo: 'Mi trayectoria en desarrollo web, pruebas de software y trabajo con personas.',
    paginas: [
      {
        titulo: 'Mi experiencia profesional.',
        introduccion: 'Ingeniero en Tecnologías de la Información con experiencia en desarrollo web y pruebas manuales de software.',
        secciones: [
          { titulo: 'Desarrollador web · Gobierno del Estado de Puebla', parrafos: ['Septiembre de 2023 – actualidad · Puebla, Puebla, México.', 'Secretaría de Planeación, Finanzas y Administración. Trabajo en herramientas de gobierno digital, incluido un dashboard de indicadores municipales con datos geográficos.'] },
          { titulo: 'Orientador de campamento · Camp Tall Timbers', parrafos: ['Junio – agosto de 2023 · High View, Virginia Occidental, Estados Unidos.', 'Trabajo diario con niñas y niños y enseñanza de actividades como senderismo, escalada y deportes.'] },
          { titulo: 'Junior Tester · ITW', parrafos: ['Septiembre de 2022 – mayo de 2023 · Ciudad de México.', 'Experiencia en pruebas manuales de software y comprobación de calidad de los productos.'] },
          { titulo: 'Tester Beginner · ITW', parrafos: ['Agosto de 2021 – noviembre de 2022 · Ciudad de México.', 'Parte de mi trayectoria en pruebas manuales de software, antes de concentrarme en el desarrollo web.'] },
          { titulo: 'Marketing · Imtechmex SAPI de CV', parrafos: ['Septiembre – diciembre de 2020 · México.', 'Diseño web y marketing.'] },
        ],
      },
      {
        titulo: 'Comunidad y conocimiento libre.',
        introduccion: 'Mi participación wikimedista también forma parte de lo que hago y de lo que aprendo.',
        accesos: [{ texto: 'Explorar mis contribuciones', capitulo: 'contribuciones', pagina: 1 }],
        secciones: [
          { titulo: 'Wikipedia, Commons y Wikidata', parrafos: ['Contribuyo principalmente a Wikipedia en español, seguido de Wikimedia Commons y Wikidata. Mi interés se concentra en la historia y la antropología de Puebla-Tlaxcala.'] },
          { titulo: 'El artículo de los tlaxcaltecas', parrafos: ['Trabajé para llevar este artículo a Artículo Destacado en Wikipedia en español: una contribución que ocupa un lugar especial en mi recorrido.'] },
          { titulo: 'Aprender con otras personas', parrafos: ['La colaboración y el aprendizaje continuo atraviesan mis intereses: desde compartir conocimiento libre hasta trabajar en equipo y enseñar actividades al aire libre.'] },
        ],
      },
      {
        titulo: 'Formación y currículum.',
        introduccion: 'Mi formación en tecnologías de la información y los aprendizajes que sigo sumando.',
        secciones: [
          { titulo: 'Ingeniería en Tecnologías de la Información', parrafos: ['Universidad Politécnica de Tlaxcala · 2018 – 2021.'] },
          { titulo: 'Cursos y certificaciones', parrafos: ['Inglés · Cloud Computing · SmallTalk English Speaking Level Test.'] },
          { titulo: 'Idiomas', parrafos: ['Español nativo · Inglés · Portugués básico.', 'Actualmente también aprendo francés y náhuatl.'] },
          { titulo: 'Mi currículum', parrafos: ['Una versión de mi perfil profesional con experiencia, formación, proyectos y habilidades.'], enlaces: [{ texto: 'Abrir mi CV en PDF', url: '/cv-nery.pdf' }] },
        ],
      },
    ],
  },
  conocimientos: {
    nombre: 'Habilidades',
    dialogo: 'Laravel, PHP y datos geoespaciales, con una base en desarrollo y pruebas manuales.',
    paginas: [
      {
        titulo: 'Mi caja de herramientas.',
        introduccion: 'Desarrollo web con Laravel/PHP y un interés especial en los datos geoespaciales.',
        secciones: [
          { titulo: 'Desarrollo web', parrafos: ['Laravel · PHP · JavaScript · HTML · CSS · Modelo-Vista-Controlador (MVC).', 'React forma parte de mi stack y de lo que estoy estudiando a mayor profundidad.'] },
          { titulo: 'Datos y mapas', parrafos: ['SQL · PostgreSQL · Leaflet. Estoy profundizando en PostGIS para análisis geoespacial.'] },
          { titulo: 'Otros conocimientos', parrafos: ['Python · Java · C · Git.', 'También tengo experiencia en análisis de sistemas y en diseño e implementación de redes WAN y LAN.'] },
          { titulo: 'Pruebas y colaboración', parrafos: ['Pruebas manuales de software, comprobación de calidad y trabajo en equipo. Mi experiencia como tester complementa mi enfoque actual en desarrollo web.'] },
        ],
      },
      {
        titulo: 'Lo que estoy aprendiendo.',
        introduccion: 'Seguir aprendiendo forma parte de mi manera de trabajar.',
        secciones: [
          { titulo: 'JavaScript y React', parrafos: ['Estoy profundizando en JavaScript y React para fortalecer mi trabajo en el frontend.'] },
          { titulo: 'PostGIS', parrafos: ['Estoy aprendiendo a utilizar PostGIS para análisis geoespacial, una conexión con mis proyectos de movilidad y datos del territorio.'] },
          { titulo: 'Más allá de lo técnico', parrafos: ['Aprendo francés y náhuatl. También sigo mi curiosidad por la historia, la política regional, la planeación urbana y la agricultura.'] },
        ],
      },
    ],
  },
  contribuciones: {
    nombre: 'Conocimiento libre',
    dialogo: 'Historia de Puebla-Tlaxcala y conocimiento que construimos entre todas las personas.',
    paginas: [
      {
        titulo: 'Compartir lo que descubrimos.',
        introduccion: 'Soy editor de Wikipedia en español y también contribuyo a Commons y Wikidata.',
        secciones: [
          { titulo: 'Lo que me mueve', parrafos: ['Me interesa la historia y la antropología de Puebla-Tlaxcala. Investigar y compartir el pasado de mi estado es una forma de expresar el orgullo que siento por ser tlaxcalteca.'] },
          { titulo: 'Wikipedia en español', parrafos: ['Es el proyecto al que más contribuyo. Trabajé para llevar el artículo de los tlaxcaltecas a Artículo Destacado y me llenan de orgullo mis aportaciones a República de Tlaxcallan, Tlaxcallan y los cuatro señores.'] },
          { titulo: 'Commons y Wikidata', parrafos: ['También participo en Wikimedia Commons y Wikidata, como parte de mi interés por el conocimiento libre.'] },
        ],
      },
      {
        titulo: 'Historias de Tlaxcala.',
        introduccion: 'Una selección de temas a los que he contribuido y que significan mucho para mí.',
        secciones: [
          { titulo: 'Los tlaxcaltecas · Artículo Destacado', parrafos: ['Trabajé para llevar el artículo de los tlaxcaltecas a Artículo Destacado en Wikipedia en español.'], enlaces: [{ texto: 'Buscar el artículo en Wikipedia', url: buscarWikipedia('Tlaxcaltecas') }] },
          { titulo: 'República de Tlaxcallan', parrafos: ['Una de las contribuciones sobre la historia de mi estado que más orgullo me dan.'], enlaces: [{ texto: 'Buscar República de Tlaxcallan en Wikipedia', url: buscarWikipedia('República de Tlaxcallan') }] },
          { titulo: 'Tlaxcallan', parrafos: ['Otro de los temas que forman parte de mi vínculo con la historia tlaxcalteca.'], enlaces: [{ texto: 'Buscar Tlaxcallan en Wikipedia', url: buscarWikipedia('Tlaxcallan') }] },
          { titulo: 'Los cuatro señores', parrafos: ['Un tema que también destaco entre mis contribuciones a Wikipedia en español.'], enlaces: [{ texto: 'Buscar los cuatro señoríos en Wikipedia', url: buscarWikipedia('Cuatro señoríos de Tlaxcala') }] },
        ],
      },
    ],
  },
  bitacora: {
    nombre: 'Bitácora',
    dialogo: 'Naturaleza, videojuegos, ciencia ficción y el sueño de un ranchito propio.',
    paginas: [
      {
        titulo: 'Fuera de la pantalla.',
        introduccion: 'Prefiero el pueblo a la ciudad y disfruto caminar en la naturaleza.',
        foto: 'malinche',
        secciones: [
          { titulo: 'Caminos y aire libre', parrafos: ['Me encanta la naturaleza y prefiero el senderismo. En Camp Tall Timbers enseñé actividades como hiking, escalada y deportes a niñas y niños.'] },
          { titulo: 'Un ranchito algún día', parrafos: ['Me interesa la agricultura y sueño con tener un ranchito propio. Mientras tanto, comparto la vida con dos gatos y un perro, entre Puebla y mi pueblo en Tlaxco.'] },
          { titulo: 'Mi próxima nota de campo', pendiente: true, parrafos: ['[Completar: el relato de una caminata, observación o descubrimiento que quieras compartir. La fotografía de La Malinche acompaña este apartado; no es una fotografía de una salida mía.]'] },
        ],
      },
      {
        titulo: 'Los mundos que me acompañan.',
        introduccion: 'Los videojuegos, la ciencia ficción y la fantasía también forman parte de mi mundo.',
        secciones: [
          { titulo: 'Una partida más', parrafos: ['League of Legends es el juego al que más tiempo dedico. También disfruto Gears, Left 4 Dead, Cities: Skylines y los juegos de Age of Empires, incluido Age of Mythology.'] },
          { titulo: 'Historias que se quedan conmigo', parrafos: ['Mi película favorita es Blade Runner 2049, seguida de Blade Runner. También me gusta Alien, especialmente Prometheus y Covenant.', 'El señor de los anillos, Crepúsculo, Robert Langdon y Juego de tronos forman parte de mis intereses.'] },
          { titulo: 'Otras curiosidades', parrafos: ['Movilidad y transporte público, planeación urbana e historia y política regional de Puebla-Tlaxcala: temas a los que vuelvo dentro y fuera de mis proyectos.'] },
        ],
      },
    ],
  },
  contacto: {
    nombre: 'Contacto',
    dialogo: 'Puedes encontrarme en LinkedIn y seguir mis proyectos en GitHub.',
    paginas: [
      {
        titulo: 'Sigamos la conversación.',
        introduccion: 'Desarrollo web, mapas, movilidad o conocimiento libre: podemos encontrar algo en común.',
        secciones: [
          { titulo: 'Contacto profesional', parrafos: ['Mi perfil de LinkedIn reúne mi trayectoria profesional y es mi medio de contacto para hablar sobre colaboraciones y oportunidades.'], enlaces: [{ texto: 'Contactar en LinkedIn', url: 'https://www.linkedin.com/in/nerypm/' }] },
          { titulo: 'Código y proyectos', parrafos: ['En GitHub puedes explorar mis repositorios y seguir el desarrollo de mis proyectos.'], enlaces: [{ texto: 'GitHub · ItsNery', url: 'https://github.com/ItsNery' }] },
          { titulo: 'Mi perfil en un documento', parrafos: ['Puedes consultar mi experiencia, formación y herramientas en el currículum.'], enlaces: [{ texto: 'Abrir mi CV en PDF', url: '/cv-nery.pdf' }] },
        ],
      },
    ],
  },
}
