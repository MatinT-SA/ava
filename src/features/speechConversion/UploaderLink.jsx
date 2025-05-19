import Input from "../../components/Input";

export default function UploaderLink({
  linkInput,
  setLinkInput,
  handleSubmitLink,
  loading,
}) {
  return (
    <>
      <Input value={linkInput} onChange={(e) => setLinkInput(e.target.value)} />
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
