import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Smartphone, Wrench, Cpu } from 'lucide-react';

import db from '../../data/db.json';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ServiceGrid } from './ServiceGrid';
import { ProblemList } from './ProblemList';
import { StickyCta } from './StickyCta';
import { SummaryPanel } from './SummaryPanel';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';
import type { BudgetFormValues, Service } from '../../types';

// ── Step indicator data ──────────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: 'Servicio', icon: Wrench },
  { id: 2, label: 'Problema', icon: Cpu },
  { id: 3, label: 'Modelo', icon: Smartphone },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const done = current > step.id;
        const active = current === step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300',
                  done
                    ? 'bg-blue-500 border-blue-500 text-zinc-950'
                    : active
                      ? 'bg-blue-500/10 border-blue-500 text-blue-500'
                      : 'bg-white/5 border-white/10 text-zinc-600',
                ].join(' ')}
              >
                <Icon size={15} />
              </div>
              <span
                className={[
                  'text-[10px] font-medium',
                  active ? 'text-blue-500' : done ? 'text-zinc-300' : 'text-zinc-600',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div
                className={[
                  'h-px w-12 mx-2 mb-4 transition-colors duration-500',
                  done ? 'bg-blue-500/60' : 'bg-white/10',
                ].join(' ')}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Section header helper ────────────────────────────────────────────────────
function SectionHeader({ step, title }: { step: number; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-zinc-950">
        {step}
      </span>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
        {title}
      </h2>
    </div>
  );
}

// ── Main page component ──────────────────────────────────────────────────────
export function BudgetPage() {
  const { redirect } = useWhatsAppRedirect();

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<BudgetFormValues>({
    defaultValues: { serviceId: '', problemId: '', deviceBrand: '', deviceModel: '' },
  });

  const serviceId   = watch('serviceId');
  const problemId   = watch('problemId');
  const deviceBrand = watch('deviceBrand');
  const deviceModel = watch('deviceModel');

  // Reset problem when service changes
  useEffect(() => {
    setValue('problemId', '');
    setValue('deviceBrand', '');
    setValue('deviceModel', '');
  }, [serviceId, setValue]);

  const selectedService: Service | undefined = (db.services as Service[]).find(
    (s) => s.id === serviceId,
  );

  const selectedProblem = selectedService?.problems.find((p) => p.id === problemId);

  const brandOptions = serviceId === 'computadoras'
    ? [
        { value: 'HP', label: 'HP' },
        { value: 'Lenovo', label: 'Lenovo' },
        { value: 'Dell', label: 'Dell' },
        { value: 'Asus', label: 'Asus' },
        { value: 'Apple', label: 'Apple (Mac)' },
        { value: 'Acer', label: 'Acer' },
        { value: 'Otra', label: 'Otra marca' },
      ]
    : [
        { value: 'Samsung', label: 'Samsung' },
        { value: 'Apple', label: 'Apple (iPhone)' },
        { value: 'Motorola', label: 'Motorola' },
        { value: 'Xiaomi', label: 'Xiaomi' },
        { value: 'Otra', label: 'Otra marca' },
      ];

  const currentStep = !serviceId ? 1 : !problemId ? 2 : 3;
  const isReady = Boolean(serviceId && problemId && deviceBrand && deviceModel.trim());

  function onSubmit(data: BudgetFormValues) {
    const service = (db.services as Service[]).find((s) => s.id === data.serviceId);
    const problem = service?.problems.find((p) => p.id === data.problemId);
    if (!service || !problem) return;
    redirect(data, problem.label, service.title);
  }

  return (
    /* Page-level container with responsive padding */
    <div className="mx-auto w-full max-w-7xl px-4 pb-40 pt-8 lg:px-10 lg:pb-16 lg:pt-10">
      {/*
       * Mobile:   single column
       * Desktop:  2-column grid — 3fr form | 2fr summary sidebar
       */}
      <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 xl:gap-16">


      {/* ══════════════════════════════════════════
          LEFT COLUMN — Form
      ══════════════════════════════════════════ */}
      <div className="min-w-0">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* ── Hero heading ── */}
          <div className="mb-8 lg:mb-10 lg:text-left text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
              Servicio técnico rápido
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl">
              ¿Qué necesitás{' '}
              <span className="text-blue-500">reparar hoy?</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-500 lg:text-base">
              Seleccioná el servicio, describí el problema y recibí tu presupuesto por WhatsApp al instante.
            </p>
          </div>

          {/* ── Step progress ── */}
          <div className="lg:justify-start">
            <StepIndicator current={currentStep} />
          </div>

          {/* ─────────────────────────────────────────
              STEP 1 — Service
          ───────────────────────────────────────── */}
          <section className="mb-6 lg:mb-8">
            <SectionHeader step={1} title="Elegí el servicio" />
            <Controller
              name="serviceId"
              control={control}
              rules={{ required: 'Seleccioná un servicio' }}
              render={({ field }) => (
                <ServiceGrid
                  services={db.services as Service[]}
                  selectedId={field.value}
                  onSelect={(id) => field.onChange(id)}
                />
              )}
            />
            {errors.serviceId && (
              <p className="mt-2 text-xs text-red-400 pl-1">{errors.serviceId.message}</p>
            )}
          </section>

          {/* ─────────────────────────────────────────
              STEP 2 — Problem (progressive disclosure)
          ───────────────────────────────────────── */}
          {selectedService && (
            <section
              className="mb-6 lg:mb-8"
              style={{ animation: 'slideDown 0.3s ease-out' }}
            >
              <SectionHeader step={2} title="¿Cuál es el problema?" />
              <Controller
                name="problemId"
                control={control}
                rules={{ required: 'Seleccioná el problema' }}
                render={({ field }) => (
                  <ProblemList
                    problems={selectedService.problems}
                    selectedId={field.value}
                    onSelect={(id) => field.onChange(id)}
                  />
                )}
              />
              {errors.problemId && (
                <p className="mt-2 text-xs text-red-400 pl-1">{errors.problemId.message}</p>
              )}
            </section>
          )}

          {/* ─────────────────────────────────────────
              STEP 3 — Device model (progressive disclosure)
          ───────────────────────────────────────── */}
          {selectedService && problemId && (
            <section
              className="mb-6 lg:mb-8"
              style={{ animation: 'slideDown 0.3s ease-out' }}
            >
              <SectionHeader step={3} title="Datos del equipo" />
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Select
                    label="Marca"
                    placeholder="Elegí la marca..."
                    error={errors.deviceBrand?.message}
                    options={brandOptions}
                    {...register('deviceBrand', {
                      required: 'Elegí una marca',
                    })}
                  />
                </div>
                <div className="flex-[2]">
                  <Input
                    label="Modelo exacto"
                    placeholder="Ej: Galaxy A54, iPhone 13, IdeaPad 3..."
                    hint="Si no lo sabés, escribí 'No lo sé'."
                    error={errors.deviceModel?.message}
                    autoComplete="off"
                    {...register('deviceModel', {
                      required: 'Ingresá el modelo (o "No lo sé")',
                      validate: (val) => {
                        const v = val.trim().toLowerCase();
                        if (v.length < 2) return 'Ingresá al menos 2 caracteres';
                        if (v === 'no lo se' || v === 'no lo sé' || v === 'ni idea') return true;
                        
                        // Debe tener al menos una letra o un número
                        if (!/[a-z0-9]/.test(v)) return 'Ingresá un modelo válido';
                        
                        // Evitar símbolos raros (permitimos alfanuméricos, espacios, guiones, puntos, más, barra)
                        if (/[^a-z0-9\s\-\.\+\/]/.test(v)) return 'Evitá usar símbolos especiales';
                        
                        // Evitar repeticiones excesivas (ej: "aaaaa" o "11111")
                        if (/(.)\1{3,}/.test(v)) return 'Parece que escribiste algo incorrecto';
                        
                        return true;
                      }
                    })}
                  />
                </div>
              </div>
            </section>
          )}

          {/* ─────────────────────────────────────────
              Summary card — MOBILE ONLY (lg:hidden)
              Desktop uses SummaryPanel in the sidebar
          ───────────────────────────────────────── */}
          {isReady && (
            <div
              className="mb-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 px-5 py-4 lg:hidden"
              style={{ animation: 'slideDown 0.3s ease-out' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-2">
                Tu consulta lista ✓
              </p>
              <div className="space-y-1">
                <p className="text-sm text-zinc-300">
                  <span className="text-zinc-500">Servicio: </span>
                  {selectedService?.title}
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="text-zinc-500">Problema: </span>
                  {selectedProblem?.label}
                </p>
                <p className="text-sm text-zinc-300">
                  <span className="text-zinc-500">Equipo: </span>
                  {deviceBrand} {deviceModel}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Mobile sticky CTA */}
        <StickyCta
          onClick={handleSubmit(onSubmit)}
          ready={isReady}
        />
      </div>

      {/* ══════════════════════════════════════════
          RIGHT COLUMN — Desktop summary sidebar
          (SummaryPanel itself is hidden on mobile)
      ══════════════════════════════════════════ */}
      <SummaryPanel
        selectedService={selectedService}
        problemLabel={selectedProblem?.label}
        problemTime={selectedProblem?.estimatedTime}
        deviceBrand={deviceBrand}
        deviceModel={deviceModel}
        isReady={isReady}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
    </div>
  );
}
