import ScrollReveal from "@/components/ScrollReveal";
import { Bot, Zap, BarChart3, MessageSquare, Calendar, Shield } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Captación Automática",
    desc: "La IA recoge leads de portales, web y redes sociales y los registra en tu CRM sin intervención manual.",
  },
  {
    icon: MessageSquare,
    title: "Seguimiento por WhatsApp",
    desc: "Respuestas instantáneas y seguimiento personalizado a cada lead vía WhatsApp, email y SMS.",
  },
  {
    icon: Zap,
    title: "Cualificación Inteligente",
    desc: "Algoritmos que puntúan cada contacto según urgencia, presupuesto y zona de interés.",
  },
  {
    icon: Calendar,
    title: "Agenda de Visitas",
    desc: "Programación automática de visitas coordinando disponibilidad del agente y el cliente.",
  },
  {
    icon: BarChart3,
    title: "Panel de Rendimiento",
    desc: "Métricas en tiempo real de tu embudo: conversión, tiempo de respuesta y productividad por agente.",
  },
  {
    icon: Shield,
    title: "Cumplimiento RGPD",
    desc: "Gestión automática de consentimientos y datos personales conforme a la normativa europea.",
  },
];

const Features = () => {
  return (
    <section id="funciones" className="py-24 lg:py-32 surface-warm">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Funciones</span>
            <h2 className="text-3xl lg:text-4xl text-foreground mt-3 mb-4">
              Todo lo que tu agencia necesita, automatizado
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Un sistema completo que trabaja las 24 horas para que tu equipo se centre en lo que mejor sabe hacer: vender.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80} animation="scale">
              <div className="group bg-background rounded-xl p-7 shadow-sm shadow-primary/5 hover:shadow-md hover:shadow-primary/10 transition-shadow duration-300">
                <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
