import { useState } from "react";
import toast from "react-hot-toast";
import UploadIcon from "../../assets/icons/UploadIcon";
import MicIcon from "../../assets/icons/MicIcon";
import LinkIcon from "../../assets/icons/LinkIcon";

import Input from "../../components/Input";
import Goftar from "./Goftar";
import UploadFile from "./UploadFile";
import Recorder from "./Recorder";
import {
  // transcribeAudioFile,
  transcribeFilesFromMediaUrls,
} from "../../services/apiService";

// import { transcribeFromUrl } from "../../services/apiService";

const tabs = [
  { id: "record", label: "ضبط صدا", icon: <MicIcon />, color: "#00BA9F" },
  {
    id: "upload",
    label: "بارگذاری فایل",
    icon: <UploadIcon />,
    color: "var(--color-blue-upload)",
  },
  {
    id: "link",
    label: "لینک",
    icon: <LinkIcon />,
    color: "var(--color-red-link)",
  },
];

function Uploader() {
  const [selectedLang, setSelectedLang] = useState("فارسی");

  const [activeTab, setActiveTab] = useState("record");
  const [linkInput, setLinkInput] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(false);

  const activeColor = tabs.find((tab) => tab.id === activeTab)?.color;

  const handleSubmitLink = async () => {
    if (!linkInput.trim()) {
      toast.error("لطفاً یک لینک معتبر وارد کنید.");
      return;
    }

    setLoading(true);
    setTranscript(null);

    // console.log("شروع ارسال درخواست به API با لینک:", linkInput);
    // console.log("زبان انتخاب شده (استفاده نمی‌شود):", selectedLang);

    try {
      // فقط آرایه لینک‌ها رو می‌فرستیم، بدون زبان
      const data = await transcribeFilesFromMediaUrls([linkInput]);

      // console.log("پاسخ کامل API:", data);

      if (data.transcripts && data.transcripts.length > 0) {
        setTranscript(data.transcripts[0].text);
      } else {
        setTranscript("متنی یافت نشد");
      }

      toast.success("فایل با موفقیت پردازش شد 🎉");
    } catch (err) {
      console.error("خطا در تماس با API:", err);
      toast.error("خطا: " + (err.message || "خطای ناشناخته"));
    } finally {
      setLoading(false);
    }
  };

  // Recording audio
  async function handleAudioRecorded(fileUrl) {
    setLoading(true);
    try {
      const data = await transcribeFilesFromMediaUrls([fileUrl]);
      // فرض کن جواب api به این شکل باشه که متن پیاده شده تو data.transcripts[0].text هست
      setTranscript(data.transcripts?.[0]?.text || "متنی یافت نشد");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="xs:h-[200px] xs:w-[300px] relative mt-10 max-w-3xl pb-6 sm:h-[350px] sm:w-[480px] md:h-[429px] md:w-[653px] xl:h-[429px] xl:w-[653px] 2xl:h-[789px] 2xl:w-[1200px]"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow"
                    : "text-custom-gray hover:text-primary"
                }`}
                style={{
                  backgroundColor: isActive ? tab.color : "transparent",
                  borderRadius: isActive ? "10px 10px 0 0" : "0",
                  border: "none",
                }}
              >
                <span
                  className={`${isActive ? "text-white" : "text-custom-gray"}`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Box */}
      <div
        className={`upload-box xs:h-[200px] xs:w-[300px] relative sm:h-[350px] sm:w-[480px] md:h-[429px] md:w-[653px] xl:h-[429px] xl:w-[653px] 2xl:h-[789px] 2xl:w-[1200px] ${activeTab === "link" ? "link-active" : ""}`}
        dir="rtl"
        style={{
          borderRadius: activeTab === "record" ? "25px 0 25px 25px" : "25px",
          borderColor: activeColor,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div className="text-custom-gray flex h-full flex-col items-center justify-center space-y-4 self-center py-10 text-center">
          {/* Record */}
          {activeTab === "record" && (
            <>
              <Recorder
                onTranscription={async (audioBlob) => {
                  try {
                    setLoading(true);
                    // const data = await transcribeAudioFile(
                    //   audioBlob,
                    //   selectedLang,
                    // );
                    const text = data.transcripts?.[0]?.text || "متنی یافت نشد";
                    setTranscript(text);
                  } catch (err) {
                    toast.error(err.message);
                  } finally {
                    setLoading(false);
                  }
                }}
              />

              {loading && (
                <p className="mt-2 text-center text-gray-600">
                  در حال پردازش...
                </p>
              )}
              {transcript && (
                <p className="mt-4 text-center text-gray-700">
                  متن پیاده شده: {transcript}
                </p>
              )}
            </>
          )}

          {/* Upload file */}
          {activeTab === "upload" && (
            <>
              <UploadFile onFileSelect={(file) => setUploadedFile(file)} />
              <p className="text-center">
                برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
                <br /> متن پیاده شده آن، در اینجا ظاهر می شود
              </p>
            </>
          )}

          {/* Link */}
          {activeTab === "link" && (
            <>
              <Input
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
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
          )}
        </div>
      </div>

      {/* Goftar */}
      <div>
        <Goftar selectedLang={selectedLang} onLangChange={setSelectedLang} />
      </div>
    </div>
  );
}

export default Uploader;
