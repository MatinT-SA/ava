import { useSelector, useDispatch } from "react-redux";
import {
  setLinkInput,
  setLoading,
  setTranscript,
} from "../../redux/uploaderSlice";
import toast from "react-hot-toast";

import Input from "../../components/Input";

import { transcribeFilesFromMediaUrls } from "../../services/apiService";

export default function UploaderLink() {
  const dispatch = useDispatch();
  const linkInput = useSelector((state) => state.uploader.linkInput);
  const loading = useSelector((state) => state.uploader.loading);

  const handleSubmitLink = async () => {
    if (!linkInput) return;

    dispatch(setLoading(true));
    try {
      const data = await transcribeFilesFromMediaUrls([linkInput]);
      const text = data.transcripts?.[0]?.text || "متنی یافت نشد";
      dispatch(setTranscript(text));
      toast.success("لینک با موفقیت پردازش شد!");
    } catch (error) {
      console.error("خطا در پردازش لینک:", error);
      toast.error("خطا در پردازش لینک، لطفا دوباره تلاش کنید.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Input
        value={linkInput}
        onChange={(e) => dispatch(setLinkInput(e.target.value))}
        placeholder="آدرس فایل صوتی یا تصویری را وارد کنید"
      />
      <button
        onClick={handleSubmitLink}
        disabled={loading}
        className={`mt-3 rounded-full px-6 py-2 text-white ${
          loading
            ? "cursor-not-allowed bg-gray-400"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {loading ? "در حال پردازش..." : "ارسال"}
      </button>
      <p className="mt-2 text-sm text-gray-600">
        نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
        <br /> و دکمه را فشار دهید
      </p>
    </>
  );
}
