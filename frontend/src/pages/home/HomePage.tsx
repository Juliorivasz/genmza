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
    color: 'cyan',
  },
  {
    icon: Laptop,
    title: 'Reparación de PC y Notebook',
    description:
      'Diagnóstico profesional de hardware y software. Formateos, instalación de OS, cambio de disco, reparación de pantallas y más.',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=800&auto=format&fit=crop',
    items: ['Formateo & OS', 'Disco / SSD', 'Pantalla rota', 'Virus & malware'],
    color: 'violet',
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
  { value: '500+', label: 'Reparaciones realizadas' },
  { value: '90 días', label: 'De garantía' },
  { value: '< 1h', label: 'Tiempo de respuesta' },
  { value: '4.9 ⭐', label: 'Calificación promedio' },
];

const WHY_US = [
  {
    icon: Zap,
    title: 'Respuesta inmediata',
    desc: 'Te respondemos por WhatsApp en menos de 1 hora con el presupuesto.',
  },
  {
    icon: Shield,
    title: 'Garantía de 90 días',
    desc: 'Todas nuestras reparaciones tienen garantía escrita. Tu tranquilidad, primero.',
  },
  {
    icon: HeartHandshake,
    title: 'Presupuesto sin cargo',
    desc: 'El diagnóstico y el presupuesto son completamente gratis, sin compromiso.',
  },
  {
    icon: Star,
    title: 'Técnicos certificados',
    desc: 'Nuestro equipo cuenta con certificaciones y años de experiencia en el rubro.',
  },
  {
    icon: Clock,
    title: 'Entrega en el día',
    desc: 'La mayoría de las reparaciones las resolvemos el mismo día que las recibimos.',
  },
  {
    icon: CheckCircle2,
    title: 'Repuestos originales',
    desc: 'Usamos repuestos de alta calidad y originales para garantizar durabilidad.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-cyan-400">
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
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-gray-950/60 lg:to-gray-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold text-cyan-400">
                Servicio técnico profesional · Buenos Aires
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reparamos tu celular
              <br />
              <span className="text-cyan-400">o PC, en el día.</span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-400 lg:text-lg">
              Pantallas rotas, baterías, software y más. Presupuesto gratis
              por WhatsApp en menos de 1 hora. Sin turno previo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/presupuesto"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-7 py-4 text-base font-bold text-gray-950 shadow-xl shadow-cyan-400/30 transition-all duration-200 hover:bg-cyan-300 hover:shadow-cyan-400/50 active:scale-95"
              >
                Obtener presupuesto gratis
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
              {['Garantía 90 días', 'Presupuesto sin cargo', 'Entrega en el día'].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-gray-400">
                  <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
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
                <p className="mt-1 text-xs text-gray-500">{s.label}</p>
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
            Nuestros <span className="text-cyan-400">servicios</span>
          </SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 lg:text-base">
            Trabajamos con todas las marcas y modelos. Diagnóstico profesional y repuestos de calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            const accentMap: Record<string, string> = {
              cyan:    'text-cyan-400 bg-cyan-400/15 ring-cyan-400/30',
              violet:  'text-violet-400 bg-violet-400/15 ring-violet-400/30',
              emerald: 'text-emerald-400 bg-emerald-400/15 ring-emerald-400/30',
            };
            const borderMap: Record<string, string> = {
              cyan:    'group-hover:border-cyan-400/40 group-hover:shadow-cyan-400/10',
              violet:  'group-hover:border-violet-400/40 group-hover:shadow-violet-400/10',
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
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent" />

                  {/* Icon badge */}
                  <div className={`absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl ring-1 ${accentMap[service.color]}`}>
                    <Icon size={22} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{service.description}</p>

                  {/* Feature pills */}
                  <div className="mt-auto flex flex-wrap gap-2 mb-5">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/presupuesto"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
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
                <span className="text-cyan-400">manos</span>
              </SectionTitle>
            </div>
            <Link
              to="/presupuesto"
              className="mt-5 hidden lg:inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-bold text-gray-950 hover:bg-cyan-300 transition-all active:scale-95"
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/12 ring-1 ring-cyan-400/25">
                    <Icon size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 lg:hidden">
            <Link
              to="/presupuesto"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 py-4 text-base font-bold text-gray-950 hover:bg-cyan-300 transition-all active:scale-95"
            >
              Quiero mi presupuesto gratis <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS (social proof)
      ════════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto w-full max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 text-center">
          <SectionLabel>Clientes felices</SectionLabel>
          <SectionTitle>
            Lo que dicen de <span className="text-cyan-400">nosotros</span>
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Martín G.',
              stars: 5,
              comment: 'Me cambiaron la pantalla del iPhone en 2 horas y quedó impecable. El precio fue más que justo y la garantía de 90 días me dio mucha tranquilidad.',
              service: 'Cambio de pantalla · iPhone 13',
            },
            {
              name: 'Valentina R.',
              stars: 5,
              comment: 'Mi notebook no arrancaba y pensé que había perdido todo. La llevé y en el día me la devolvieron funcionando perfectamente. ¡Recomendadísimos!',
              service: 'Reparación de notebook',
            },
            {
              name: 'Lucas P.',
              stars: 5,
              comment: 'Atención rápida, precio honesto y el trabajo quedó perfecto. Instalaron el vidrio templado en 10 minutos. Ya soy cliente fijo.',
              service: 'Vidrio templado · Samsung A54',
            },
          ].map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-gray-300">"{t.comment}"</p>
              <div className="border-t border-white/[0.06] pt-4">
                <p className="text-sm font-bold text-white">{t.name}</p>
                <p className="text-xs text-gray-600">{t.service}</p>
              </div>
            </div>
          ))}
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
              Visitanos en{' '}
              <span className="text-cyan-400">nuestro local</span>
            </SectionTitle>
            <p className="mx-auto mt-4 max-w-md text-sm text-gray-500">
              También podés enviarnos tu equipo. Consultá por envíos a domicilio.
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
                title="Ubicación GeneraciónX"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0168878895233!2d-58.38415842416686!3d-34.603721772953264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac630121623%3A0x53386f2ac88991a9!2sObelisco%2C+Buenos+Aires!5e0!3m2!1ses!2sar!4v1694500000000!5m2!1ses!2sar"
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
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/12 ring-1 ring-cyan-400/25">
                    <MapPin size={16} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Dirección</p>
                    <p className="text-sm font-semibold text-white">
                      {/* 📍 Reemplazá con tu dirección real */}
                      Av. Corrientes 1234, Piso 2
                    </p>
                    <p className="text-xs text-gray-500">Buenos Aires, Argentina</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.05] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/12 ring-1 ring-cyan-400/25">
                    <Clock size={16} className="text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">Horario de atención</p>
                    <div className="space-y-1">
                      {[
                        { day: 'Lunes a Viernes', hours: '9:00 – 20:00' },
                        { day: 'Sábados',         hours: '9:00 – 18:00' },
                        { day: 'Domingos',        hours: 'Cerrado' },
                      ].map((h) => (
                        <div key={h.day} className="flex justify-between text-xs">
                          <span className="text-gray-500">{h.day}</span>
                          <span className={h.hours === 'Cerrado' ? 'text-red-400' : 'text-white font-medium'}>
                            {h.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA banner */}
              <Link
                to="/presupuesto"
                className="flex items-center justify-between rounded-2xl bg-cyan-400 px-5 py-4 hover:bg-cyan-300 transition-all active:scale-95"
              >
                <div>
                  <p className="text-sm font-bold text-gray-950">¿Preferís no venir?</p>
                  <p className="text-xs text-gray-700">Pedí tu presupuesto por WhatsApp</p>
                </div>
                <ArrowRight size={20} className="text-gray-950 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          BOTTOM CTA BAND
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-violet-600/10" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-20 text-center lg:px-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
            Empezá ahora
          </p>
          <h2 className="mb-5 text-3xl font-extrabold text-white lg:text-5xl">
            ¿Tu equipo tiene algún problema?
            <br />
            <span className="text-cyan-400">Resolvámoslo hoy.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-gray-400 lg:text-base">
            Completá el formulario de presupuesto y te respondemos por WhatsApp en menos de 1 hora. Sin costo, sin compromiso.
          </p>
          <Link
            to="/presupuesto"
            className="inline-flex items-center gap-2 rounded-2xl bg-cyan-400 px-8 py-4 text-base font-bold text-gray-950 shadow-xl shadow-cyan-400/30 transition-all hover:bg-cyan-300 hover:shadow-cyan-400/50 active:scale-95"
          >
            Obtener presupuesto gratis
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  );
}
