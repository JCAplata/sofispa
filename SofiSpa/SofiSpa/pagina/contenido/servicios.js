/*
  CATÁLOGO DE SOFISPA
  1. Cambia los nombres, descripciones y precios por los datos reales de Sofi.
  2. Los precios de este archivo son ejemplos ilustrativos: reemplázalos antes de publicar.
  3. Las rutas de imágenes son referencias. Agrega tus fotografías manualmente en src/img/.
  4. Cada imagen incluida en el mensaje de WhatsApp usará la misma ruta que aparece aquí.
*/


// Paletas sugeridas. La clienta puede seleccionar varios tonos por servicio.
// Uñas y labios: colores cosméticos habituales. Cabello y cejas: tonos naturales.
const SOFISPA_PALETTES = {
  manicure: [
    { name: "Rosa", hex: "#E8A0B4" }, { name: "Rojo", hex: "#C6283D" },
    { name: "Nude", hex: "#D9B69B" }, { name: "Blanco", hex: "#F7F3EE" },
    { name: "Negro", hex: "#292329" }, { name: "Lila", hex: "#B9A0D2" },
    { name: "Azul", hex: "#547CA8" }, { name: "Verde", hex: "#78977B" },
    { name: "Dorado", hex: "#C5A35B" }, { name: "Plateado", hex: "#BFC2C8" }
  ],
  pedicure: [
    { name: "Rosa", hex: "#E8A0B4" }, { name: "Rojo", hex: "#C6283D" },
    { name: "Nude", hex: "#D9B69B" }, { name: "Blanco", hex: "#F7F3EE" },
    { name: "Negro", hex: "#292329" }, { name: "Lila", hex: "#B9A0D2" },
    { name: "Azul", hex: "#547CA8" }, { name: "Verde", hex: "#78977B" },
    { name: "Dorado", hex: "#C5A35B" }, { name: "Plateado", hex: "#BFC2C8" }
  ],
  labios: [
    { name: "Rosa claro", hex: "#E7A0A5" }, { name: "Rosa viejo", hex: "#C77D87" },
    { name: "Nude", hex: "#C98F7C" }, { name: "Durazno", hex: "#E7A17F" },
    { name: "Coral", hex: "#E87568" }, { name: "Rojo", hex: "#B52D43" },
    { name: "Malva", hex: "#A96D82" }, { name: "Berry", hex: "#783D59" }
  ],
  cabello: [
    { name: "Negro natural", hex: "#211B19" }, { name: "Castaño oscuro", hex: "#38251F" },
    { name: "Chocolate", hex: "#513326" }, { name: "Castaño medio", hex: "#68452F" },
    { name: "Castaño claro", hex: "#8A6241" }, { name: "Avellana", hex: "#A77A50" },
    { name: "Caramelo", hex: "#B9824F" }, { name: "Miel", hex: "#C99B56" },
    { name: "Rubio oscuro", hex: "#A58A5D" }, { name: "Rubio dorado", hex: "#D5B66B" },
    { name: "Rubio ceniza", hex: "#B7AA91" }, { name: "Cobrizo", hex: "#A95835" },
    { name: "Caoba", hex: "#713B32" }, { name: "Borgoña", hex: "#632D42" }
  ],
  cejas: [
    { name: "Castaño muy claro", hex: "#B18A68" }, { name: "Castaño claro", hex: "#98704F" },
    { name: "Castaño medio", hex: "#765238" }, { name: "Castaño oscuro", hex: "#51382D" },
    { name: "Chocolate", hex: "#402B25" }, { name: "Marrón frío", hex: "#66564D" },
    { name: "Negro suave", hex: "#302A28" }, { name: "Negro", hex: "#211E1D" }
  ]
};

const SOFISPA_SERVICES = [
  {
    id: "manicure-semipermanente",
    category: "manicure",
    categoryLabel: "Manicure",
    name: "Manicure semipermanente",
    description: "Un acabado cuidado y duradero para tus manos.",
    price: 45000, // EJEMPLO: reemplazar por precio real
    image: "../src/img/manicure/4.jpeg",
    imageAlt: "Referencia de manicure semipermanente",
    featured: true
  },
  {
    id: "manicure-tradicional",
    category: "manicure",
    categoryLabel: "Manicure",
    name: "Manicure tradicional",
    description: "Cuidado de uñas y esmaltado tradicional.",
    price: 30000, // EJEMPLO
    image: "../src/img/manicure/5.jpeg",
    imageAlt: "Referencia de manicure tradicional",
    featured: false
  },
  {
    id: "diseno-francesa",
    category: "manicure",
    categoryLabel: "Manicure",
    name: "Diseño francesa",
    description: "Un estilo clásico y delicado para tus uñas.",
    price: 50000, // EJEMPLO
    image: "../src/img/manicure/1.jpeg",
    imageAlt: "Referencia de uñas francesas",
    featured: false
  },
  {
    id: "pedicure-tradicional",
    category: "pedicure",
    categoryLabel: "Pedicure",
    name: "Pedicure tradicional",
    description: "Cuidado estético para tus pies y uñas.",
    price: 35000, // EJEMPLO
    image: "../src/img/pedicure/pies.jpg",
    imageAlt: "Referencia de pedicure tradicional",
    featured: true
  },
  {
    id: "pedicure-semipermanente",
    category: "pedicure",
    categoryLabel: "Pedicure",
    name: "Pedicure semipermanente",
    description: "Un acabado brillante y elegante para tus pies.",
    price: 45000, // EJEMPLO
    image: "../src/img/pedicure/pies2.jpeg",
    imageAlt: "Referencia de pedicure semipermanente",
    featured: false
  },
  {
    id: "tinturado-cabello",
    category: "cabello",
    categoryLabel: "Cabello",
    name: "Tinturado de cabello",
    description: "Coloración personalizada según tu cabello y resultado deseado. Precio sujeto a valoración.",
    price: 120000, // EJEMPLO: puede variar según largo, cantidad y técnica
    image: "../src/img/cabello/cabello.avif",
    imageAlt: "Referencia de tinturado de cabello",
    featured: true
  },
  {
    id: "retoque-raiz",
    category: "cabello",
    categoryLabel: "Cabello",
    name: "Retoque de raíz",
    description: "Mantenimiento del color en el crecimiento del cabello.",
    price: 80000, // EJEMPLO
    image: "../src/img/cabello/cabello.avif",
    imageAlt: "Referencia de retoque de raíz",
    featured: false
  },
  {
    id: "pigmentacion-cejas",
    category: "cejas",
    categoryLabel: "Pigmentación de cejas",
    name: "Pigmentación de cejas",
    description: "Diseño y definición de cejas. Requiere valoración previa.",
    price: 90000, // EJEMPLO
    image: "../src/img/cejas/cejas.jpeg",
    imageAlt: "Referencia de pigmentación de cejas",
    featured: true
  },
  {
    id: "pigmentacion-labios",
    category: "labios",
    categoryLabel: "Pigmentación de labios",
    name: "Pigmentación de labios",
    description: "Realce del tono y definición de labios. Requiere valoración previa.",
    price: 150000, // EJEMPLO
    image: "../src/img/labios/labios.webp",
    imageAlt: "Referencia de pigmentación de labios",
    featured: true
  }
];

const SOFISPA_GALLERY = [
  { id: "g1", category: "manicure", title: "Manicure de inspiración", image: "../src/img/galeria/manicure-01.jpg" },
  { id: "g2", category: "pedicure", title: "Pedicure de inspiración", image: "../src/img/galeria/pedicure-01.jpg" },
  { id: "g3", category: "cabello", title: "Color de cabello", image: "../src/img/galeria/cabello-01.jpg" },
  { id: "g4", category: "cejas", title: "Diseño de cejas", image: "../src/img/galeria/cejas-01.jpg" },
  { id: "g5", category: "labios", title: "Pigmentación de labios", image: "../src/img/galeria/labios-01.jpg" },
  { id: "g6", category: "manicure", title: "Diseño de uñas", image: "../src/img/galeria/manicure-02.jpg" }
];

// Sustituye estos ejemplos por reseñas auténticas y autorizadas.
const SOFISPA_REVIEWS = [
  { name: "Cliente de SofiSpa", text: "Aquí aparecerá una opinión real de una clienta.", rating: 5 },
  { name: "Cliente de SofiSpa", text: "Agrega aquí otro testimonio con autorización.", rating: 5 },
  { name: "Cliente de SofiSpa", text: "Puedes mostrar hasta tres opiniones destacadas.", rating: 5 }
];

const SOFISPA_FAQS = [
  {
    question: "¿Cómo puedo solicitar una cita?",
    answer: "Agrega uno o varios servicios a tu selección, completa tus datos y envía la solicitud por WhatsApp. Sofi confirmará la disponibilidad."
  },
  {
    question: "¿Puedo combinar varios servicios en una misma cita?",
    answer: "¡Sí! Puedes seleccionar servicios de distintas categorías y enviar una sola solicitud. Sofi te confirmará si es posible realizarlos en el mismo horario."
  },
  {
    question: "¿Ofrecen atención a domicilio?",
    answer: "Sí. Selecciona la modalidad a domicilio al preparar tu solicitud e incluye tu dirección. La cobertura y disponibilidad se confirman por WhatsApp."
  },
  {
    question: "¿Los precios publicados son definitivos?",
    answer: "Los precios son una referencia. Algunos servicios, como el tinturado, pueden variar según el largo, cantidad de producto y técnica. Sofi confirmará el precio antes de la cita."
  },
  {
    question: "¿Qué pasa después de enviar mi solicitud?",
    answer: "WhatsApp abrirá un mensaje con los servicios y las imágenes que elegiste. La cita solo queda confirmada cuando Sofi te responda y acuerden los detalles."
  }
];
