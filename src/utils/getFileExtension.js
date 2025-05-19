export function getFileExtension(filename) {
  if (!filename) return "";
  const ext = filename.split(".").pop().toLowerCase();
  return "." + ext;
}
