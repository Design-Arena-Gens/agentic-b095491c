import Link from 'next/link';
import { RucLookup } from '@/components/RucLookup';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.09),_transparent_65%)]" />
      <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-20 md:px-10 lg:px-12 lg:pb-32">
        <header className="flex flex-col gap-10 rounded-4xl border border-white/40 bg-white/70 p-10 shadow-[0_25px_120px_rgba(37,99,235,0.08)] backdrop-blur-lg lg:flex-row lg:items-center lg:gap-16 lg:p-16">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Consulta RUC Perú · SUNAT
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Obtén la razón social a partir del RUC y automatiza tus
              formularios sin perder validez legal.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600">
              Integra la consulta oficial de la SUNAT en tus procesos digitales
              con esta guía práctica. Utiliza el buscador en vivo, conecta APIs
              confiables y brinda una experiencia de autocompletado a tus
              usuarios cumpliendo la normativa peruana.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-600">
                <span className="size-2 rounded-full bg-green-500" />
                Servicio oficial SUNAT referenciado
              </span>
              <span className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-medium text-slate-600">
                <span className="size-2 rounded-full bg-blue-500" />
                API pública de demostración
              </span>
            </div>
          </div>
          <aside className="w-full max-w-sm space-y-4 rounded-3xl border border-primary/20 bg-primary/10 p-6 text-sm text-primary/80">
            <h2 className="text-xl font-semibold text-primary">
              ¿Qué incluye esta solución?
            </h2>
            <ul className="space-y-3 text-primary/90">
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>
                  Acceso directo al enlace oficial de consulta de la SUNAT,
                  protegido con recomendaciones de uso responsable.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>
                  Endpoint serverless que consume un servicio público para
                  completar razón social y estado a partir del RUC.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 size-2 rounded-full bg-primary" />
                <span>
                  Ejemplo de autocompletado de RUC desde la razón social y guía
                  para escalar con datos oficiales.
                </span>
              </li>
            </ul>
          </aside>
        </header>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            1. Vincula tu formulario con la consulta oficial de la SUNAT
          </h2>
          <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
              <h3 className="text-xl font-semibold text-slate-900">
                Enlace directo y consideraciones legales
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                La SUNAT mantiene un buscador público donde cualquier ciudadano
                puede validar la información de un RUC. Si necesitas integrarlo
                en tus procesos, respeta las condiciones de uso y evita
                automatizaciones agresivas que puedan bloquear tu IP.
              </p>
              <Link
                href="https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias"
                target="_blank"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                Abrir consulta oficial SUNAT
              </Link>
              <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Recomendaciones:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Implementa CAPTCHA o rate limiting si automatizas.</li>
                  <li>
                    Cachea resultados por RUC para minimizar llamadas repetidas.
                  </li>
                  <li>
                    Informa a tus usuarios sobre el uso de datos según la Ley de
                    Protección de Datos Personales.
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)]">
              <h3 className="text-xl font-semibold text-slate-900">
                Alternativas API para integración
              </h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
                <li>
                  <span className="font-semibold text-slate-800">
                    Apis.net.pe
                  </span>{' '}
                  ofrece un endpoint JSON para RUC → razón social (utilizado en
                  este demo). Proporciona planes gratuitos con límites
                  razonables y opciones premium.
                </li>
                <li>
                  <span className="font-semibold text-slate-800">
                    Perú APIs / Nubefact / ServisCloud
                  </span>{' '}
                  cuentan con consultas por razón social y RUC con SLA y
                  facturación electrónica integrada.
                </li>
                <li>
                  La{' '}
                  <span className="font-semibold text-slate-800">
                    SUNAT publica el padrón reducido de contribuyentes
                  </span>{' '}
                  (actualización diaria) que puedes cargar en una base de datos
                  propia para búsquedas internas.
                </li>
              </ul>
              <div className="mt-6 grid gap-4 text-xs text-slate-500 md:grid-cols-2">
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-primary">
                  <p className="font-semibold">Tip de implementación rápida</p>
                  <p className="mt-1">
                    Usa un route handler en Next.js (ver ejemplo abajo) para
                    encapsular tu clave y aplicar lógica de caché.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-700">
                    Seguridad y cumplimiento
                  </p>
                  <p className="mt-1">
                    Asegura el transporte con HTTPS, registra la actividad y
                    respeta términos de servicio del proveedor elegido.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            2. Consulta en vivo y experiencia de autocompletado
          </h2>
          <RucLookup />
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            3. Endpoint Next.js listo para producción
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            El handler incluido en <code className="rounded bg-slate-100 px-2 py-1 text-xs">src/app/api/ruc/route.ts</code>{' '}
            encapsula la consulta a un servicio público compatible con Next.js
            y Vercel. Añade tu propia estrategia de almacenamiento en caché,
            logging y control de cuotas para ambientes productivos.
          </p>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-sm text-slate-100">
            <pre className="overflow-x-auto p-6">
              <code>
{`export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ruc = searchParams.get('ruc');

  if (!ruc || !/^\\d{11}$/.test(ruc)) {
    return NextResponse.json({ error: 'RUC inválido' }, { status: 400 });
  }

  const response = await fetch(
    \`https://api.apis.net.pe/v1/ruc?numero=\${ruc}\`,
    { headers: { accept: 'application/json' } },
  );

  if (!response.ok) {
    throw new Error('Fallo consulta API RUC');
  }

  return NextResponse.json(await response.json());
}`}
              </code>
            </pre>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/40 bg-white/70 py-6 text-center text-xs text-slate-500 backdrop-blur">
        Construido con Next.js + Tailwind CSS · Listo para desplegar en Vercel ·
        Datos demostrativos, verifica antes de producción.
      </footer>
    </div>
  );
}
