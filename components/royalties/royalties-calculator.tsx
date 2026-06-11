"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CALCULATOR_DISCLAIMER } from "@/components/royalties/royalties-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const LABEL_CLASS = "mb-1.5 block text-xs font-medium text-muted";
const INPUT_CLASS =
  "w-full rounded-lg border border-line/80 bg-bg px-3 py-2.5 text-sm text-text outline-none transition-[border-color,box-shadow] focus:border-green/45 focus:ring-2 focus:ring-green/15";

function parseNum(value: string): number | null {
  const n = Number.parseFloat(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function formatMoney(value: number | null): string {
  if (value === null) return "—";
  return `$${value.toFixed(2)}`;
}

export function RoyaltiesCalculator() {
  const reduceMotion = useReducedMotion();
  const [ebookPrice, setEbookPrice] = useState("");
  const [estimatedSales, setEstimatedSales] = useState("");
  const [platformFeePercent, setPlatformFeePercent] = useState("");
  const [royaltyPercent, setRoyaltyPercent] = useState("");

  const results = useMemo(() => {
    const price = parseNum(ebookPrice);
    const sales = parseNum(estimatedSales);
    const platformFee = parseNum(platformFeePercent);
    const royalty = parseNum(royaltyPercent);

    if (
      price === null ||
      sales === null ||
      platformFee === null ||
      royalty === null ||
      platformFee > 100 ||
      royalty > 100
    ) {
      return null;
    }

    const grossRevenue = price * sales;
    const platformFees = grossRevenue * (platformFee / 100);
    const remainingRevenue = grossRevenue - platformFees;
    const authorRoyalty = remainingRevenue * (royalty / 100);

    return {
      grossRevenue,
      platformFees,
      remainingRevenue,
      authorRoyalty,
    };
  }, [ebookPrice, estimatedSales, platformFeePercent, royaltyPercent]);

  const onChange =
    (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const outputs = [
    { label: "Gross Revenue", value: formatMoney(results?.grossRevenue ?? null) },
    { label: "Estimated Platform Fees", value: formatMoney(results?.platformFees ?? null) },
    { label: "Estimated Author Royalty", value: formatMoney(results?.authorRoyalty ?? null) },
    {
      label: "Estimated Net Earnings",
      value: formatMoney(results?.authorRoyalty ?? null),
      highlight: true,
    },
  ] as const;

  return (
    <motion.div
      className="rounded-3xl border border-line/80 bg-bg p-5 shadow-[0_20px_60px_-40px_rgba(26,34,24,0.12)] sm:p-6 lg:p-8"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="calc-ebook-price" className={LABEL_CLASS}>
              Ebook Price
            </label>
            <input
              id="calc-ebook-price"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={ebookPrice}
              onChange={onChange(setEbookPrice)}
              placeholder="e.g. 9.99"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="calc-estimated-sales" className={LABEL_CLASS}>
              Estimated Sales
            </label>
            <input
              id="calc-estimated-sales"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={estimatedSales}
              onChange={onChange(setEstimatedSales)}
              placeholder="e.g. 100"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="calc-platform-fee" className={LABEL_CLASS}>
              Platform Fee Percentage
            </label>
            <input
              id="calc-platform-fee"
              type="number"
              min="0"
              max="100"
              step="0.1"
              inputMode="decimal"
              value={platformFeePercent}
              onChange={onChange(setPlatformFeePercent)}
              placeholder="e.g. 30"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="calc-royalty-percent" className={LABEL_CLASS}>
              Royalty Percentage
            </label>
            <input
              id="calc-royalty-percent"
              type="number"
              min="0"
              max="100"
              step="0.1"
              inputMode="decimal"
              value={royaltyPercent}
              onChange={onChange(setRoyaltyPercent)}
              placeholder="e.g. 70"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {outputs.map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border p-4 sm:p-5 ${
                "highlight" in item && item.highlight
                  ? "border-green/30 bg-green/6"
                  : "border-line/70 bg-paper"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                {item.label}
              </p>
              <p
                className={`mt-2 font-display text-2xl font-bold tracking-tight ${
                  "highlight" in item && item.highlight ? "text-green" : "text-text"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 rounded-xl border border-line/70 bg-paper/80 px-4 py-3 text-sm leading-relaxed text-muted">
        {CALCULATOR_DISCLAIMER}
      </p>
    </motion.div>
  );
}
