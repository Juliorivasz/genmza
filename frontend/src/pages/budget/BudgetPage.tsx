import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import {
  ChevronLeft,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  Wrench,
  Cpu,
  Smartphone,
} from 'lucide-react';

import db from '../../data/db.json';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { ServiceGrid } from './ServiceGrid';
import { ProblemList } from './ProblemList';
import { SummaryPanel } from './SummaryPanel';
import { useWhatsAppRedirect } from '../../hooks/useWhatsAppRedirect';
import type { BudgetFormValues, Service } from '../../types';

// ── Types ────────────────────────────────────────────────────────────────────
type MobileStep = 1 | 2 | 3;

// ── Brand options ─────────────────────────────────────────────────────────────
const BRANDS_COMPUTADORAS = [
  { value: 'HP', label: 'HP' },
  { value: 'Lenovo', label: 'Lenovo' },
  { value: 'Dell', label: 'Dell' },
  { value: 'Asus', label: 'Asus' },
  { value: 'Apple', label: 'Apple (Mac)' },
  { value: 'Acer', label: 'Acer' },
  { value: 'Otra', label: 'Otra marca' },
];
const BRANDS_DEFAULT = [
  { value: 'Samsung', label: 'Samsung' },
  { value: 'Apple', label: 'Apple (iPhone)' },
  { value: 'Motorola', label: 'Motorola' },
  { value: 'Xiaomi', label: 'Xiaomi' },
  { value: 'Otra', label: 'Otra marca' },
];

// ── Step metadata ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1 as MobileStep, label: 'Servicio',  icon: Wrench },
  { id: 2 as MobileStep, label: 'Problema',  icon: Cpu },
  { id: 3 as MobileStep, label: 'Equipo',    icon: Smartphone },
];

// ── Validation helper ─────────────────────────────────────────────────────────
function validateModel(val: string): true | string {
  const v = val.trim().toLowerCase();
  if (v.length < 2) return 'Ingresá al menos 2 caracteres';
  if (v === 'no lo se' || v === 'no lo sé' || v === 'ni idea') return true;
  if (!/[a-z0-9]/.test(v)) return 'Ingresá un modelo válido';
  if (/[^a-z0-9\s\-.+/]/.test(v)) return 'Evitá usar símbolos especiales';
  if (/(.)\1{3,}/.test(v)) return 'Parece que escribiste algo incorrecto';
  return true;
}

// ── Mobile progress bar ───────────────────────────────────────────────────────
function MobileProgress({ step }: { step: MobileStep }) {
  const labels: Record<MobileStep, string> = {
    1: 'Elegí el servicio',
    2: '¿Cuál es el problema?',
    3: 'Datos del equipo',
  };
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">
          Paso {step} de 3
        </span>
        <span className="text-[11px] text-zinc-500">{labels[step]}</span>
      </div>
      <div className="flex gap-1.5">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={[
              'h-1 flex-1 rounded-full transition-all duration-500',
              s.id <= step ? 'bg-amber-500' : 'bg-black/10',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  );
}

// ── Desktop step header ───────────────────────────────────────────────────────
function DesktopStepHeader({
  step,
  label,
  done,
}: {
  step: number;
  label: string;
  done?: boolean;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div
        className={[
          'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shrink-0 transition-colors duration-300',
          done
            ? 'bg-amber-500 text-zinc-950'
            : 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/40',
        ].join(' ')}
      >
        {done ? <CheckCircle2 size={14} /> : step}
      </div>
      <h2 className="text-base font-semibold text-zinc-200">{label}</h2>
    </div>
  );
}

// ── WhatsApp submit button ────────────────────────────────────────────────────
function WhatsAppButton({
  onClick,
  ready,
  type = 'button',
}: {
  onClick?: () => void;
  ready: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={!ready}
      className={[
        'w-full flex items-center justify-between',
        'rounded-2xl px-6 py-4 text-base font-bold',
        'transition-all duration-300 active:scale-[0.98]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
        ready
          ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-400 focus-visible:ring-emerald-400'
          : 'bg-black/8 border border-white/10 text-zinc-500',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <MessageCircle size={22} className={ready ? 'text-white' : 'text-zinc-600'} />
        <div className="text-left">
          <div className="font-bold leading-none">Consultar por WhatsApp</div>
          <div
            className={[
              'mt-1 text-xs font-normal leading-none',
              ready ? 'text-emerald-100' : 'text-zinc-600',
            ].join(' ')}
          >
            {ready ? '¡Todo listo! Enviá tu consulta' : 'Completá marca y modelo para continuar'}
          </div>
        </div>
      </div>
      <ChevronRight size={20} className={ready ? 'text-white' : 'text-zinc-600'} />
    </button>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export function BudgetPage() {
  const [searchParams] = useSearchParams();
  const { redirect } = useWhatsAppRedirect();
  const [mobileStep, setMobileStep] = useState<MobileStep>(1);

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

  // Pre-select service from ?service= URL param on first mount
  useEffect(() => {
    const svc = searchParams.get('service');
    if (svc && ['celulares', 'computadoras', 'protectores'].includes(svc)) {
      setValue('serviceId', svc as BudgetFormValues['serviceId']);
      setMobileStep(2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset downstream fields when service changes
  useEffect(() => {
    setValue('problemId', '');
    setValue('deviceBrand', '');
    setValue('deviceModel', '');
  }, [serviceId, setValue]);

  // Auto-advance mobile: step 1 → 2 when a service is selected by the user
  useEffect(() => {
    if (serviceId && mobileStep === 1) {
      const t = setTimeout(() => setMobileStep(2), 180);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  // Auto-advance mobile: step 2 → 3 when a problem is selected
  useEffect(() => {
    if (problemId && mobileStep === 2) {
      const t = setTimeout(() => setMobileStep(3), 180);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId]);

  const selectedService = (db.services as Service[]).find((s) => s.id === serviceId);
  const selectedProblem  = selectedService?.problems.find((p) => p.id === problemId);
  const brandOptions     = serviceId === 'computadoras' ? BRANDS_COMPUTADORAS : BRANDS_DEFAULT;
  const isReady          = Boolean(serviceId && problemId && deviceBrand && deviceModel.trim());

  const goBack = () => setMobileStep((s) => (Math.max(1, s - 1) as MobileStep));

  function onSubmit(data: BudgetFormValues) {
    const service = (db.services as Service[]).find((s) => s.id === data.serviceId);
    const problem = service?.problems.find((p) => p.id === data.problemId);
    if (!service || !problem) return;
    redirect(data, problem.label, service.title);
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-8 lg:px-10 lg:pb-16 lg:pt-10">

      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on lg+)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden pb-8">
        <MobileProgress step={mobileStep} />

        {/* Back button */}
        {mobileStep > 1 && (
          <button
            type="button"
            onClick={goBack}
            className="mb-5 flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            Atrás
          </button>
        )}

        {/* ── Step 1: Elegí el servicio ── */}
        {mobileStep === 1 && (
          <div style={{ animation: 'slideDown 0.25s ease-out' }}>
            <h1 className="mb-2 text-2xl font-extrabold leading-tight text-white">
              ¿Qué necesitás{' '}
              <span className="text-amber-500">reparar?</span>
            </h1>
            <p className="mb-6 text-sm text-zinc-500">
              Tocá el servicio y avanzamos al siguiente paso.
            </p>
            <Controller
              name="serviceId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ServiceGrid
                  services={db.services as Service[]}
                  selectedId={field.value}
                  onSelect={(id) => field.onChange(id)}
                />
              )}
            />
          </div>
        )}

        {/* ── Step 2: Elegí el problema ── */}
        {mobileStep === 2 && selectedService && (
          <div style={{ animation: 'slideDown 0.25s ease-out' }}>
            {/* Mini service badge */}
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-blue-500/25 bg-amber-500/8 px-4 py-3">
              {selectedService.image && (
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="h-10 w-10 rounded-xl object-cover shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  Seleccionaste
                </p>
                <p className="text-sm font-bold text-white truncate">{selectedService.title}</p>
              </div>
              <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
            </div>

            <h2 className="mb-2 text-xl font-bold text-white">¿Cuál es el problema?</h2>
            <p className="mb-5 text-sm text-zinc-500">Tocá el problema y avanzamos.</p>

            <Controller
              name="problemId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <ProblemList
                  problems={selectedService.problems}
                  selectedId={field.value}
                  onSelect={(id) => field.onChange(id)}
                />
              )}
            />
          </div>
        )}

        {/* ── Step 3: Datos del equipo ── */}
        {mobileStep === 3 && (
          <div style={{ animation: 'slideDown 0.25s ease-out' }}>
            {/* Mini summary */}
            <div className="mb-6 rounded-2xl border border-white/10 bg-black/[0.04] px-4 py-4 space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-1">
                Tu consulta hasta ahora
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Servicio</span>
                <span className="text-xs font-semibold text-white">{selectedService?.title}</span>
              </div>
              <div className="border-t border-white/[0.06]" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Problema</span>
                <span className="text-xs font-semibold text-white max-w-[60%] text-right leading-snug">
                  {selectedProblem?.label}
                </span>
              </div>
              {selectedProblem?.estimatedTime && (
                <>
                  <div className="border-t border-white/[0.06]" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">Tiempo estimado</span>
                    <span className="text-xs font-semibold text-amber-400">
                      {selectedProblem.estimatedTime}
                    </span>
                  </div>
                </>
              )}
            </div>

            <h2 className="mb-5 text-xl font-bold text-white">¿De qué equipo se trata?</h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <Select
                label="Marca"
                placeholder="Elegí la marca..."
                error={errors.deviceBrand?.message}
                options={brandOptions}
                {...register('deviceBrand', { required: 'Elegí una marca' })}
              />
              <Input
                label="Modelo exacto"
                placeholder="Ej: Galaxy A54, iPhone 13, IdeaPad 3..."
                hint="Si no lo sabés exacto, escribí 'No lo sé'."
                error={errors.deviceModel?.message}
                autoComplete="off"
                {...register('deviceModel', {
                  required: 'Ingresá el modelo (o "No lo sé")',
                  validate: validateModel,
                })}
              />

              {/* WhatsApp button */}
              <div className="mt-2">
                <WhatsAppButton type="submit" ready={isReady} />
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden on mobile)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 xl:gap-16">

        {/* ── Left column: Form ── */}
        <div className="min-w-0">
          {/* Page heading */}
          <div className="mb-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500">
              Servicio técnico — Mendoza
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
              ¿Qué necesitás{' '}
              <span className="text-amber-500">reparar hoy?</span>
            </h1>
            <p className="mt-3 text-sm text-zinc-500">
              Elegí el servicio, describí el problema y recibí tu presupuesto por WhatsApp — sin costo ni compromiso.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Step 1 */}
            <section className="mb-10">
              <DesktopStepHeader step={1} label="Elegí el servicio" done={!!serviceId} />
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

            {/* Step 2 — progressive disclosure */}
            {selectedService && (
              <section
                className="mb-10"
                style={{ animation: 'slideDown 0.3s ease-out' }}
              >
                <DesktopStepHeader step={2} label="¿Cuál es el problema?" done={!!problemId} />
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

            {/* Step 3 — progressive disclosure */}
            {selectedService && problemId && (
              <section
                className="mb-10"
                style={{ animation: 'slideDown 0.3s ease-out' }}
              >
                <DesktopStepHeader step={3} label="Datos del equipo" done={isReady} />
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <Select
                      label="Marca"
                      placeholder="Elegí la marca..."
                      error={errors.deviceBrand?.message}
                      options={brandOptions}
                      {...register('deviceBrand', { required: 'Elegí una marca' })}
                    />
                  </div>
                  <div className="flex-[2]">
                    <Input
                      label="Modelo exacto"
                      placeholder="Ej: Galaxy A54, iPhone 13, IdeaPad 3..."
                      hint="Si no lo sabés exacto, escribí 'No lo sé'."
                      error={errors.deviceModel?.message}
                      autoComplete="off"
                      {...register('deviceModel', {
                        required: 'Ingresá el modelo (o "No lo sé")',
                        validate: validateModel,
                      })}
                    />
                  </div>
                </div>
              </section>
            )}

          </form>
        </div>

        {/* ── Right column: Summary ── */}
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
