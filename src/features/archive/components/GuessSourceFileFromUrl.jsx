export function guessSourceTypeFromUrl(url) {
  if (!url || typeof url !== "string") return null;

  const lowered = url.toLowerCase();

  if (/\.(mp3|wav|ogg|m4a|webm)(\?|$)/.test(lowered)) {
    return "record";
  }

  if (
    /^(https?:\/\/)/.test(lowered) &&
    !/\.(mp3|wav|ogg|m4a|webm|mp4|jpg|png|pdf)(\?|$)/.test(lowered)
  ) {
    return "link";
  }

  return "upload";
}
