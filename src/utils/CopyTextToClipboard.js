export async function copyTextToClipboard(text) {
  if (!text) {
    alert("متنی برای کپی وجود ندارد.");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    alert("متن با موفقیت کپی شد!");
  } catch (err) {
    alert("خطا در کپی کردن متن.");
  }
}
