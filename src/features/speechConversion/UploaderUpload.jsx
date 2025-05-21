import { useSelector, useDispatch } from "react-redux";
import {
  setTranscript,
  setLoading,
  setUploadedFile,
} from "../../redux/uploaderSlice";

import UploadFile from "./UploadFile";
import toast from "react-hot-toast";

export default function UploaderUpload() {
  const dispatch = useDispatch();
  const transcript = useSelector((state) => state.uploader.transcript);
  const loading = useSelector((state) => state.uploader.loading);

  return (
    <>
      <UploadFile
        onFileSelect={async (file) => {
          if (!file) return;

          dispatch(setUploadedFile(file));
          dispatch(setTranscript(null));
          dispatch(setLoading(true));

          try {
            const data = await transcribeFileUpload(file);
            dispatch(
              setTranscript(data.transcripts?.[0]?.text || "متنی یافت نشد"),
            );
            toast.success("فایل با موفقیت پردازش شد 🎉");
          } catch (err) {
            console.error("خطا در پردازش فایل:", err);
            toast.error("خطا: " + (err.message || "خطای ناشناخته"));
          } finally {
            dispatch(setLoading(false));
          }
        }}
      />

      {loading && (
        <p className="mt-4 text-center text-blue-500">
          در حال پردازش فایل، لطفا صبر کنید...
        </p>
      )}

      {!loading && transcript && (
        <p className="mt-4 text-center">{transcript}</p>
      )}

      {!loading && !transcript && (
        <p className="mt-4 text-center">
          برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
          <br /> متن پیاده شده آن، در اینجا ظاهر می شود
        </p>
      )}
    </>
  );
}
