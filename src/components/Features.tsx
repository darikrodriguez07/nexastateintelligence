import ScrollReveal from "@/components/ScrollReveal";
import { ListCheck, Zap, Settings, Phone } from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Auditoria + demo gratis",
    desc: "Estudiamos tu negocio y te mostramos una versión simple personalizada de cómo el sistema capta clientes desde tu web, guarda sus datos y agenda citas automáticamente.",
    price: "GRATIS"
  },
  {
    icon: Zap,
    title: "Sistema completo de automatización",
    desc: "Instalamos un sistema completo que capta clientes, responde automáticamente, organiza sus datos, agenda citas y realiza seguimiento por WhatsApp, para que tú solo te centres en cerrar ventas.",
    price: "1000€"
  },
  {
    icon: ListCheck,
    title: "Automatización básica de clientes",
    desc: "Instalamos un sistema que responde automáticamente a tus clientes, recoge sus datos y los clasifica según sus intereses para ayudarte a gestionar mejor cada oportunidad.",
    price: "200€"
  },
  {
    icon: Settings,
    title: "Mantenimiento",
    desc: "Nos encargamos de que tu sistema funcione siempre correctamente, realizando ajustes, mejoras y soporte continuo para que sigas captando clientes sin preocuparte por lo técnico.",
    price: "100€/mes"
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
          {features.map((f, i) => {
            const isHighTicket = i === 1;
            const isMaintenance = i === 3;

            return (
              <ScrollReveal key={f.title} delay={i * 80} animation="scale">
                <div
                  className={`group rounded-xl p-7 transition-all duration-300
                    ${isHighTicket 
                      ? "bg-primary text-white shadow-lg scale-105 border border-primary/30" 
                      : isMaintenance 
                        ? "bg-muted/40 opacity-80 hover:opacity-100" 
                        : "bg-background shadow-sm shadow-primary/5 hover:shadow-md hover:shadow-primary/10"
                    }
                  `}
                >
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 transition-colors
                      ${isHighTicket 
                        ? "bg-white/20" 
                        : isMaintenance 
                          ? "bg-muted" 
                          : "bg-primary/10 group-hover:bg-primary/15"
                      }
                    `}
                  >
                    <f.icon
                      className={`w-5 h-5 ${
                        isHighTicket ? "text-white" : "text-primary"
                      }`}
                    />
                  </div>

                  {isHighTicket && (
                    <div className="mb-3">
                      <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                        Más recomendado
                      </span>
                    </div>
                  )}

                  <h3
                    className={`font-serif text-lg mb-2 ${
                      isHighTicket ? "text-white" : "text-foreground"
                    }`}
                  >
                    {f.title}
                  </h3>

                  <p
                    className={`text-sm font-semibold mb-2 ${
                    isHighTicket ? "text-white/90" : "text-muted-foreground"
                    }`}
                  >
                    {f.price}
                  </p>

                  <p
                    className={`text-sm leading-relaxed ${
                      isHighTicket
                        ? "text-white/90"
                        : "text-muted-foreground"
                    }`}
                  >
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;