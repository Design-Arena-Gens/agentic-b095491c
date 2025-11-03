'use client';

import { useMemo, useState } from 'react';
import { SAMPLE_RUC_RECORDS } from '@/data/sample-ruc-records';

type LookupResult =
  | {
      success: true;
      data: {
        razonSocial: string | null;
        estado: string | null;
        condicion: string | null;
        direccion: string | null;
        ubigeo: string | null;
        distrito: string | null;
        provincia: string | null;
        departamento: string | null;
        fuente: string;
        timestamp: string;
      };
    }
  | {
      success: false;
      error: string;
    };

type ReasonMatch = {
  razonSocial: string;
  ruc: string;
  estado: string;
  condicion: string;
  direccion: string;
};

const digitOnly = /^\d+$/;

export function RucLookup() {
  const [rucValue, setRucValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [reasonValue, setReasonValue] = useState('');

  const reasonMatches: ReasonMatch[] = useMemo(() => {
    const search = reasonValue.trim().toLowerCase();
    if (!search) return [];
    return SAMPLE_RUC_RECORDS.filter((record) =>
      record.razonSocial.toLowerCase().includes(search),
    ).slice(0, 10);
  }, [reasonValue]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = rucValue.trim();

    if (!digitOnly.test(normalized) || normalized.length !== 11) {
      setResult({
        success: false,
        error: 'Ingresa un RUC válido de 11 dígitos.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/ruc?ruc=${normalized}`, {
        headers: { accept: 'application/json' },
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
          errorBody?.error ??
            'No se pudo completar la consulta. Intenta nuevamente más tarde.',
        );
      }

      const data = await response.json();
      setResult({ success: true, data });
    } catch (error) {
      setResult({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_60px_rgba(37,99,235,0.12)] backdrop-blur">
        <header className="mb-6 space-y-2">
          <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Consulta oficial automatizada
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            RUC → Razón Social (SUNAT)
          </h2>
          <p className="text-sm text-slate-600">
            Ingresa un número de RUC válido y consulta en tiempo real la razón
            social, estado y situación en la SUNAT utilizando un servicio
            público.
          </p>
        </header>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          aria-label="Consulta razón social por RUC"
        >
          <label className="block text-sm font-medium text-slate-700">
            Número de RUC
            <input
              type="text"
              inputMode="numeric"
              maxLength={11}
              value={rucValue}
              onChange={(event) => {
                const value = event.target.value.replace(/[^\d]/g, '');
                setRucValue(value);
              }}
              placeholder="20100039207"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-base font-semibold text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:bg-primary/60"
            disabled={isLoading}
          >
            {isLoading ? 'Consultando…' : 'Consultar en SUNAT'}
          </button>
        </form>

        {result && (
          <div
            className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
            role="status"
          >
            {result.success ? (
              <div className="space-y-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Razón Social
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.data.razonSocial ?? 'Sin datos'}
                  </p>
                </div>
                <dl className="grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-4">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Estado
                    </dt>
                    <dd className="font-medium">
                      {result.data.estado ?? 'Sin datos'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Condición
                    </dt>
                    <dd className="font-medium">
                      {result.data.condicion ?? 'Sin datos'}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Dirección fiscal
                    </dt>
                    <dd className="font-medium">
                      {result.data.direccion ?? 'Sin datos'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Distrito
                    </dt>
                    <dd className="font-medium">
                      {result.data.distrito ?? 'Sin datos'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Provincia
                    </dt>
                    <dd className="font-medium">
                      {result.data.provincia ?? 'Sin datos'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-slate-400">
                      Departamento
                    </dt>
                    <dd className="font-medium">
                      {result.data.departamento ?? 'Sin datos'}
                    </dd>
                  </div>
                </dl>
                <p className="text-[11px] text-slate-500">
                  Fuente: {result.data.fuente}. Última actualización:{' '}
                  {new Date(result.data.timestamp).toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="font-medium text-red-600">{result.error}</p>
            )}
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.45)] backdrop-blur">
        <header className="mb-6 space-y-2 text-white">
          <div className="inline-flex rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Razón social → RUC (demo)
          </div>
          <h2 className="text-2xl font-semibold">Búsqueda rápida local</h2>
          <p className="text-sm text-slate-300">
            Prueba la experiencia de autocompletar un RUC a partir de la razón
            social utilizando un subconjunto representativo de datos públicos.
            Para producción, reemplázalo con tu integración preferida.
          </p>
        </header>

        <label className="block text-sm font-medium text-slate-200">
          Razón social o nombre comercial
          <input
            type="text"
            value={reasonValue}
            onChange={(event) => setReasonValue(event.target.value)}
            placeholder="Ej. Ransa Comercial"
            className="mt-1 w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-base font-medium text-white backdrop-blur outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </label>

        <ul className="mt-6 space-y-3 text-sm text-white">
          {reasonValue && reasonMatches.length === 0 && (
            <li className="rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3 text-slate-300">
              No hay coincidencias en el dataset de demostración. Para cobertura
              total descarga el padrón reducido de la SUNAT o conecta una API
              comercial.
            </li>
          )}

          {reasonMatches.map((match) => (
            <li
              key={match.ruc}
              className="rounded-2xl border border-white/10 bg-slate-800/80 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-primary/50">
                Razón Social
              </p>
              <p className="font-semibold text-white">{match.razonSocial}</p>
              <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div>
                  <p className="uppercase tracking-wide text-white/50">RUC</p>
                  <p className="text-base font-semibold text-primary">
                    {match.ruc}
                  </p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-white/50">
                    Estado / condición
                  </p>
                  <p className="font-semibold">
                    {match.estado} / {match.condicion}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Dirección fiscal: {match.direccion}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-white/15 bg-slate-800/80 p-4 text-xs text-slate-300">
          <p className="font-semibold text-white">
            Cómo llevarlo a producción:
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-4">
            <li>
              Descarga el{' '}
              <a
                href="https://www.sunat.gob.pe/descargaPRR/mrc137_padron_reducido_ruc.zip"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline"
              >
                padrón reducido de la SUNAT
              </a>{' '}
              y procésalo en un servicio propio.
            </li>
            <li>
              O consume una API especializada (p. ej. Apis.net.pe, Perú APIs,
              Nubefact) y configura tu clave en un route handler seguro.
            </li>
            <li>
              Añade caché y validaciones para cumplir los términos de uso y
              proteger datos personales.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
