import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Vista aérea ciudad mediterránea" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </div>

      <div className="container relative mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <ScrollReveal>
            <span className="inline-block text-secondary font-sans text-sm font-semibold tracking-widest uppercase mb-6">
              Automatización Inteligente
            </span>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-[1.08] mb-6" style={{ lineHeight: 1.08 }}>
              Tu inmobiliaria funciona sola mientras tú cierras ventas
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-primary-foreground/80 text-lg sm:text-xl max-w-lg mb-10 leading-relaxed font-light">
              CRM con inteligencia artificial que captura, cualifica y nutre leads automáticamente. Diseñado para el mercado inmobiliario español.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg shadow-secondary/25">
                Solicitar Demo Gratis
              </Button>
              <Button variant="hero-outline" size="xl" className="border-secondary/60 text-secondary hover:bg-secondary hover:text-secondary-foreground">
                Ver Cómo Funciona
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="flex gap-8 mt-14">
              {[
                { num: "3.2×", label: "más leads convertidos" },
                { num: "87%", label: "ahorro de tiempo" },
                { num: "24/7", label: "atención automatizada" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-secondary">{s.num}</p>
                  <p className="text-xs text-primary-foreground/60 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
