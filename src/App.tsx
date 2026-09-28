import { useEffect, useRef } from 'react'
import { Intro } from './components/Intro'

/* ─── Data ─── */

interface Dish {
  name: string
  price?: string
  description: string
  note?: string
}

interface SubSection {
  subtitle: string
  dishes: Dish[]
}

interface MenuSection {
  number: string
  title: string
  subsections?: SubSection[]
  dishes?: Dish[]
}

const menuSections: MenuSection[] = [
  {
    number: '01',
    title: 'DESAYUNOS',
    subsections: [
      {
        subtitle: 'Guatemalteco',
        dishes: [
          {
            name: 'Amanecer Etrog',
            price: 'Q70',
            description:
              'Huevos al gusto, pincho de carne asada, tortillas con queso, frijoles parados (picantes), rodaja de plátano a la parrilla, crema y chirmol.',
            note: 'Incluye café con refill, jugo de temporada y pan o tortilla',
          },
          {
            name: 'Desayuno Guatemalteco',
            price: 'Q60',
            description:
              'Huevos fritos al gusto, frijoles volteados, longaniza criolla, salsa ranchera, queso fresco, plátanos fritos, crema.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
          {
            name: 'Chilaquiles',
            price: 'Q65',
            description:
              'Chilaquiles con pollo desmenuzado en salsa roja y verde, huevos al gusto y lascas de aguacate.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
        ],
      },
      {
        subtitle: 'Motuleño',
        dishes: [
          {
            name: 'Huevos Motuleños',
            price: 'Q55',
            description:
              'Huevos fritos sobre tortillas con frijol, salsa ranchera, maíz dulce, queso fresco, cilantro y plátanos fritos con crema y sal gruesa.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
          {
            name: 'Desayuno Americano',
            price: 'Q50',
            description: 'Huevos al gusto, panqueques, tocino frito y fruta fresca.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
        ],
      },
      {
        subtitle: 'Dulces',
        dishes: [
          {
            name: 'Panqueques Campestres',
            price: 'Q40',
            description:
              'Tres panqueques con fruta de temporada, mantequilla y miel de abeja o syrup de maple.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
          {
            name: 'Omelet',
            price: 'Q65',
            description:
              'Omelet preparado al momento, relleno a elegir: jamón y queso, champiñones o espinaca.',
            note: 'Incluye café con refill, jugo y pan o tortilla',
          },
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'TRADICIONALES',
    dishes: [
      {
        name: 'Caldo de Gallina',
        price: 'Q70',
        description:
          'Caldo rojo de gallina con vegetales al punto y hierbas de la región. Servido con arroz blanco, tamalitos de maíz y aguacate fresco.',
      },
      {
        name: 'Caldo de Chojín',
        price: 'Q70',
        description:
          'Caldo de carne de res chojineada al carbón con vegetales y hierbas de la región. Servido con arroz blanco, tamalitos de maíz y aguacate fresco.',
      },
    ],
  },
  {
    number: '03',
    title: 'ENTRADAS',
    dishes: [
      {
        name: 'Carpaccio de lomito',
        price: 'Q75',
        description: 'Láminas de lomito con cítricos y aderezo de la casa.',
      },
      {
        name: 'Nachos con carne y queso',
        price: 'Q55',
        description: 'Totopos artesanales con queso fundido y carne sazonada. Para compartir.',
      },
      {
        name: 'Sopa de tortilla',
        price: 'Q45',
        description: 'Caldo especiado con tortilla crujiente.',
      },
      {
        name: 'Alitas en salsa Búfalo o BBQ',
        price: 'Q55',
        description: 'Alitas glaseadas en salsa Búfalo (picante) o BBQ (dulce y ahumada).',
      },
      {
        name: 'Mejillones al Perol',
        price: 'Q100',
        description:
          'Mejillones media concha sofritos en mantequilla de ajo con cebolla en brunoise, marinados en vino blanco y terminados en crema.',
      },
    ],
    subsections: [
      {
        subtitle: 'Ensaladas',
        dishes: [
          {
            name: 'Ensalada César',
            price: 'Q65',
            description:
              'Hojas frescas con aderezo César, filete de pollo a la plancha, tomate, aceitunas negras y verdes, cebolla, crutones y parmesano.',
          },
          {
            name: 'Ensalada Mixta con Pollo',
            price: 'Q65',
            description:
              'Lechugas con pepino, tomate en gajos, cebolla morada, huevo duro, chile pimiento, queso fresco y pollo. Chips de tortilla y aderezo Mil Islas.',
          },
          {
            name: 'Ensalada Campestre de Pollo',
            price: 'Q65',
            description:
              'Lechuga con maíz dulce, queso fresco, tomate y cebolla, con pollo a la plancha y aderezo italiano.',
          },
        ],
      },
    ],
  },
  {
    number: '04',
    title: 'FRUTOS DEL MAR',
    subsections: [
      {
        subtitle: 'Parrilla',
        dishes: [
          {
            name: 'Parrillada Mazatleca',
            price: 'Q170',
            description: 'Tentáculos de pulpo, filete de tilapia y camarones jumbo asados al punto.',
          },
        ],
      },
      {
        subtitle: 'Caldos',
        dishes: [
          {
            name: 'Caldo de Mariscos',
            price: 'Q200',
            description: 'Jaiba, mejillón en media concha, camarones, aros de calamar y almeja blanca, con morra frita.',
          },
        ],
      },
      {
        subtitle: 'Pescados',
        dishes: [
          {
            name: 'Filete de tilapia',
            price: 'Q75',
            description: 'A la plancha, empanizado o al ajillo.',
          },
          {
            name: 'Tilapia entera',
            price: 'Q99',
            description: 'Frita o al ajillo.',
          },
          {
            name: 'Mojarra Zarandeada',
            price: 'Q110',
            description: 'Tilapia marinada en adobo de chiles y asada a la parrilla.',
          },
        ],
      },
      {
        subtitle: 'Camarones',
        dishes: [
          {
            name: 'Camarones ETROG',
            price: 'Q165',
            description: 'Receta de la casa: gratinados estilo termidor o sellados a la parrilla.',
          },
          {
            name: 'Camarón jumbo',
            price: 'Q125',
            description: 'A la plancha, empanizado o al ajillo.',
          },
          {
            name: 'Camarones Louisiana',
            price: 'Q125',
            description: 'Salteados con especias Cajun, papa baby y elote dulce. Servidos con arroz.',
          },
          {
            name: 'Camarones Tropicales al Coco',
            price: 'Q135',
            description: 'Empanizados en batter y coco rallado, con toque picante, aderezo Mil Islas y guarnición a elección.',
          },
        ],
      },
      {
        subtitle: 'Mariscos',
        dishes: [
          {
            name: 'Pulpo al ajillo',
            price: 'Q99',
            description: 'Pulpo salteado al ajillo.',
          },
        ],
      },
      {
        subtitle: 'Crudos',
        dishes: [
          {
            name: 'Ceviche',
            price: 'Q125',
            description: 'Marinado en cítricos con el toque de la casa. Camarón o mixto (camarón, pulpo y calamar).',
          },
        ],
      },
    ],
  },
  {
    number: '05',
    title: 'CORTES Y PARRILLA',
    subsections: [
      {
        subtitle: 'Cortes',
        dishes: [
          {
            name: 'Puyazo importado (1/2 lb)',
            price: 'Q140',
            description: 'Corte importado asado a la parrilla al punto de su elección, con guarniciones.',
          },
          {
            name: 'Lomito importado (1/2 lb)',
            price: 'Q140',
            description: 'Corte importado asado a la parrilla al punto de su elección, con guarniciones.',
          },
          {
            name: 'Churrasco de Viuda Importada',
            price: 'Q110',
            description: 'Corte importado asado a la parrilla al punto de su elección, con guarniciones.',
          },
          {
            name: 'Pollo a la parrilla (6 oz)',
            price: 'Q75',
            description: 'Filete de pollo a la parrilla.',
          },
        ],
      },
      {
        subtitle: 'Parrilladas',
        dishes: [
          {
            name: 'Parrillada para 2 personas',
            price: 'Q300',
            description: '1/2 lb de lomito importado, 1/2 lb de puyazo importado, 6 oz de filete de pollo y 2 longanizas.',
          },
          {
            name: 'Parrillada para 4 personas',
            price: 'Q550',
            description: '1 lb de lomito importado, 1 lb de puyazo importado, 12 oz de filete de pollo y 4 longanizas.',
          },
        ],
      },
      {
        subtitle: 'Mar y Tierra',
        dishes: [
          {
            name: 'Mar y Tierra',
            price: 'Q225',
            description: '5 camarones jumbo al gusto (ajo, plancha, empanizados o termidor) con corte de 8 oz a elegir: puyazo o lomito.',
          },
        ],
      },
    ],
  },
  {
    number: '06',
    title: 'SANDWICHERÍA',
    subsections: [
      {
        subtitle: 'Hamburguesas',
        dishes: [
          {
            name: 'Quesoburguesa Clásica ETROG',
            price: 'Q60',
            description: 'Carne de res con queso americano fundido y vegetales frescos. Con papas fritas.',
            note: 'Huevo adicional +Q5',
          },
          {
            name: 'Hamburguesa Premium ETROG',
            price: 'Q80',
            description: 'Res a la parrilla con queso, tocino, cebolla caramelizada, tomate y lechuga, en pan artesanal tostado con mantequilla de la casa.',
          },
        ],
      },
      {
        subtitle: 'Burritos',
        dishes: [
          {
            name: 'Burrito ETROG de Pollo Asado',
            price: 'Q60',
            description: 'Tortilla de harina con pollo asado, salsa de queso americano, frijoles de la casa, arroz y aguacate. Con salsa de la casa y Papas ETROG.',
          },
          {
            name: 'Burrito ETROG de Lomito',
            price: 'Q75',
            description: 'Tortilla de harina con lomito salteado, vegetales, aguacate y mozzarella fundida. Con salsa de la casa.',
          },
        ],
      },
      {
        subtitle: 'Baguettes',
        dishes: [
          {
            name: 'Baguette de Orégano con Pollo',
            price: 'Q60',
            description: 'Pollo a la parrilla marinado en aceite de especias y hortalizas. Con papas tipo francesa.',
          },
          {
            name: 'Baguette de Lomito',
            price: 'Q75',
            description: 'Cubos de lomito salteados con vegetales, aguacate y mozzarella fundido.',
          },
        ],
      },
    ],
  },
  {
    number: '07',
    title: 'PASTA',
    dishes: [
      {
        name: 'Fettuccini Alfredo con Camarón',
        price: 'Q135',
        description: 'Salsa Alfredo de mantequilla y parmesano, nuez moscada, pimiento dulce y cebolla blanca, con camarones a la parrilla.',
      },
      {
        name: 'Fettuccini Alfredo con Pollo a la Parrilla',
        price: 'Q135',
        description: 'Salsa Alfredo cremosa con parmesano, nuez moscada, pimiento dulce y cebolla blanca, con pechuga a la parrilla.',
      },
      {
        name: 'Fettuccini Alfredo con Lomito',
        price: 'Q135',
        description: 'Lomito salteado en salsa cremosa con parmesano, pimiento dulce y cebolla blanca.',
      },
    ],
  },
  {
    number: '08',
    title: 'INFANTIL',
    dishes: [
      {
        name: 'Deditos Crujientes de Pollo',
        price: 'Q40',
        description: 'Tiras de pollo empanizadas con papas fritas.',
      },
    ],
  },
  {
    number: '09',
    title: 'POSTRES',
    dishes: [
      {
        name: 'Pie de Queso',
        price: 'Q35',
        description: 'Base crujiente y relleno cremoso.',
      },
      {
        name: 'Pie de Chocobanano',
        price: 'Q35',
        description: 'Chocolate y banano, textura cremosa.',
      },
      {
        name: 'Crepa con bola de helado',
        price: 'Q35',
        description: 'Crepas tibias con una bola de helado y topping a elegir: fresa, banano o Nutella.',
      },
      {
        name: 'Molletes Dulces',
        price: 'Q30',
        description: 'Pan con relleno dulce y cremoso.',
      },
      {
        name: 'Mole de Plátano',
        price: 'Q30',
        description: 'Plátano maduro frito napado con mole de chocolate de la casa.',
      },
    ],
  },
  {
    number: '10',
    title: 'GUARNICIONES',
    dishes: [
      { name: 'Queso fresco', price: 'Q12', description: '' },
      { name: 'Crema', price: 'Q12', description: '' },
      { name: 'Longaniza', price: 'Q16', description: '' },
      { name: 'Frijoles volteados', price: 'Q10', description: '' },
      { name: 'Guacamol', price: 'Q20', description: '' },
      { name: 'Papas Etrog', price: 'Q25', description: 'Cubos salteados en mantequilla con pimentón, parmesano y perejil.' },
      { name: 'Papas fritas', price: 'Q25', description: '' },
      { name: 'Huevos al gusto', price: 'Q15', description: '' },
      { name: 'Porción de pan', price: 'Q10', description: 'Simple, ajo o mantequilla.' },
      { name: 'Porción de tamalitos', price: 'Q10', description: '' },
      { name: 'Porción de arroz', price: 'Q10', description: '' },
      { name: 'Porción de tortillas', price: 'Q7', description: '' },
    ],
  },
  {
    number: '11',
    title: 'BEBIDAS',
    subsections: [
      {
        subtitle: 'Calientes',
        dishes: [
          {
            name: 'Café Americano',
            price: 'Q20',
            description: 'Café de la región de Antigua Guatemala, tueste oscuro con notas a chocolate, mora y miel de maple.',
          },
          { name: 'Café con leche', price: 'Q25', description: '' },
          { name: 'Capuchino', price: 'Q25', description: '' },
          { name: 'Latte', price: 'Q25', description: '' },
          { name: 'Mocca', price: 'Q30', description: '' },
          { name: 'Chocolate con agua', price: 'Q25', description: '' },
          { name: 'Chocolate con leche', price: 'Q30', description: '' },
          {
            name: 'Té e infusiones',
            price: 'Q15',
            description: 'Manzanilla, verde, manzana-canela, negro, Lipton.',
          },
        ],
      },
      {
        subtitle: 'Moctels',
        dishes: [
          {
            name: 'Ginger Fresh',
            price: 'Q35',
            description: 'Syrup de jengibre, limón, jugo de piña y soda.',
          },
          {
            name: 'Atardecer',
            price: 'Q35',
            description: 'Cold brew, jugo de naranja y ginger ale.',
          },
          {
            name: 'Piña colada virgen',
            price: 'Q40',
            description: 'Jugo de piña, crema de coco y toque de leche.',
          },
          {
            name: 'Mojito de fresa',
            price: 'Q40',
            description: 'Syrup de fresa, jugo de limón, hierbabuena y soda.',
          },
          {
            name: 'Sangría Tinta',
            price: 'Q40',
            description: 'Sour mix, soda y vino tinto.',
          },
        ],
      },
      {
        subtitle: 'Vinos y Espumosos',
        dishes: [
          {
            name: 'Casillero del Diablo Cabernet Sauvignon',
            price: 'Q240',
            description: 'Aromas a cereza y grosella negra con toque de vainilla. Para carnes rojas asadas y quesos maduros.',
          },
          {
            name: 'Casillero del Diablo Merlot',
            price: 'Q240',
            description: 'Cereza y guinda con toques de toffee y vainilla. Para quesos suaves, pastas, risottos y carnes ligeras.',
          },
          {
            name: 'Casillero del Diablo Rosé',
            price: 'Q240',
            description: 'Balance entre acidez, mineralidad y delicadeza. Para aperitivos, quesos y frutos secos.',
          },
          {
            name: 'Casillero del Diablo Sauvignon Blanc',
            price: 'Q240',
            description: 'Notas a lima, durazno y toques herbales. Para ceviches, mariscos frescos y ensaladas.',
          },
          {
            name: 'Moscato Fili',
            price: 'Q190',
            description: 'Vino dulce y aromático. Para postres, frutas frescas y quesos azules.',
          },
          {
            name: 'Fragolino Bianco',
            price: 'Q190',
            description: 'Semiespumoso a base de vino. Para repostería y ensaladas de frutas.',
          },
          {
            name: 'Fragolino Rosso',
            price: 'Q190',
            description: 'Semiespumoso a base de vino. Para pastas y pizza.',
          },
          {
            name: 'Frontera Merlot',
            price: 'Q175',
            description: 'Cereza, pimientos y toque a cacao. Para pastas, quesos, carnes rojas y pollo a la parrilla.',
          },
          {
            name: 'Frontera Carménère',
            price: 'Q175',
            description: 'Suavidad y equilibrio en boca. Para pastas, quesos, pollo a la parrilla y risottos.',
          },
          {
            name: 'Frontera Spritzer Rosé Roses',
            price: 'Q175',
            description: 'Aroma a pétalos de rosas. Aperitivo o con postres.',
          },
          {
            name: 'Frontera Spritzer Elderflower',
            price: 'Q175',
            description: 'Vino blanco y flor de saúco. Para comidas ligeras y aperitivos.',
          },
        ],
      },
      {
        subtitle: 'Naturales',
        dishes: [
          { name: 'Jamaica', price: 'Q30', description: '', note: 'Pichel Q100' },
          { name: 'Guanábana', price: 'Q30', description: '', note: 'Pichel Q100' },
          { name: 'Horchata', price: 'Q30', description: '', note: 'Pichel Q100' },
          { name: 'Naranjada con agua', price: 'Q30', description: '', note: 'Pichel Q100' },
          { name: 'Naranjada con soda', price: 'Q35', description: '', note: 'Pichel Q110' },
          { name: 'Naranjada con pepitoria', price: 'Q35', description: '' },
          { name: 'Limonada con agua', price: 'Q30', description: '', note: 'Pichel Q100' },
          { name: 'Limonada con soda', price: 'Q35', description: '', note: 'Pichel Q110' },
          { name: 'Jugo de naranja', price: 'Q40', description: '' },
        ],
      },
      {
        subtitle: 'Frías',
        dishes: [
          { name: 'Coca Cola', price: 'Q15', description: '' },
          { name: 'Coca Cola sabores', price: 'Q15', description: 'Fanta naranja, Sprite, Toronja, Coca Zero.' },
          { name: 'Pepsi', price: 'Q15', description: '' },
          { name: 'Pepsi sabores', price: 'Q15', description: 'Mineral, Grapete.' },
          { name: 'Agua pura en botella', price: 'Q12', description: '' },
          { name: 'Cimarrona', price: 'Q20', description: '' },
          { name: 'V8 preparado', price: 'Q25', description: '' },
          { name: 'Fruit Punch', price: 'Q30', description: 'Jugo de piña, limón, naranja y granadina.' },
        ],
      },
      {
        subtitle: 'Frappés',
        dishes: [
          {
            name: 'Frappuchino',
            price: 'Q35',
            description: 'Café, leche, helado de vainilla, crema batida y topping de chocolate.',
          },
          {
            name: 'Frappé Oreo',
            price: 'Q35',
            description: 'Café, leche, galleta Oreo, syrup de chocolate y crema batida.',
          },
          {
            name: 'Frappé de caramelo con maní',
            price: 'Q35',
            description: 'Café, leche, syrup de caramelo, maní y crema batida.',
          },
        ],
      },
      {
        subtitle: 'Licuados',
        dishes: [
          {
            name: 'Licuado de fruta',
            price: 'Q20',
            description: 'Banano, fresa, papaya o sandía.',
            note: 'Leche entera o deslactosada',
          },
          {
            name: 'Licuado Fresa-banano',
            price: 'Q25',
            description: '',
            note: 'Leche entera o deslactosada',
          },
          {
            name: 'Tres Amores',
            price: 'Q30',
            description: 'Mora, fresa y jugo de naranja.',
            note: 'Leche entera o deslactosada',
          },
          {
            name: 'Chocomilk',
            price: 'Q25',
            description: '',
            note: 'Leche entera o deslactosada',
          },
        ],
      },
    ],
  },
  {
    number: '12',
    title: 'BUFFET',
    dishes: [
      {
        name: 'Buffet dominical',
        description: 'Todos los domingos, 7:00 am a 11:00 am. Precio y contenido por confirmar por WhatsApp.',
      },
    ],
  },
]

/* ─── Intersection Observer Hook ─── */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const targets = el.querySelectorAll('.animate-on-scroll')
    targets.forEach((target) => observer.observe(target))

    return () => observer.disconnect()
  }, [])

  return ref
}

/* ─── Components ─── */

function GoldDivider({ strong = false }: { strong?: boolean }) {
  return (
    <div
      className={strong ? 'gold-divider-strong' : 'gold-divider'}
      role="separator"
      aria-hidden="true"
    />
  )
}

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="animate-on-scroll mb-10 text-center">
      <span
        className="font-mono text-xs tracking-[0.3em] uppercase"
        style={{ color: 'var(--gold-muted)' }}
      >
        {number}
      </span>
      <h2
        className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
        style={{ color: 'var(--cream)' }}
      >
        {title}
      </h2>
    </div>
  )
}

function SubSectionHeader({ subtitle }: { subtitle: string }) {
  return (
    <h3
      className="animate-on-scroll mt-8 mb-4 font-display text-sm font-400 tracking-[0.15em] uppercase"
      style={{ color: 'var(--gold)' }}
    >
      {subtitle}
    </h3>
  )
}

function DishRow({ dish, compact = false }: { dish: Dish; compact?: boolean }) {
  return (
    <article className={`animate-on-scroll ${compact ? 'py-3' : 'py-5'}`}>
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={`font-display leading-snug ${compact ? 'text-sm' : 'text-base'} font-400`}
          style={{ color: 'var(--body)' }}
        >
          {dish.name}
        </h3>
        {dish.price && (
          <span
            className="font-mono tabular-nums shrink-0 text-sm"
            style={{ color: 'var(--gold)' }}
          >
            {dish.price}
          </span>
        )}
      </div>
      {dish.description && (
        <p
          className={`mt-1.5 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}
          style={{ color: 'var(--body-75)' }}
        >
          {dish.description}
        </p>
      )}
      {dish.note && (
        <p
          className="mt-1 text-xs italic"
          style={{ color: 'var(--gold-muted)' }}
        >
          {dish.note}
        </p>
      )}
    </article>
  )
}

function GuarnicionRow({ dish }: { dish: Dish }) {
  return (
    <div className="animate-on-scroll flex items-baseline justify-between gap-3 py-2">
      <span
        className="font-display text-sm font-400"
        style={{ color: 'var(--body)' }}
      >
        {dish.name}
      </span>
      {dish.price && (
        <span
          className="font-mono tabular-nums shrink-0 text-xs"
          style={{ color: 'var(--gold)' }}
        >
          {dish.price}
        </span>
      )}
    </div>
  )
}

function BuffetBanner({ dish }: { dish: Dish }) {
  return (
    <div className="animate-on-scroll mx-auto max-w-xl rounded-sm border border-[var(--gold-dim)] bg-[var(--bg-elevated)] p-6 text-center">
      <p
        className="font-display text-base font-400 tracking-wide"
        style={{ color: 'var(--cream)' }}
      >
        {dish.name}
      </p>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{ color: 'var(--body-75)' }}
      >
        {dish.description}
      </p>
      <a
        href="https://wa.me/50237590104"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block text-sm transition-opacity hover:opacity-80"
        style={{ color: 'var(--gold)' }}
      >
        Consultar por WhatsApp →
      </a>
    </div>
  )
}

function MenuSection({ section }: { section: MenuSection }) {
  const isGuarniciones = section.title === 'GUARNICIONES'
  const isBuffet = section.title === 'BUFFET'

  return (
    <section className="px-6 py-10 sm:px-10 md:px-16">
      <SectionHeader number={section.number} title={section.title} />
      <div className="mx-auto max-w-xl">
        {/* Simple dishes (no subsections) */}
        {section.dishes && !section.subsections && (
          <>
            {isBuffet
              ? section.dishes.map((dish) => (
                  <BuffetBanner key={dish.name} dish={dish} />
                ))
              : isGuarniciones
                ? section.dishes.map((dish) => (
                    <GuarnicionRow key={dish.name} dish={dish} />
                  ))
                : section.dishes.map((dish) => (
                    <DishRow key={dish.name} dish={dish} />
                  ))}
          </>
        )}

        {/* Dishes before subsections (e.g. Entradas) */}
        {section.dishes && section.subsections && (
          <>
            {section.dishes.map((dish) => (
              <DishRow key={dish.name} dish={dish} />
            ))}
          </>
        )}

        {/* Subsections */}
        {section.subsections?.map((sub) => (
          <div key={sub.subtitle}>
            <SubSectionHeader subtitle={sub.subtitle} />
            {sub.dishes.map((dish) => (
              <DishRow key={dish.name} dish={dish} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Services ─── */

interface Service {
  title: string
  description: string
  time?: string
}

const services: Service[] = [
  {
    title: 'Buffet dominical',
    description: 'Todos los domingos',
    time: '7:00 am a 11:00 am',
  },
  {
    title: 'Desayunos',
    description: 'Todos los días',
    time: '7:00 am a 11:00 am',
  },
  {
    title: 'Almuerzo',
    description: 'Todos los días',
    time: '11:00 am a 3:00 pm',
  },
  {
    title: 'Cena',
    description: 'Todos los días',
    time: '7:00 pm a 10:00 pm',
  },
]

function ServicesSection() {
  return (
    <section className="px-6 py-12 sm:px-10 md:px-16">
      <div className="animate-on-scroll mb-10 text-center">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold-muted)' }}
        >
          Servicios
        </span>
        <h2
          className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
          style={{ color: 'var(--cream)' }}
        >
          HORARIOS Y ATENCIÓN
        </h2>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="animate-on-scroll rounded-sm border border-[var(--gold-dim)] bg-[var(--bg-elevated)] p-5 text-center"
          >
            <h3
              className="font-display text-sm font-400 tracking-wide"
              style={{ color: 'var(--cream)' }}
            >
              {service.title}
            </h3>
            <p
              className="mt-2 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              {service.description}
            </p>
            {service.time && (
              <p
                className="font-mono mt-1 text-[11px] tracking-wide"
                style={{ color: 'var(--gold-muted)' }}
              >
                {service.time}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Special Services ─── */

const specialServices = [
  {
    title: 'Eventos',
    description:
      'Salón propio para cumpleaños, baby showers, aniversarios, comidas de grupo y eventos corporativos. Montaje, menú y espacio se coordinan por WhatsApp.',
  },
  {
    title: 'Mesas románticas',
    description:
      'Cenas de pareja, aniversarios, ocasiones especiales. Decoración personalizada y menú especial por WhatsApp.',
  },
  {
    title: 'Niño abanderado',
    description:
      'Postre y bebida de cortesía para el niño abanderado, escolta o alumno distinguido (presentando constancia del colegio).',
  },
  {
    title: 'Delivery',
    description: 'Pedidos por WhatsApp.',
  },
]

function SpecialServicesSection() {
  return (
    <section className="px-6 py-12 sm:px-10 md:px-16">
      <div className="animate-on-scroll mb-10 text-center">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--gold-muted)' }}
        >
          Especiales
        </span>
        <h2
          className="font-display mt-3 text-lg font-400 tracking-[0.2em] uppercase"
          style={{ color: 'var(--cream)' }}
        >
          SERVICIOS ADICIONALES
        </h2>
      </div>
      <div className="mx-auto max-w-2xl space-y-6">
        {specialServices.map((service) => (
          <div key={service.title} className="animate-on-scroll">
            <h3
              className="font-display text-sm font-400 tracking-wide"
              style={{ color: 'var(--cream)' }}
            >
              {service.title}
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: 'var(--body-75)' }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Main App ─── */

function App() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl">
      <Intro />
      {/* ─── Hero ─── */}
      <header className="flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
        <div className="animate-on-scroll">
          <p
            className="font-mono mb-4 text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--gold-muted)' }}
          >
            Hotel & Restaurante
          </p>
          <h1
            className="font-display text-6xl font-300 tracking-wide sm:text-7xl md:text-8xl"
            style={{ color: 'var(--cream)' }}
          >
            ETROG
          </h1>
          <div
            className="mx-auto mt-4 h-px w-16"
            style={{ background: 'var(--gold)' }}
          />
          <p
            className="font-display mt-4 text-sm tracking-[0.35em] uppercase font-300"
            style={{ color: 'var(--gold)' }}
          >
            Aroma y Sabor
          </p>
          <p
            className="font-body mt-6 text-xs tracking-wide"
            style={{ color: 'var(--body-50)' }}
          >
            Retalhuleu, Guatemala
          </p>
        </div>
      </header>

      <GoldDivider strong />

      {/* ─── Intro ─── */}
      <section className="px-6 py-14 text-center sm:px-10 md:px-16">
        <div className="animate-on-scroll mx-auto max-w-lg">
          <blockquote>
            <p
              className="font-display text-lg leading-relaxed italic font-300 sm:text-xl"
              style={{ color: 'var(--cream)' }}
            >
              Aquí se celebra.
            </p>
          </blockquote>
          <div
            className="mx-auto mt-8 mb-8 h-px w-8"
            style={{ background: 'var(--gold-dim)' }}
          />
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--body-75)' }}
          >
            En Etrog Hotel y Restaurante te hacemos sentir como en casa. Descansa en nuestras cómodas habitaciones y disfruta de la mejor comida guatemalteca en un ambiente familiar y lleno de sabor
          </p>
        </div>
      </section>

      <GoldDivider strong />

      {/* ─── Menu Sections ─── */}
      {menuSections.map((section, i) => (
        <div key={section.number}>
          <MenuSection section={section} />
          {i < menuSections.length - 1 && <GoldDivider />}
        </div>
      ))}

      <GoldDivider strong />

      {/* ─── Services ─── */}
      <ServicesSection />

      <GoldDivider />

      {/* ─── Special Services ─── */}
      <SpecialServicesSection />

      <GoldDivider strong />

      {/* ─── Footer ─── */}
      <footer className="px-6 py-14 text-center sm:px-10">
        <div className="animate-on-scroll">
          <p
            className="font-display text-2xl font-300 tracking-wide"
            style={{ color: 'var(--cream)' }}
          >
            ETROG · AROMA Y SABOR
          </p>
          <p
            className="mt-3 text-sm"
            style={{ color: 'var(--body-75)' }}
          >
            Centro de Retalhuleu, Guatemala
          </p>
          <a
            href="https://wa.me/50237590104"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--gold)' }}
          >
            WhatsApp: +502 3759 0104
          </a>
          <br />
          <a
            href="mailto:etrog007@gmail.com"
            className="mt-1 inline-block text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--body-50)' }}
          >
            etrog007@gmail.com
          </a>

          <div
            className="mx-auto mt-8 mb-6 h-px w-12"
            style={{ background: 'var(--gold-dim)' }}
          />

          <div className="animate-on-scroll mt-6">
            <p
              className="font-mono mb-3 text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'var(--body-50)' }}
            >
              Rango de precios
            </p>
            <p
              className="font-body text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Desayunos: Q40 – Q70
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Platos fuertes: Q70 – Q200
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Parrillada grupal: Q300 – Q550
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Bebidas: Q12 – Q240
            </p>
          </div>

          <p
            className="font-body mt-8 text-[11px] italic"
            style={{ color: 'var(--body-30)' }}
          >
            Cocina guatemalteca con orgullo de lo local
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
