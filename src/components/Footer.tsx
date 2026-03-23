const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-xl text-primary-foreground">NEXA <span className="font-sans text-sm font-medium tracking-widest uppercase text-primary-foreground/60">State Intelligence</span></span>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="https://raw.githubusercontent.com/darikrodriguez07/nexastateintelligence/main/Privacidad.pdf" target="_blank" className="hover:text-primary-foreground/80 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary-foreground/80 transition-colors">NexaAI</a>
            <a href="mailto:darikrodriguez.07@gmail.com" target="_blank"className="hover:text-primary-foreground/80 transition-colors">Contacto</a>
          </div>
          <p className="text-xs text-primary-foreground/40">© 2026 NEXA State Intelligence. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
