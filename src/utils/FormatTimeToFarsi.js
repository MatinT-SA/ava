export function formatTimeToFarsi(seconds) {
  if (isNaN(seconds)) return "۰۰:۰۰";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const toFarsiDigits = (num) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  return `${toFarsiDigits(m.toString().padStart(2, "0"))}:${toFarsiDigits(
    s.toString().padStart(2, "0"),
  )}`;
}
