import { toFarsiDigits } from "./toFarsiDigits";

export function formatDuration(durationStr) {
  if (!durationStr) return "-";

  const parts = durationStr.split(":");
  if (parts.length !== 3) return durationStr;

  const hours = parts[0].padStart(2, "0");
  const minutes = parts[1].padStart(2, "0");
  const seconds = Math.floor(parseFloat(parts[2])).toString().padStart(2, "0");

  if (parseInt(hours, 10) > 0) {
    return `${toFarsiDigits(hours)}:${toFarsiDigits(minutes)}:${toFarsiDigits(seconds)}`;
  } else {
    return `${toFarsiDigits(minutes)}:${toFarsiDigits(seconds)}`;
  }
}
