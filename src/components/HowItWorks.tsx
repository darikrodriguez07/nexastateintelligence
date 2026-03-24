import ScrollReveal from "@/components/ScrollReveal";
import { Search, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    num: "01",
    title: "Analizamos tu flujo actual",
    desc: "Estudiamos cómo captáis y gestionáis clientes para detectar cuellos de botella y oportunidades de mejora.",
  },
  {
    icon: Settings,
    num: "02",
    title: "Automatizamos tu inmobiliaria al 100%",
    desc: "Integramos la automatización con tus portales inmobiliarios, web, WhatsApp y canales actuales.",
  },
  {
    icon: Rocket,
    num: "03",
    title: "Tu agencia genera dinero sola",
    desc: "En poco tiempo tu inmobiliaria gestiona todos los clientes, tu solo cierras.",
  },
];

const HowItWorks = () => {
  return (
    <section id="proceso" className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Proceso</span>
            <h2 className="text-3xl lg:text-4xl text-foreground mt-3 mb-4">
              De la primera llamada a resultados reales
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <ScrollReveal key={s.num} delay={i * 120} animation="up">
              <div className="relative text-center">
                <span className="font-serif text-5xl text-primary/10 block mb-4">{s.num}</span>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <s.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
