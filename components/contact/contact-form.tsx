"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const FORM_LABEL_CLASS = "mb-1.5 block text-xs font-medium text-white/80";

const FORM_FIELD_CLASS =
  "w-full rounded-lg border border-white/15 bg-white/8 px-3 py-2.5 text-sm leading-snug placeholder:text-white/45 outline-none transition-[border-color,box-shadow] duration-200 focus:border-green/45 focus:ring-2 focus:ring-green/20";

const FORM_FIELD_STYLE: CSSProperties = {
  color: "#ffffff",
  caretColor: "#ffffff",
  WebkitTextFillColor: "#ffffff",
};

type ContactFormState = {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: ContactFormState = {
  name: "",
  company: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

type ContactFormProps = {
  id?: string;
  className?: string;
};

export function ContactForm({ id, className = "" }: ContactFormProps) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    (field: keyof ContactFormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (submitted) setSubmitted(false);
      },
    [submitted]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ready for future API integration — e.g. await submitContactForm(form)
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)] ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[#181818]" />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/6 backdrop-blur-sm"
      />

      <motion.form
        id={id}
        onSubmit={handleSubmit}
        className="relative z-1 flex flex-col p-5 sm:p-6 lg:p-8"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: EASE }}
        noValidate
      >
        <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Send Us a Message
        </h3>

        <div className="mt-5 flex flex-col gap-4" aria-live="polite">
          {submitted && (
            <p
              className="rounded-xl border border-green/35 bg-green/10 px-4 py-3 text-sm font-medium text-green2"
              role="status"
            >
              Thank you — your message has been received. Our team will be in
              touch shortly.
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={FORM_LABEL_CLASS}>
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={update("name")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="contact-company" className={FORM_LABEL_CLASS}>
                Company
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={update("company")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="Your company or brand name"
              />
            </div>

            <div>
              <label htmlFor="contact-phone" className={FORM_LABEL_CLASS}>
                Phone
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={update("phone")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={FORM_LABEL_CLASS}>
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="Your email address"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-subject" className={FORM_LABEL_CLASS}>
                Subject
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={form.subject}
                onChange={update("subject")}
                className={FORM_FIELD_CLASS}
                style={FORM_FIELD_STYLE}
                placeholder="What is this about?"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className={FORM_LABEL_CLASS}>
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={update("message")}
                className={`${FORM_FIELD_CLASS} min-h-28 resize-y`}
                style={FORM_FIELD_STYLE}
                placeholder="Tell us about your book, manuscript, or publishing needs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-[#ffffff]! transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-[#181818] active:scale-[0.98]"
          >
            Send Message
          </button>
        </div>
      </motion.form>
    </div>
  );
}
