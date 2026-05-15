from pathlib import Path

lines = Path("components/home/featured-section.tsx").read_text(encoding="utf-8").splitlines()

# Fix header close (line 292, index 291)
lines[291] = "            </div>"

ap_idx = next(i for i, l in enumerate(lines) if "</AnimatePresence>" in l)
ul_start = next(i for i, l in enumerate(lines) if 'aria-label="Other featured picks"' in l)
ul_end = next(i for i, l in enumerate(lines) if l.strip() == "</ul>")
aside_end = next(i for i, l in enumerate(lines) if "</motion.aside>" in l)

D = "div"
new_middle = [
    f"                </{D}>",
    "",
    *lines[ul_start : ul_end + 1],
    f"              </{D}>",
    f"            </{D}>",
]

lines = lines[: ap_idx + 1] + new_middle + lines[aside_end:]

Path("components/home/featured-section.tsx").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("ok")
