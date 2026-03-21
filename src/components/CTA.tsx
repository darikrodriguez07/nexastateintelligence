import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 lg:py-32 surface-warm">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl text-foreground mb-5">
              Tu competencia ya se está automatizando
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Agenda una demo de 20 minutos y descubre cuántas horas puede ahorrar tu equipo cada semana con nuestro CRM inteligente.
            </p>
            <Button variant="hero" size="xl" className="gap-3">
              Solicitar Demo Gratis <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-xs text-muted-foreground mt-5">Sin compromiso · Configuración en 14 días · Soporte en español</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTA;
