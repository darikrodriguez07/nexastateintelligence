import ScrollReveal from "@/components/ScrollReveal";

const stats = [
  { value: "147", suffix: "+", label: "Inmobiliarias automatizadas" },
  { value: "2.4", suffix: "M", label: "Clientes gestionados" },
  { value: "42", suffix: "%", label: "Aumento conversión media" },
  { value: "< 15", suffix: "s", label: "Tiempo medio de respuesta" },
];

const Results = () => {
  return (
    <section id="resultados" className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-secondary/70">Resultados</span>
            <h2 className="text-3xl lg:text-4xl text-primary-foreground mt-3">
              Números que hablan solos
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 100} animation="scale">
              <div className="text-center">
                <p className="font-serif text-4xl lg:text-5xl text-secondary">
                  {s.value}<span className="text-secondary/70">{s.suffix}</span>
                </p>
                <p className="text-sm text-primary-foreground/60 mt-2">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
