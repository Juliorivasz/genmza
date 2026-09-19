import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Shield,
  Zap,
  HeartHandshake,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Smartphone,
    title: 'Reparación de Celulares',
    description:
      'Pantallas rotas, baterías agotadas, puertos de carga, cámaras y más. Trabajamos con todas las marcas: Samsung, iPhone, Motorola, Xiaomi y más.',
    image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?q=80&w=800&auto=format&fit=crop',
    items: ['Cambio de pantalla', 'Batería', 'Puerto de carga', 'Daño por agua'],
    color: 'blue',
  },
  {
    icon: Laptop,
    title: 'Reparación de PC y Notebook',
    description:
      'Diagnóstico profesional de hardware y software. Formateos, instalación de OS, cambio de disco, reparación de pantallas y más.',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=800&auto=format&fit=crop',
    items: ['Formateo & OS', 'Disco / SSD', 'Pantalla rota', 'Virus & malware'],
    color: 'indigo',
  },
  {
    icon: Shield,
    title: 'Protectores de Pantalla',
    description:
      'Colocación profesional de vidrio templado e hidrogel. Sin burbujas, sin polvo. Aplicación en el momento, listos en 15 minutos.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    items: ['Vidrio templado', 'Hidrogel', 'Privacidad', 'Anti-reflejo'],
    color: 'emerald',
  },
];

const STATS = [
  { value: '48-72hs', label: 'Tiempo de reparación normal' },
  { value: '2-3hs', label: 'Opción de servicio Express' },
  { value: 'Garantía', label: 'En repuestos instalados' },
  { value: 'Gratis', label: 'Diagnóstico y presupuesto' },
];

const WHY_US = [
  {
    icon: Zap,
    title: 'Presupuesto sin cargo',
    desc: 'El diagnóstico y el presupuesto son completamente gratis, sin compromiso ni obligación.',
  },
  {
    icon: Clock,
    title: 'Tiempos claros',
    desc: 'Reparaciones estándar en 48-72hs. ¿Estás apurado? Consultá por el servicio Express (2-3hs).',
  },
  {
    icon: Shield,
    title: 'Garantía en reparaciones',
    desc: 'Cubrimos el repuesto instalado frente a fallas de fábrica (no aplica por humedad o golpes posteriores).',
  },
  {
    icon: HeartHandshake,
    title: 'Atención personalizada',
    desc: 'Trabajamos de forma independiente. Hablás directo con la persona que repara tu equipo.',
  },
  {
    icon: Star,
    title: 'Transparencia total',
    desc: 'Te explicamos el problema real de tu equipo sin vueltas, para que tomes la mejor decisión.',
  },
  {
    icon: CheckCircle2,
    title: 'Repuestos confiables',
    desc: 'Buscamos la mejor relación calidad-precio y te informamos el tipo de repuesto en cada caso.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-4xl">
      {children}
    </h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[90svh] items-center overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=1920&auto=format&fit=crop"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/60 lg:to-zinc-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
              <span className="text-xs font-semibold text-blue-500">
                Servicio técnico · Mendoza
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              ¿Problemas con tu celular
              <br />
              <span className="text-blue-500">o tu PC? Lo solucionamos.</span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-zinc-400 lg:text-lg">
              Reparaciones de celulares y computadoras en Mendoza. Contanos qué pasó y te respondemos con un presupuesto sin cargo, sin vueltas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/presupuesto"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-7 py-4 text-base font-bold text-zinc-950 shadow-xl shadow-blue-500/30 transition-all duration-200 hover:bg-blue-400 hover:shadow-blue-500/50 active:scale-95"
              >
                Pedir presupuesto gratis
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-7 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/12 active:scale-95"
              >
                Ver servicios
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Trust row */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
              {['Opción Express 2-3hs', 'Garantía en repuestos', 'Presupuesto sin cargo'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-white lg:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════════════════════════════════ */}
      <section id="servicios" className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <SectionLabel>Lo que hacemos</SectionLabel>
          <SectionTitle>
            Nuestros <span className="text-blue-500">servicios</span>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500 lg:text-base">
            Trabajamos con todas las marcas y modelos. Diagnóstico profesional y repuestos de calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const accentMap: Record<string, string> = {
              blue:    'text-blue-500 bg-blue-500/15 ring-blue-500/30',
              indigo:  'text-indigo-400 bg-indigo-400/15 ring-indigo-400/30',
              emerald: 'text-emerald-400 bg-emerald-400/15 ring-emerald-400/30',
            };
            const borderMap: Record<string, string> = {
              blue:    'group-hover:border-blue-500/40 group-hover:shadow-blue-500/10',
              indigo:  'group-hover:border-indigo-400/40 group-hover:shadow-indigo-400/10',
              emerald: 'group-hover:border-emerald-400/40 group-hover:shadow-emerald-400/10',
            };

            return (
              <div
                key={service.title}
                className={[
                  'group relative flex flex-col overflow-hidden rounded-3xl',
                  'border border-white/[0.10] bg-white/[0.06] backdrop-blur-md',
                  'transition-all duration-300 hover:shadow-xl',
                  borderMap[service.color],
                ].join(' ')}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />

                  {/* Icon badge */}
                  <div className={`absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${accentMap[service.color]}`}>
                    <Icon size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-zinc-500">{service.description}</p>

                  {/* Feature pills */}
                  <div className="mt-auto flex flex-wrap gap-2 mb-5">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/presupuesto"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Presupuestar ahora <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WHY US
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="nosotros"
        className="border-y border-white/[0.06] bg-white/[0.02]"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
          <div className="mb-12 lg:flex lg:items-end lg:justify-between">
            <div>
              <SectionLabel>¿Por qué elegirnos?</SectionLabel>
              <SectionTitle>
                Tu equipo en buenas{' '}
                <span className="text-blue-500">manos</span>
              </SectionTitle>
            </div>
            <Link
              to="/presupuesto"
              className="mt-5 hidden lg:inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-6 py-3 text-sm font-bold text-zinc-950 hover:bg-blue-400 transition-all active:scale-95"
            >
              Quiero mi presupuesto <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm p-5 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.08]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/12 ring-1 ring-blue-500/25">
                    <Icon size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs leading-relaxed text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 lg:hidden">
            <Link
              to="/presupuesto"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-500 py-4 text-base font-bold text-zinc-950 hover:bg-blue-400 transition-all active:scale-95"
            >
              Quiero mi presupuesto gratis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
          (sección para reemplazar con comentarios reales de clientes)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <SectionLabel>Clientes</SectionLabel>
          <SectionTitle>
            ¿Ya trabajamos juntos? <span className="text-blue-500">Contalo.</span>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500">
            Dejanos tu opinión por WhatsApp o Google y ayudás a otros a conocernos.
          </p>
        </div>

        {/* Placeholder card — reemplazar con comentarios reales cuando los haya */}
        <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-white/[0.08] bg-white/[0.04] px-8 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/12 ring-1 ring-blue-500/25">
            <Star size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-base font-bold text-white">Las opiniones están en camino</p>
            <p className="mt-2 max-w-xs text-sm text-zinc-500">
              Cuando tu equipo quede listo, te pedimos que compartas tu experiencia. ¡Cada opinión real nos ayuda a crecer!
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Dejá tu opinión <ArrowRight size={14} />
          </a>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════════
          LOCATION + MAP
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="ubicacion"
        className="border-t border-white/[0.06] bg-white/[0.02]"
      >
        <div className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
          <div className="mb-12 text-center">
            <SectionLabel>Dónde estamos</SectionLabel>
            <SectionTitle>
              Operamos desde{' '}
              <span className="text-blue-500">Mendoza</span>
            </SectionTitle>
            <p className="mx-auto mt-4 max-w-md text-sm text-zinc-500">
              Trabajamos sin local físico — coordinamos todo por WhatsApp. Podemos acordar un punto de encuentro o retiro del equipo según el caso.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            {/* Google Maps embed */}
            <div className="overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.04]">
              {/*
                ⚠️  REEMPLAZÁ el src del iframe con tu dirección real.
                Para generar el embed: https://maps.google.com → compartir → insertar mapa
              */}
              <iframe
                title="Ubicación Mendoza"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3350.690832047806!2d-68.84714652345524!3d-32.88768097063462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e093ec4517927%3A0xfe8eacaa0ed3268f!2sMendoza%2C%20Capital%2C%20Mendoza!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="420"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) invert(85%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info panel */}
            <div className="flex flex-col gap-4">
              {/* Address */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/12 ring-1 ring-blue-500/25">
                    <MapPin size={16} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">Zona de cobertura</p>
                    <p className="text-sm font-semibold text-white">
                      Gran Mendoza
                    </p>
                    <p className="text-xs text-zinc-500">Mendoza, Argentina</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/12 ring-1 ring-blue-500/25">
                    <Clock size={16} className="text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">Horario de atención</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Lunes a Viernes</span>
                        <span className="text-white font-medium">9:00 – 15:00</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Sábados y Domingos</span>
                        <span className="text-red-400">Cerrado</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA banner */}
              <Link
                to="/presupuesto"
                className="flex items-center justify-between rounded-2xl bg-blue-500 px-5 py-4 hover:bg-blue-400 transition-all active:scale-95"
              >
                <div>
                  <p className="text-sm font-bold text-zinc-950">¿Tenés dudas?</p>
                  <p className="text-xs text-zinc-800">Escribinos y te asesoramos</p>
                </div>
                <ArrowRight size={20} className="text-zinc-950 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA BAND
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 to-indigo-600/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 text-center lg:px-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-500">
            Empezá ahora
          </p>
          <h2 className="mb-5 text-3xl font-extrabold text-white lg:text-5xl">
            ¿Tu equipo tiene algún problema?
            <br />
            <span className="text-blue-500">Resolvámoslo hoy.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-zinc-400 lg:text-base">
            Completá el formulario de presupuesto y te respondemos por WhatsApp en menos de 1 hora. Sin costo, sin compromiso.
          </p>
          <Link
            to="/presupuesto"
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 px-8 py-4 text-base font-bold text-zinc-950 shadow-xl shadow-blue-500/30 transition-all hover:bg-blue-400 hover:shadow-blue-500/50 active:scale-95"
          >
            Obtener presupuesto gratis
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
