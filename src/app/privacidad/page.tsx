import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Mail, Trash2, FileText, Database, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Liz Candelo Grueso trata los datos personales que recibe a través de su sitio (formulario de contacto y newsletter). Ley 1581/2012 de Colombia.",
  alternates: {
    canonical: "https://lizcandelo.andresmorales.com.co/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-10 md:pt-40">
      <Link
        href="/"
        className="text-[0.85rem] text-charcoal/60 transition-colors hover:text-terracotta"
      >
        ← Volver al sitio
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-charcoal/55">
          <Shield className="h-3.5 w-3.5 text-terracotta" />
          <span>Privacidad y datos</span>
        </div>
        <h1 className="font-display mt-3 text-[2.4rem] leading-tight text-charcoal md:text-[3rem]">
          Política de <span className="italic text-terracotta">privacidad</span>
        </h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/65">
          Última actualización: 6 de octubre de 2026. Esta política aplica al
          sitio <code className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[0.85em]">lizcandelo.andresmorales.com.co</code>{" "}
          y a los datos que recibes cuando me escribes.
        </p>
      </header>

      <Section icon={Database} title="1. Qué datos recogemos">
        <p>
          Cuando me escribes por el formulario de contacto, guardo tu{" "}
          <strong>nombre</strong>, tu <strong>correo electrónico</strong>, el{" "}
          <strong>asunto</strong> que elegiste y el <strong>mensaje</strong>{" "}
          que escribiste. También guardo la <strong>fecha y hora</strong> del
          envío.
        </p>
        <p>
          Cuando te suscribes al newsletter, guardo únicamente tu{" "}
          <strong>correo electrónico</strong> y la fecha de suscripción.
        </p>
        <p>
          El sitio <strong>no usa cookies de rastreo</strong> ni herramientas
          de terceros con fines publicitarios.
        </p>
      </Section>

      <Section icon={FileText} title="2. Para qué los uso">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Para responderte a la consulta que me hiciste.</li>
          <li>Para enviarte un aviso la próxima vez que publique algo nuevo (newsletter).</li>
          <li>Para mantener un registro de correspondencia profesional.</li>
        </ul>
        <p>
          <strong>No vendo, no comparto y no cedo</strong> tus datos a terceros.
          No los uso para marketing, ni para construir perfiles, ni para
          ningún tipo de decisión automatizada sobre ti.
        </p>
      </Section>

      <Section icon={Mail} title="3. Dónde se almacenan">
        <p>
          Los datos llegan al buzón{" "}
          <code className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[0.85em]">
            lizcandelo@andresmorales.com.co
          </code>
          , que corre sobre un servidor de correo auto-administrado (Mailcow).
          El servidor está ubicado en la infraestructura del proveedor que
          mantiene mi sitio, dentro de su región principal.
        </p>
        <p>
          El envío entre tu navegador y mi servidor viaja cifrado (HTTPS /
          TLS 1.3). El envío entre mi servidor y mi buzón también viaja
          cifrado (SMTP sobre TLS, puerto 465).
        </p>
      </Section>

      <Section icon={Clock} title="4. Por cuánto tiempo">
        <p>
          Los mensajes del formulario de contacto y los correos del
          newsletter se conservan mientras sigas en contacto conmigo o
          hasta que pidas que los borre. <strong>Como máximo 24 meses</strong>{" "}
          desde la última interacción; pasado ese plazo se eliminan.
        </p>
        <p>
          Los registros técnicos mínimos del servidor (logs, anti-spam) se
          conservan como máximo 30 días.
        </p>
      </Section>

      <Section icon={Shield} title="5. Tus derechos (Habeas Data, Ley 1581/2012, Colombia)">
        <p>Como titular de los datos personales, tienes derecho a:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Conocer</strong> qué datos tengo tuyos.
          </li>
          <li>
            <strong>Actualizarlos</strong> o <strong>rectificarlos</strong> si
            están desactualizados.
          </li>
          <li>
            <strong>Solicitar prueba</strong> de la autorización que me diste
            para tratarlos.
          </li>
          <li>
            <strong>Quejarse</strong> ante la Superintendencia de Industria y
            Comercio si consideras que estoy tratando mal tus datos.
          </li>
          <li>
            <strong>Revocar</strong> la autorización y/o{" "}
            <strong>pedir la supresión</strong> de tus datos cuando ya no
            sean necesarios.
          </li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, escríbeme a{" "}
          <a
            href="mailto:lizcandelo@andresmorales.com.co?subject=Habeas%20Data"
            className="underline decoration-dotted underline-offset-2 hover:text-terracotta"
          >
            lizcandelo@andresmorales.com.co
          </a>{" "}
          con el asunto <em>Habeas Data</em>. Te respondo en un plazo
          máximo de <strong>15 días hábiles</strong>.
        </p>
        <p>
          Si quieres <strong>eliminar tus datos ahora mismo</strong>, también
          puedes hacerlo desde el formulario de contacto: escríbeme
          pidiendo el borrado, o usa el botón de baja del newsletter.
        </p>
      </Section>

      <Section icon={Trash2} title="6. Cambios a esta política">
        <p>
          Si cambio algo material, actualizo la fecha de "última
          actualización" arriba. Si el cambio es grande (por ejemplo, un
          nuevo proveedor de correo), lo aviso en la home del sitio.
        </p>
      </Section>

      <div className="mt-12 rounded-2xl border border-charcoal/8 bg-cream-light/40 p-6 text-[0.88rem] text-charcoal/65">
        <p>
          <strong>Responsable del tratamiento:</strong> Liz Candelo Grueso.
          <br />
          <strong>Correo de contacto:</strong>{" "}
          <a
            href="mailto:lizcandelo@andresmorales.com.co"
            className="underline decoration-dotted underline-offset-2 hover:text-terracotta"
          >
            lizcandelo@andresmorales.com.co
          </a>
          <br />
          <strong>Marco legal:</strong> Ley Estatutaria 1581 de 2012,
          Decreto 1377 de 2013, Colombia.
        </p>
      </div>
    </main>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 font-display text-[1.4rem] leading-snug text-charcoal">
        <Icon className="h-4 w-4 text-terracotta" />
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-charcoal/80">
        {children}
      </div>
    </section>
  );
}
