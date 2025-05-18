import { toast } from "react-hot-toast";

export async function copyTextToClipboard(text) {
  if (!text) {
    toast.error("متنی برای کپی وجود ندارد.");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    toast.success("متن با موفقیت کپی شد!");
  } catch (err) {
    toast.error("خطا در کپی کردن متن.");
  }
}
