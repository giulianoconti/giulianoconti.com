import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useLocale } from "../../../contexts/LocaleContext";
import { WA_MSG } from "../../../utils/constants";
import { SendIcon, WhatsAppIcon } from "../../../icons";
import "./styles.scss";

type QuoteResult = {
  model: "monthly" | "onetime";
  tier: "basic" | "standard" | "premium";
  currency: "usd" | "ars";
  setupPriceUsd: number | null;
  monthlyPriceUsd: number | null;
  selectedFeatures: string[];
  whatsappLink: string;
} | null;

type ChatMessage = { role: "user" | "assistant"; content: string; quote?: QuoteResult };

const AR_SHORT = [
  "America/Cordoba",
  "America/Buenos_Aires",
  "America/Mendoza",
  "America/Jujuy",
  "America/Catamarca",
  "America/Rosario",
];
function isArgentina(): boolean {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return tz.startsWith("America/Argentina/") || AR_SHORT.includes(tz);
}

export default function Chat() {
  const { t, locale } = useLocale();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<"rate_limited" | "network" | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const syncOverflow = () => {
      const overflows = el.scrollHeight > el.clientHeight;
      if (overflows) el.setAttribute("data-lenis-prevent", "");
      else el.removeAttribute("data-lenis-prevent");
    };

    syncOverflow();
    const observer = new ResizeObserver(syncOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [messages, loading, error]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    if (input) el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    setInput("");
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(m => ({ role: m.role, content: m.content })),
          locale,
          currency: isArgentina() ? "ars" : "usd",
        }),
      });

      if (res.status === 429) {
        setError("rate_limited");
        return;
      }
      if (!res.ok) throw new Error("bad_response");

      const data: { reply: string; quote: QuoteResult } = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply, quote: data.quote }]);
    } catch {
      setError("network");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section className="chat" id="chat">
      <div className="chat_inner">
        <div className="chat_header">
          <p className="chat_header_eyebrow">{t.chat.label.toUpperCase()}</p>
          <div className="chat_header_rule" />
        </div>

        <div className="chat_content">
          <h2 className="chat_content_title">
            {t.chat.h2pre} <em>{t.chat.h2em}</em>
          </h2>

          <p className="chat_content_desc">{t.chat.p1}</p>

          <p className="chat_content_desc">{t.chat.p2}</p>

          <div
            className="chat_panel"
            onClick={() => {
              if (messages.length === 0) textareaRef.current?.focus();
            }}
          >
            <div className="chat_panel_list" ref={listRef}>
              {messages.length === 0 && <p className="chat_panel_greeting">{t.chat.greeting}</p>}

              {messages.map((m, i) => (
                <div key={i} className={`chat_msg chat_msg--${m.role}`}>
                  <p>{m.content}</p>
                  {m.quote && (
                    <a
                      className="chat_msg_cta"
                      href={m.quote.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon width={16} height={16} /> {t.chat.waFallback}
                    </a>
                  )}
                </div>
              ))}

              {loading && (
                <div className="chat_msg chat_msg--assistant chat_msg--loading">
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {error && (
                <div className="chat_panel_error">
                  <p>{error === "rate_limited" ? t.chat.rateLimited : t.chat.networkError}</p>
                  <a href={WA_MSG(t.contact.waMsg)} target="_blank" rel="noopener noreferrer">
                    {t.chat.waFallback}
                  </a>
                </div>
              )}
            </div>

            <div className="chat_panel_input">
              <div className="chat_panel_input_field">
                <textarea
                  ref={textareaRef}
                  id="chat-input"
                  name="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={t.chat.placeholder}
                  rows={1}
                  maxLength={500}
                />
              </div>
              {input.trim() && (
                <button
                  type="button"
                  className="chat_panel_input_send"
                  onClick={send}
                  disabled={loading}
                  aria-label={t.chat.send}
                >
                  <SendIcon width={18} height={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
