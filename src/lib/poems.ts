// Liz Candelo's poems — extracted from "La casa más grande del mundo"
// (Ícono Editorial, 2019) and her Wattpad. Lines preserved verbatim.
//
// To add more: append to POEMS. The PoemReveal component picks a few
// per session based on the ID list passed in `featured` props.

export type Poem = {
  id: string;
  title: string;
  collection: string;
  year: number;
  /** First line that often acts as a dedication or pull-quote. */
  epigraph?: string;
  lines: string[];
  source: string;
};

export const POEMS: Poem[] = [
  {
    id: "palafito",
    title: "Palafito",
    collection: "La casa más grande del mundo",
    year: 2019,
    lines: [
      "La calle es de madera",
      "el puente es de madera",
      "la casa es de madera",
      "el piso es de madera",
      "la mesa es de madera",
      "el plato es de madera",
      "la cuchara es de madera",
      "la azotea es de madera",
      "el retrete… es de madera.",
      "",
      "La madre es de madera",
      "la teta es de madera",
      "la leche es de madera",
      "la escuela es de madera",
      "la maestra es de madera",
      "el niño es de madera",
      "el juguete… es de madera.",
      "",
      "La música es de madera",
      "el baile es de madera",
      "el tambor es de madera",
      "el timbal es de madera",
      "el ébano es de madera",
      "el bongó es de madera",
      "el negro es de madera",
      "su raíz es de madera",
      "su palabra… es de madera",
    ],
    source: "La casa más grande del mundo, p. 15",
  },
  {
    id: "viento-libre",
    title: "Viento Libre",
    collection: "La casa más grande del mundo",
    year: 2019,
    lines: [
      "Prefiero morir afuera",
      "donde aún duele la muerte",
      "la muerte adentro está amañada.",
      "",
      "La muerte pintura burla de sonrisa mojigata",
      "al último testigo ha callado.",
      "",
      "Prefiero morir afuera",
      "donde aún dule la muerte",
      "atrapada en tierra ajena",
      "sin astillas dónde morir",
      "pero enterrada entera.",
    ],
    source: "La casa más grande del mundo, p. 24",
  },
  {
    id: "apellidos",
    title: "Apellidos",
    collection: "La casa más grande del mundo",
    year: 2019,
    epigraph: "Tratando de no hacer ruido tropecé con todo.",
    lines: [
      "Tratando de no hacer ruido",
      "tropecé con todo.",
      "",
      "Dentro de tus ojos",
      "hay una casa frente al mar",
      "con las ventanas siempre abiertas.",
      "",
      "En tu silencio para qué preguntar",
      "si tu respuesta en silencio me das.",
      "",
      "Tus palabras como lluvia",
      "caerán sobre un paraguas",
      "que no sostengo yo.",
      "",
      "Cuando las palabras sobran,",
      "apareces tú.",
      "",
      "Hoy no llevo equipaje,",
      "hoy mis sueños pesan,",
      "hoy las puertas que conducen",
      "a ningún lugar se han abierto…",
      "Ahí esperaré",
      "a quien me espera.",
    ],
    source: "La casa más grande del mundo, p. 51",
  },
  {
    id: "yomando",
    title: 'Yo soy el negro «Yomandó»',
    collection: "La casa más grande del mundo",
    year: 2019,
    lines: [
      "Soy agua soy madera",
      "fuerte como el puente",
      "que une mis ancestros",
      "madera que soporta",
      "raza coraje y aliento.",
      "",
      "Viga nueva me reemplaza",
      "lama ni polilla me desintegra.",
      "",
      "Soy tierra hecha de fuego,",
      "marea, escama y cadena.",
      "",
      "Semilla de carbón,",
      "diamante oculto",
      "por negro en hoyo",
      "de Sierra Leona.",
      "",
      "Negra entre los blancos,",
      "entre los negros",
      "lo que respira mi tez desnuda.",
      "",
      "Puerto y arena juntos",
      "en un amanecer sin luna.",
    ],
    source: "La casa más grande del mundo, p. 16",
  },
  {
    id: "mujer-hermosa",
    title: "La mujer más hermosa del planeta",
    collection: "La casa más grande del mundo",
    year: 2019,
    epigraph: "A mi madre",
    lines: [
      "¿Por qué tan linda, señora Ángela?",
      "Y miro el atardecer.",
      "",
      "Con el regalo de su sonrisa",
      "inunda mi cara de colores.",
      "Hay universos",
      "construidos en su vientre.",
      "",
      "Dividió Júpiter en cuatro planetas",
      "para ofrecerlos a la Tierra",
      "sin mezquindad.",
      "",
      "Acunó un océano.",
      "Le puso techo a la hamaca",
      "y en forma de barca",
      "creó un río",
      "que transporta esperanzas",
      "por el surco",
      "de las líneas de su mano.",
      "",
      "Su voz angelical",
      "en serpentinas de susurros",
      "atrae mis oídos",
      "a sus delicados labios.",
    ],
    source: "La casa más grande del mundo, p. 29",
  },
  {
    id: "viento-libre-palafito",
    title: "Viento libre",
    collection: "Wattpad · Tratando de no hacer ruido",
    year: 2017,
    lines: [
      "La calle es de madera",
      "el puente es de madera,",
      "la casa es de madera,",
      "el retrete es de madera.",
      "",
      "La madre es de madera",
      "la teta es de madera",
      "la escuela es de madera.",
      "El niño es de madera",
      "el juguete es de madera.",
      "",
      "El mar es de madera,",
      "el viento es de madera,",
      "las olas son de madera,",
      "el muelle es de madera.",
      "",
      "El negro es de madera,",
      "el temple es de madera,",
      "el sudor es de madera,",
      "el niño Dios es de madera.",
      "",
      "Acabo de construir mi barrio",
      "Viento Libre, Buenaventura,",
      "con las escamas del salmón.",
    ],
    source: "Wattpad — LizCandelo, 2017",
  },
];

export function getPoem(id: string): Poem | undefined {
  return POEMS.find((p) => p.id === id);
}

/**
 * Slugs for the /obra/[slug] dynamic route. Add more as books land.
 * Each maps to a poem excerpt or book description on the detail page.
 */
export const BOOK_SLUGS: Record<
  string,
  {
    title: string;
    publisher: string;
    year: number;
    isbn: string;
    excerpt: string;
    featuredPoems: string[];
  }
> = {
  "la-casa-mas-grande-del-mundo": {
    title: "La casa más grande del mundo",
    publisher: "Ícono Editorial",
    year: 2019,
    isbn: "978-958-5472-16-7",
    excerpt:
      "Una invitación a habitar la infancia como territorio y la casa como metáfora de la dignidad. Liz Candelo reconstruye la memoria de un Pacífico que se piensa en plural — donde crecer, criar y recordar son actos colectivos.",
    featuredPoems: ["palafito", "viento-libre", "yomando", "mujer-hermosa"],
  },
  "la-gramatica-de-los-mundos": {
    title: "La Gramática de los Mundos",
    publisher: "Ícono Editorial",
    year: 2019,
    isbn: "(pendiente)",
    excerpt:
      "Su segundo poemario, también publicado por Ícono Editorial. Fragmentos disponibles en eventos de lectura y próximas sesiones.",
    featuredPoems: ["apellidos"],
  },
};

/**
 * Workshop placeholders — detail pages will be rendered for each slug.
 * Real copy arrives from Liz; these exist so the routing is live and
 * shareable before content is final.
 */
export const WORKSHOP_SLUGS: Record<
  string,
  {
    title: string;
    modality: string;
    duration: string;
    audience: string;
    summary: string;
    nextSession?: string;
    priceFrom: string;
  }
> = {
  "escritura-del-pacifico": {
    title: "Escritura del Pacífico: memoria y territorio",
    modality: "Taller presencial / híbrido",
    duration: "4 sesiones × 2h",
    audience: "Docentes, estudiantes, público general",
    summary:
      "Recorrido por la tradición oral del Pacífico colombiano. Lectura, escritura y ejercicios de memoria a partir de los poemarios de Liz y de las voces de Viento Libre y San Antonio de los Caballeros.",
    nextSession: "(por confirmar)",
    priceFrom: "(por confirmar)",
  },
  "lectura-en-voz-alta": {
    title: "Lectura en voz alta para maestras y maestros",
    modality: "Taller presencial",
    duration: "1 sesión × 3h",
    audience: "Docentes de primaria y secundaria",
    summary:
      "Cómo llevar los poemas del Pacífico al aula. Técnicas de lectura, dinámicas de escucha y construcción de un recital colectivo con la obra de Liz como hilo conductor.",
    nextSession: "(por confirmar)",
    priceFrom: "(por confirmar)",
  },
};
