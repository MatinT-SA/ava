export function removingExtension(filename) {
  return filename.replace(/\.[^/.]+$/, "");
}
