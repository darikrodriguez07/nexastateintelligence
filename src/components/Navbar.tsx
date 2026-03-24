import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#" className="font-serif text-xl text-primary tracking-tight">
          NEXA <span className="font-sans text-sm font-medium tracking-widest uppercase text-muted-foreground">Inmobiliary Intelligence</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#funciones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Funciones</a>
          <a href="#proceso" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Proceso</a>
          <a href="#resultados" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resultados</a>
          <Button variant="hero" size="default">
            <a
            href="https://calendly.com/darikrodriguez-07/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3"
            >
            Agendar Reunión
            </a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 space-y-3">
          <a href="#funciones" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Funciones</a>
          <a href="#proceso" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Proceso</a>
          <a href="#resultados" className="block text-sm text-muted-foreground" onClick={() => setOpen(false)}>Resultados</a>
          <Button variant="hero" size="default" className="w-full">
            <a
              href="https://calendly.com/darikrodriguez-07/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
            Agendar Reunión
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
