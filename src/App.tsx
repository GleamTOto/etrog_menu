import { useEffect, useRef } from 'react'
import { Intro } from './components/Intro'

/* ─── Data ─── */

interface Dish {
  name: string
  price?: string
  description: string
}

interface Section {
  number: string
  title: string
  dishes: Dish[]
}

const menuSections: Section[] = [
  {
    number: '01',
    title: 'DE LA PARRILLA',
    dishes: [
      {
        name: 'Parrillada para 4 personas',
        price: 'Q550',
        description:
          'Pollo, churrasco y chorizo a la brasa, yuca frita, tortillas y tres salsas',
      },
      {
        name: 'Mar y Tierra',
        description:
          'Camarón y filete de res a la parrilla, arroz, vegetales y chimichurri',
      },
    ],
  },
  {
    number: '02',
    title: 'DEL MAR',
    dishes: [
      {
        name: 'Camarones ETROG',
        description:
          'Camarones jumbo al termidor o a la parrilla, arroz con mantequilla y ensalada',
      },
      {
        name: 'Parrillada Mazatleca',
        description:
          'Camarón, calamar y filete de corvina en brasa, vegetales y limón',
      },
      {
        name: 'Ceviche',
        description:
          'Pescado blanco fresco, limón, cebolla morada, cilantro y tostadas',
      },
    ],
  },
  {
    number: '03',
    title: 'DE LA CASA',
    dishes: [
      {
        name: 'Caldo de Chojín',
        description:
          'Res chojineada al carbón, rábano, hierbabuena, tortillas y chile cobanero',
      },
      {
        name: 'Caldo de Gallina',
        description:
          'Gallina criolla, papas, ejotes, güisquil, arroz y tortillas',
      },
      {
        name: 'Tilapia entera',
        description: 'Frita o al vapor, arroz, ensalada y limón',
      },
    ],
  },
  {
    number: '04',
    title: 'PARA LOS NIÑOS',
    dishes: [
      {
        name: 'Deditos crujientes de pollo',
        price: 'Q40',
        description: 'Tiras de pechuga empanizadas, papas fritas y salsa de tomate',
      },
      {
        name: 'Quesoburguesa Etrog',
        price: 'Q55',
        description:
          'Pan brioche, carne de res, queso amarillo, lechuga, tomate y salsa de la casa',
      },
      {
        name: 'Burrito Etrog de lomito',
        price: 'Q75',
        description:
          'Tortilla de harina, lomito de res, arroz, frijoles y pico de gallo',
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

function DishRow({ dish }: { dish: Dish }) {
  return (
    <article className="animate-on-scroll py-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className="font-display text-base font-400 leading-snug"
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
      <p
        className="mt-1.5 text-sm leading-relaxed"
        style={{ color: 'var(--body-75)' }}
      >
        {dish.description}
      </p>
    </article>
  )
}

function MenuSection({ section }: { section: Section }) {
  return (
    <section className="px-6 py-10 sm:px-10 md:px-16">
      <SectionHeader number={section.number} title={section.title} />
      <div className="mx-auto max-w-xl">
        {section.dishes.map((dish) => (
          <DishRow key={dish.name} dish={dish} />
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
              Menú infantil: Q40 – Q75
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Platos fuertes: Q70 – Q225
            </p>
            <p
              className="font-body mt-1 text-xs"
              style={{ color: 'var(--body-75)' }}
            >
              Parrillada grupal: Q550
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
