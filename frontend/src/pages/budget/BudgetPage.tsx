import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Smartphone, Wrench, Cpu } from 'lucide-react';

import db from '../../data/db.json';
import { Input } from '../../components/ui/Input';
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
                    ? 'bg-cyan-400 border-cyan-400 text-gray-950'
                    : active
                      ? 'bg-cyan-400/10 border-cyan-400 text-cyan-400'
                      : 'bg-white/5 border-white/10 text-gray-600',
                ].join(' ')}
              >
                <Icon size={15} />
              </div>
              <span
                className={[
                  'text-[10px] font-medium',
                  active ? 'text-cyan-400' : done ? 'text-gray-300' : 'text-gray-600',
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
                  done ? 'bg-cyan-400/60' : 'bg-white/10',
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
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-[10px] font-bold text-gray-950">
        {step}
      </span>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
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
    defaultValues: { serviceId: '', problemId: '', deviceModel: '' },
  });

  const serviceId   = watch('serviceId');
  const problemId   = watch('problemId');
  const deviceModel = watch('deviceModel');

  // Reset problem when service changes
  useEffect(() => {
    setValue('problemId', '');
  }, [serviceId, setValue]);

  const selectedService: Service | undefined = (db.services as Service[]).find(
    (s) => s.id === serviceId,
  );

  const selectedProblem = selectedService?.problems.find((p) => p.id === problemId);

  const currentStep = !serviceId ? 1 : !problemId ? 2 : 3;
  const isReady = Boolean(serviceId && problemId && deviceModel.trim());

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
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Servicio técnico rápido
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl">
              ¿Qué necesitás{' '}
              <span className="text-cyan-400">reparar hoy?</span>
            </h1>
            <p className="mt-3 text-sm text-gray-500 lg:text-base">
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
              <SectionHeader step={3} title="Modelo del equipo" />
              <Input
                label="Escribí el modelo"
                placeholder="Ej: Samsung Galaxy A54, iPhone 13, Lenovo IdeaPad…"
                hint="Cuanto más específico, mejor presupuesto te damos."
                error={errors.deviceModel?.message}
                autoComplete="off"
                {...register('deviceModel', {
                  required: 'Ingresá el modelo de tu equipo',
                  minLength: { value: 2, message: 'Ingresá al menos 2 caracteres' },
                })}
              />
            </section>
          )}

          {/* ─────────────────────────────────────────
              Summary card — MOBILE ONLY (lg:hidden)
              Desktop uses SummaryPanel in the sidebar
          ───────────────────────────────────────── */}
          {isReady && (
            <div
              className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-5 py-4 lg:hidden"
              style={{ animation: 'slideDown 0.3s ease-out' }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                Tu consulta lista ✓
              </p>
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Servicio: </span>
                  {selectedService?.title}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Problema: </span>
                  {selectedProblem?.label}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-gray-500">Equipo: </span>
                  {deviceModel}
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
        deviceModel={deviceModel}
        isReady={isReady}
        onSubmit={handleSubmit(onSubmit)}
      />
    </div>
    </div>
  );
}
