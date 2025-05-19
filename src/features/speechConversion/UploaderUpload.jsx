import UploadFile from "./UploadFile";
import toast from "react-hot-toast";

export default function UploaderUpload({
  transcript,
  setTranscript,
  setUploadedFile,
  loading,
  setLoading,
}) {
  return (
    <>
      <UploadFile
        onFileSelect={async (file) => {
          if (!file) return;
          setUploadedFile(file);
          setTranscript(null);
          setLoading(true);

          try {
            const data = await transcribeFileUpload(file);
            setTranscript(data.transcripts?.[0]?.text || "متنی یافت نشد");
            toast.success("فایل با موفقیت پردازش شد 🎉");
          } catch (err) {
            console.error("خطا در پردازش فایل:", err);
            toast.error("خطا: " + (err.message || "خطای ناشناخته"));
          } finally {
            setLoading(false);
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
