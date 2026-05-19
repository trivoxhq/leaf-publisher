"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HiX } from "react-icons/hi";

const EASE = [0.22, 1, 0.36, 1] as const;
const MODAL_BG = "#181818";

const FORM_LABEL_CLASS = "mb-1 block text-xs font-medium text-white/80";

const FORM_FIELD_CLASS =
  "w-full rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm leading-snug placeholder:text-white/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-green/45 focus:ring-2 focus:ring-green/20";

const FORM_FIELD_STYLE: CSSProperties = {
  color: "#ffffff",
  caretColor: "#ffffff",
  WebkitTextFillColor: "#ffffff",
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

type GetStartedModalContextValue = {
  open: boolean;
  planLabel: string | null;
  openModal: (options?: { plan?: string }) => void;
  closeModal: () => void;
};

const GetStartedModalContext = createContext<GetStartedModalContextValue | null>(
  null
);

export function useGetStartedModal() {
  const ctx = useContext(GetStartedModalContext);
  if (!ctx) {
    throw new Error("useGetStartedModal must be used within GetStartedModalProvider");
  }
  return ctx;
}

export function GetStartedModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [planLabel, setPlanLabel] = useState<string | null>(null);

  const openModal = useCallback((options?: { plan?: string }) => {
    setPlanLabel(options?.plan ?? null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setPlanLabel(null);
  }, []);

  return (
    <GetStartedModalContext.Provider
      value={{ open, planLabel, openModal, closeModal }}
    >
      {children}
      <GetStartedModal />
    </GetStartedModalContext.Provider>
  );
}

function GetStartedForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const { planLabel } = useGetStartedModal();

  const update = useCallback(
    (field: keyof FormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm(INITIAL_FORM);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {planLabel && (
        <p className="rounded-xl border border-green/35 bg-green/10 px-4 py-2.5 text-sm font-medium text-green2">
          Plan: {planLabel}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="get-started-name" className={FORM_LABEL_CLASS}>
            Name
          </label>
          <input
            id="get-started-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            className={FORM_FIELD_CLASS}
            style={FORM_FIELD_STYLE}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="get-started-email" className={FORM_LABEL_CLASS}>
            Email
          </label>
          <input
            id="get-started-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update("email")}
            className={FORM_FIELD_CLASS}
            style={FORM_FIELD_STYLE}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="get-started-phone" className={FORM_LABEL_CLASS}>
            Phone <span className="text-white/45">(optional)</span>
          </label>
          <input
            id="get-started-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            className={FORM_FIELD_CLASS}
            style={FORM_FIELD_STYLE}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="get-started-message" className={FORM_LABEL_CLASS}>
            Message <span className="text-white/45">(optional)</span>
          </label>
          <textarea
            id="get-started-message"
            name="message"
            rows={3}
            value={form.message}
            onChange={update("message")}
            className={`${FORM_FIELD_CLASS} min-h-24 resize-none`}
            style={FORM_FIELD_STYLE}
            placeholder="Tell us what you're looking for…"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-[#ffffff]! transition-colors hover:bg-green2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818]"
      >
        Submit
      </button>
    </form>
  );
}

function GetStartedModal() {
  const reduce = useReducedMotion();
  const { open, closeModal } = useGetStartedModal();
  const titleId = useId();
  const descId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), reduce ? 0 : 40);
    return () => {
      document.documentElement.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  const handleSuccess = () => {
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close dialog"
            className="fixed inset-0 z-80 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.22 }}
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="fixed inset-x-4 top-[max(1rem,env(safe-area-inset-top))] z-90 mx-auto max-h-[min(90dvh,calc(100dvh-2rem))] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(88dvh,40rem)] sm:-translate-x-1/2 sm:-translate-y-1/2"
            style={{ backgroundColor: MODAL_BG }}
            onClick={(e) => e.stopPropagation()}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
            transition={
              reduce
                ? { duration: 0.15 }
                : { duration: 0.32, ease: EASE }
            }
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-green/35 to-transparent"
            />
            <div className="relative p-6 sm:p-8">
              <button
                ref={closeRef}
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green2"
                aria-label="Close"
              >
                <HiX className="size-5 text-white" aria-hidden />
              </button>

              <h2
                id={titleId}
                className="pr-12 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]"
              >
                Get started
              </h2>
              <p id={descId} className="mt-2 text-sm leading-relaxed text-white/70">
                Share your details and we&apos;ll help you set up your Leaf Publisher
                account.
              </p>

              <div className="mt-6" aria-live="polite">
                {submitted ? (
                  <div className="rounded-xl border border-green/35 bg-green/10 px-4 py-8 text-center">
                    <p className="font-display text-lg font-semibold text-white">
                      You&apos;re all set!
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Thanks for reaching out. We&apos;ll be in touch shortly.
                    </p>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/8 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/12"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <GetStartedForm onSuccess={handleSuccess} />
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
