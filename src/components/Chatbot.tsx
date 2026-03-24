import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";

const CALENDLY_URL = "https://calendly.com/darikrodriguez-07/30min";
const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! 👋 Soy el asistente de Nexa Inmobiliary Intelligence. ¿En qué puedo ayudarte? Puedo contarte sobre nuestros servicios de automatización para inmobiliarias o ayudarte a agendar una reunión.",
};

async function streamChat({
  messages,
  onDelta,
  onDone,
  signal,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  signal?: AbortSignal;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
    signal,
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(err.error || `Error ${resp.status}`);
  }

  if (!resp.body) throw new Error("Sin respuesta");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let nl: number;
    while ((nl = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    let full = "";
    const update = (chunk: string) => {
      full += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: full } : m
          );
        }
        return [...prev, { role: "assistant", content: full }];
      });
    };

    try {
      await streamChat({
        messages: [...messages.filter((m) => m !== WELCOME), userMsg],
        onDelta: update,
        onDone: () => {
          setLoading(false);
          if (full.includes("[AGENDAR_CITA]")) {
            setShowCalendly(true);
            // Clean the marker from the displayed message
            setMessages((prev) =>
              prev.map((m, i) =>
                i === prev.length - 1
                  ? { ...m, content: m.content.replace("[AGENDAR_CITA]", "").trim() }
                  : m
              )
            );
          }
        },
      });
    } catch (e) {
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error. Intenta de nuevo en unos segundos.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
          open ? "w-14 h-14 rounded-full" : "rounded-full px-5 py-3 gap-2"
        }`}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <span className="text-sm font-medium">¿Alguna duda?</span>
            <MessageCircle className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-reveal-scale">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm"><p className="font-semibold text-sm">Asistente de Nexa</p></p>
              <p className="text-xs text-primary-foreground/60">En línea</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&_p]:m-0">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {showCalendly && (
              <div className="flex justify-start">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendly(false)}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-3 text-sm font-medium hover:bg-primary/90 transition-colors active:scale-[0.97]"
                >
                  <Calendar className="w-4 h-4" />
                  Agenda tu reunión!
                </a>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
