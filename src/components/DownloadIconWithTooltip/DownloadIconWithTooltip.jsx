// DownloadIconWithTooltip.jsx
import styles from "./DownloadIconWithTooltip.module.css";
import DownloadIcon from "../../assets/icons/DownloadIcon";

function formatBytes(bytes) {
  if (bytes === 0) return "۰ بایت";
  const k = 1024;
  const sizes = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت", "ترابایت"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = parseFloat((bytes / Math.pow(k, i)).toFixed(1));
  return convertToPersianNumbers(num) + " " + sizes[i];
}

function convertToPersianNumbers(str) {
  const persianNums = "۰۱۲۳۴۵۶۷۸۹";
  return str
    .toString()
    .split("")
    .map((ch) => (/\d/.test(ch) ? persianNums[ch] : ch))
    .join("");
}

export default function DownloadIconWithTooltip({ file, className }) {
  return (
    <div className={styles.iconWrapper}>
      <DownloadIcon className={className} />
      {file?.sizeInBytes && (
        <div className={styles.tooltip}>{formatBytes(file.sizeInBytes)}</div>
      )}
    </div>
  );
}
