"use client";

import {
  useCallback,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  GIFT_CARD_AMOUNT_OPTIONS,
  GIFT_CARD_OCCASIONS,
} from "@/components/gift-cards/gift-cards-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const FORM_LABEL_CLASS = "mb-1.5 block text-xs font-medium text-muted";

const FORM_FIELD_CLASS =
  "w-full rounded-lg border border-line/80 bg-bg px-3 py-2.5 text-sm leading-snug text-text placeholder:text-muted/60 outline-none transition-[border-color,box-shadow] duration-200 focus:border-green/45 focus:ring-2 focus:ring-green/15";

type GiftCardFormState = {
  yourName: string;
  yourEmail: string;
  recipientName: string;
  recipientEmail: string;
  giftAmount: string;
  occasion: string;
  personalMessage: string;
  howCanWeHelp: string;
};

const INITIAL_FORM: GiftCardFormState = {
  yourName: "",
  yourEmail: "",
  recipientName: "",
  recipientEmail: "",
  giftAmount: GIFT_CARD_AMOUNT_OPTIONS[0],
  occasion: GIFT_CARD_OCCASIONS[0],
  personalMessage: "",
  howCanWeHelp: "",
};

type GiftCardFormProps = {
  id?: string;
  className?: string;
};

export function GiftCardForm({ id, className = "" }: GiftCardFormProps) {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<GiftCardFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = useCallback(
    (field: keyof GiftCardFormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (submitted) setSubmitted(false);
      },
    [submitted]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Ready for future API integration — e.g. await submitGiftCardRequest(form)
    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <motion.form
      id={id}
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-line/80 bg-bg p-5 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] sm:p-6 lg:p-8 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE }}
      noValidate
    >
      <div className="flex flex-col gap-4" aria-live="polite">
        {submitted && (
          <p
            className="rounded-xl border border-green/35 bg-green/10 px-4 py-3 text-sm font-medium text-green"
            role="status"
          >
            Thank you. Your gift card request has been received, and our team will
            contact you soon.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gift-your-name" className={FORM_LABEL_CLASS}>
              Your Name
            </label>
            <input
              id="gift-your-name"
              name="yourName"
              type="text"
              autoComplete="name"
              required
              value={form.yourName}
              onChange={update("yourName")}
              className={FORM_FIELD_CLASS}
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="gift-your-email" className={FORM_LABEL_CLASS}>
              Your Email
            </label>
            <input
              id="gift-your-email"
              name="yourEmail"
              type="email"
              autoComplete="email"
              required
              value={form.yourEmail}
              onChange={update("yourEmail")}
              className={FORM_FIELD_CLASS}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="gift-recipient-name" className={FORM_LABEL_CLASS}>
              Recipient Name
            </label>
            <input
              id="gift-recipient-name"
              name="recipientName"
              type="text"
              required
              value={form.recipientName}
              onChange={update("recipientName")}
              className={FORM_FIELD_CLASS}
              placeholder="Who is this gift for?"
            />
          </div>

          <div>
            <label htmlFor="gift-recipient-email" className={FORM_LABEL_CLASS}>
              Recipient Email
            </label>
            <input
              id="gift-recipient-email"
              name="recipientEmail"
              type="email"
              value={form.recipientEmail}
              onChange={update("recipientEmail")}
              className={FORM_FIELD_CLASS}
              placeholder="recipient@email.com"
            />
          </div>

          <div>
            <label htmlFor="gift-amount" className={FORM_LABEL_CLASS}>
              Gift Amount
            </label>
            <select
              id="gift-amount"
              name="giftAmount"
              required
              value={form.giftAmount}
              onChange={update("giftAmount")}
              className={FORM_FIELD_CLASS}
            >
              {GIFT_CARD_AMOUNT_OPTIONS.map((amount) => (
                <option key={amount} value={amount}>
                  {amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="gift-occasion" className={FORM_LABEL_CLASS}>
              Occasion
            </label>
            <select
              id="gift-occasion"
              name="occasion"
              required
              value={form.occasion}
              onChange={update("occasion")}
              className={FORM_FIELD_CLASS}
            >
              {GIFT_CARD_OCCASIONS.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="gift-message" className={FORM_LABEL_CLASS}>
              Personal Message
            </label>
            <textarea
              id="gift-message"
              name="personalMessage"
              rows={4}
              value={form.personalMessage}
              onChange={update("personalMessage")}
              className={`${FORM_FIELD_CLASS} min-h-24 resize-y`}
              placeholder="Add a warm note for the recipient (optional)"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="gift-help" className={FORM_LABEL_CLASS}>
              How should we help?
            </label>
            <textarea
              id="gift-help"
              name="howCanWeHelp"
              rows={3}
              value={form.howCanWeHelp}
              onChange={update("howCanWeHelp")}
              className={`${FORM_FIELD_CLASS} min-h-20 resize-y`}
              placeholder="Tell us about the recipient's book idea or the service you want to support"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-[#ffffff]! shadow-[0_12px_40px_-16px_rgba(133,199,39,0.55)] transition-[background-color,transform] duration-200 hover:bg-green2 hover:text-[#ffffff]! focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Submit Gift Card Request
        </button>
      </div>
    </motion.form>
  );
}
