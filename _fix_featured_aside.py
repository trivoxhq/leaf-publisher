from pathlib import Path

path = Path("components/home/featured-section.tsx")
text = path.read_text(encoding="utf-8")

start = text.index("          {/* Vertical slider — side picks */}")
end = text.index("        </motion.div>\n      </div>", start)

new_aside = r'''          {/* Vertical slider — side picks */}
          <motion.aside
            variants={itemVariants}
            className="relative z-10 flex min-h-0 flex-col self-start lg:col-span-5"
            aria-label="More featured titles this week"
          >
            <motion.div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/65">More picks</p>
              <motion.div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Previous title"
                >
                  <HiOutlineChevronUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Next title"
                >
                  <HiOutlineChevronDown className="size-4" aria-hidden />
                </button>
              </motion.div>
            </motion.div>

            <motion.div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
              <motion.div className="flex flex-col gap-2.5 sm:gap-3">
                <motion.div className="relative min-h-[11.5rem] sm:min-h-[12.5rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={book.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Link
                        href={book.href}
                        className="featured-slider-card group/card flex h-full min-h-[11.5rem] w-full flex-row overflow-hidden rounded-xl border border-white/12 bg-white/6 transition-[border-color,box-shadow] hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(106,191,46,0.35)] sm:min-h-[12.5rem]"
                      >
                        <motion.div
                          className="relative w-[38%] max-w-36 shrink-0 self-stretch sm:w-[34%] sm:max-w-40"
                          style={{ background: book.coverMesh }}
                        >
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
                          />
                          <motion.div
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/25 to-transparent opacity-80"
                          />
                          <p className="absolute bottom-3 left-3 right-2 font-display text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-base">
                            {book.title}
                          </p>
                        </motion.div>
                        <motion.div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-white/65">
                            {book.author} — {book.genre}
                          </p>
                          <span
                            className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeTone(book.badge)}`}
                          >
                            {book.badge}
                          </span>
                          <p className="mt-auto pt-3 font-display text-xl font-bold tabular-nums text-green2 sm:pt-4">
                            {book.price}
                          </p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <ul className="flex flex-col gap-2 sm:gap-2.5" role="list" aria-label="Other featured picks">
                  {SLIDER_BOOKS.map((b, i) => {
                    if (i === active) return null;
                    return (
                      <li key={b.id} role="listitem">
                        <button
                          type="button"
                          onClick={() => go(i)}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition-all duration-300 hover:border-green/30 hover:bg-white/8 sm:px-4 sm:py-3"
                        >
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wide text-white sm:size-11 sm:text-[11px]"
                            style={{ background: b.coverMesh }}
                            aria-hidden
                          >
                            {b.title.slice(0, 2)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">
                              {b.title}
                            </span>
                            <span className="block truncate text-xs text-white/60">
                              {b.author} — {b.genre}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums text-green2">
                            {b.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </motion.div>
          </motion.aside>
'''

# Replace motion.div wrappers with div for static layout (keep motion for animated parts)
new_aside = new_aside.replace('<motion.div className="mb-4', '<div className="mb-4', 1)
new_aside = new_aside.replace(
    '</motion.div>\n\n            <motion.div className="relative shrink-0',
    '</motion.div>\n\n            <motion.div className="relative shrink-0',
    1,
)
# Fix header: second replace wrong. Do explicit:
lines = new_aside.split('\n')
# Simpler: manual write with div tags from scratch

new_aside = '''          {/* Vertical slider — side picks */}
          <motion.aside
            variants={itemVariants}
            className="relative z-10 flex min-h-0 flex-col self-start lg:col-span-5"
            aria-label="More featured titles this week"
          >
            <motion.div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/65">More picks</p>
              <motion.div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Previous title"
                >
                  <HiOutlineChevronUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Next title"
                >
                  <HiOutlineChevronDown className="size-4" aria-hidden />
                </button>
              </motion.div>
            </motion.div>

            <motion.div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
              <motion.div className="flex flex-col gap-2.5 sm:gap-3">
                <motion.div className="relative min-h-[11.5rem] sm:min-h-[12.5rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={book.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Link
                        href={book.href}
                        className="featured-slider-card group/card flex h-full min-h-[11.5rem] w-full flex-row overflow-hidden rounded-xl border border-white/12 bg-white/6 transition-[border-color,box-shadow] hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(106,191,46,0.35)] sm:min-h-[12.5rem]"
                      >
                        <motion.div
                          className="relative w-[38%] max-w-36 shrink-0 self-stretch sm:w-[34%] sm:max-w-40"
                          style={{ background: book.coverMesh }}
                        >
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
                          />
                          <motion.div
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/25 to-transparent opacity-80"
                          />
                          <p className="absolute bottom-3 left-3 right-2 font-display text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-base">
                            {book.title}
                          </p>
                        </motion.div>
                        <motion.div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-white/65">
                            {book.author} — {book.genre}
                          </p>
                          <span
                            className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeTone(book.badge)}`}
                          >
                            {book.badge}
                          </span>
                          <p className="mt-auto pt-3 font-display text-xl font-bold tabular-nums text-green2 sm:pt-4">
                            {book.price}
                          </p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <ul className="flex flex-col gap-2 sm:gap-2.5" role="list" aria-label="Other featured picks">
                  {SLIDER_BOOKS.map((b, i) => {
                    if (i === active) return null;
                    return (
                      <li key={b.id} role="listitem">
                        <button
                          type="button"
                          onClick={() => go(i)}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition-all duration-300 hover:border-green/30 hover:bg-white/8 sm:px-4 sm:py-3"
                        >
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wide text-white sm:size-11 sm:text-[11px]"
                            style={{ background: b.coverMesh }}
                            aria-hidden
                          >
                            {b.title.slice(0, 2)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">
                              {b.title}
                            </span>
                            <span className="block truncate text-xs text-white/60">
                              {b.author} — {b.genre}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums text-green2">
                            {b.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </motion.div>
          </motion.aside>
'''

# Final version with proper div/motion tags - write file content directly
new_aside = """          {/* Vertical slider — side picks */}
          <motion.aside
            variants={itemVariants}
            className="relative z-10 flex min-h-0 flex-col self-start lg:col-span-5"
            aria-label="More featured titles this week"
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/65">More picks</p>
              <motion.div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Previous title"
                >
                  <HiOutlineChevronUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Next title"
                >
                  <HiOutlineChevronDown className="size-4" aria-hidden />
                </button>
              </motion.div>
            </motion.div>

            <motion.div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
              <motion.div className="flex flex-col gap-2.5 sm:gap-3">
                <motion.div className="relative min-h-[11.5rem] sm:min-h-[12.5rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={book.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Link
                        href={book.href}
                        className="featured-slider-card group/card flex h-full min-h-[11.5rem] w-full flex-row overflow-hidden rounded-xl border border-white/12 bg-white/6 transition-[border-color,box-shadow] hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(106,191,46,0.35)] sm:min-h-[12.5rem]"
                      >
                        <motion.div
                          className="relative w-[38%] max-w-36 shrink-0 self-stretch sm:w-[34%] sm:max-w-40"
                          style={{ background: book.coverMesh }}
                        >
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
                          />
                          <motion.div
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/25 to-transparent opacity-80"
                          />
                          <p className="absolute bottom-3 left-3 right-2 font-display text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-base">
                            {book.title}
                          </p>
                        </motion.div>
                        <motion.div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-white/65">
                            {book.author} — {book.genre}
                          </p>
                          <span
                            className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeTone(book.badge)}`}
                          >
                            {book.badge}
                          </span>
                          <p className="mt-auto pt-3 font-display text-xl font-bold tabular-nums text-green2 sm:pt-4">
                            {book.price}
                          </p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <ul className="flex flex-col gap-2 sm:gap-2.5" role="list" aria-label="Other featured picks">
                  {SLIDER_BOOKS.map((b, i) => {
                    if (i === active) return null;
                    return (
                      <li key={b.id} role="listitem">
                        <button
                          type="button"
                          onClick={() => go(i)}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition-all duration-300 hover:border-green/30 hover:bg-white/8 sm:px-4 sm:py-3"
                        >
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wide text-white sm:size-11 sm:text-[11px]"
                            style={{ background: b.coverMesh }}
                            aria-hidden
                          >
                            {b.title.slice(0, 2)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">
                              {b.title}
                            </span>
                            <span className="block truncate text-xs text-white/60">
                              {b.author} — {b.genre}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums text-green2">
                            {b.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </motion.div>
          </motion.aside>
"""

# Fix the string - use div for header and static wrappers
new_aside = new_aside.replace('<motion.div className="mb-4', '<div className="mb-4')
new_aside = new_aside.replace(
    '              </motion.div>\n            </motion.div>\n\n            <motion.div className="relative shrink-0',
    '              </div>\n            </motion.div>\n\n            <motion.div className="relative shrink-0',
)
new_aside = new_aside.replace(
    '<motion.div className="relative shrink-0 overflow-hidden',
    '<div className="relative shrink-0 overflow-hidden',
)
new_aside = new_aside.replace(
    '              <motion.div className="flex flex-col gap-2.5',
    '              <div className="flex flex-col gap-2.5',
)
new_aside = new_aside.replace(
    '                <motion.div className="relative min-h-[11.5rem]',
    '                <motion.div className="relative min-h-[11.5rem]',
)
new_aside = new_aside.replace(
    '                        <motion.div\n                          className="relative w-[38%]',
    '                        <motion.div\n                          className="relative w-[38%]',
)

# Still wrong. Let me write the correct aside as a separate file and splice
correct = Path("_aside_snippet.tsx").read_text(encoding="utf-8") if Path("_aside_snippet.tsx").exists() else None

# Write correct snippet file
Path("_aside_snippet.tsx").write_text("""          {/* Vertical slider — side picks */}
          <motion.aside
            variants={itemVariants}
            className="relative z-10 flex min-h-0 flex-col self-start lg:col-span-5"
            aria-label="More featured titles this week"
          >
            <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white/65">More picks</p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={goPrev}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Previous title"
                >
                  <HiOutlineChevronUp className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:border-green/40 hover:bg-white/12 hover:text-green2"
                  aria-label="Next title"
                >
                  <HiOutlineChevronDown className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <motion.div className="relative shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:p-4">
              <motion.div className="flex flex-col gap-2.5 sm:gap-3">
                <motion.div className="relative min-h-[11.5rem] sm:min-h-[12.5rem]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={book.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0"
                    >
                      <Link
                        href={book.href}
                        className="featured-slider-card group/card flex h-full min-h-[11.5rem] w-full flex-row overflow-hidden rounded-xl border border-white/12 bg-white/6 transition-[border-color,box-shadow] hover:border-green/40 hover:shadow-[0_16px_44px_-28px_rgba(106,191,46,0.35)] sm:min-h-[12.5rem]"
                      >
                        <motion.div
                          className="relative w-[38%] max-w-36 shrink-0 self-stretch sm:w-[34%] sm:max-w-40"
                          style={{ background: book.coverMesh }}
                        >
                          <motion.div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent"
                          />
                          <motion.div
                            aria-hidden
                            className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-green/50 via-green2/25 to-transparent opacity-80"
                          />
                          <p className="absolute bottom-3 left-3 right-2 font-display text-sm font-bold leading-tight tracking-tight text-white drop-shadow-sm sm:text-base">
                            {book.title}
                          </p>
                        </motion.div>
                        <motion.div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                          <p className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                            {book.title}
                          </p>
                          <p className="mt-1 text-sm text-white/65">
                            {book.author} — {book.genre}
                          </p>
                          <span
                            className={`mt-3 inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeTone(book.badge)}`}
                          >
                            {book.badge}
                          </span>
                          <p className="mt-auto pt-3 font-display text-xl font-bold tabular-nums text-green2 sm:pt-4">
                            {book.price}
                          </p>
                        </motion.div>
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                <ul className="flex flex-col gap-2 sm:gap-2.5" role="list" aria-label="Other featured picks">
                  {SLIDER_BOOKS.map((b, i) => {
                    if (i === active) return null;
                    return (
                      <li key={b.id} role="listitem">
                        <button
                          type="button"
                          onClick={() => go(i)}
                          className="flex w-full items-center gap-3 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 text-left transition-all duration-300 hover:border-green/30 hover:bg-white/8 sm:px-4 sm:py-3"
                        >
                          <span
                            className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase tracking-wide text-white sm:size-11 sm:text-[11px]"
                            style={{ background: b.coverMesh }}
                            aria-hidden
                          >
                            {b.title.slice(0, 2)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">
                              {b.title}
                            </span>
                            <span className="block truncate text-xs text-white/60">
                              {b.author} — {b.genre}
                            </span>
                          </span>
                          <span className="shrink-0 text-sm font-bold tabular-nums text-green2">
                            {b.price}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </motion.div>
          </motion.aside>
""".replace("<motion.div\n                          className=\"relative w-[38%]", "<div\n                          className=\"relative w-[38%]")
# This is getting too messy

Path("_aside_snippet.tsx").write_text("""PLACEHOLDER""")
