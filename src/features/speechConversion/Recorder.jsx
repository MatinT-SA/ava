import { useState, useEffect, useRef } from "react";
import MicIcon from "../../assets/icons/MicIcon";
import toast from "react-hot-toast";

function Recorder({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // بررسی پشتیبانی مرورگر
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("مرورگر شما از قابلیت تشخیص گفتار پشتیبانی نمی‌کند.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // ادامه دادن حتی بعد از سکته کوتاه
    recognition.interimResults = true; // دریافت نتایج موقت (زنده)

    recognition.lang = "fa-IR"; // زبان فارسی (می‌تونی تغییرش بدی)

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + " ";
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      // به‌روزرسانی متن زنده (موقت + نهایی)
      if (onTranscription) {
        onTranscription(finalTranscript + interimTranscript);
      }
    };

    recognition.onerror = (event) => {
      toast.error("خطا در تشخیص گفتار: " + event.error);
    };

    recognition.onend = () => {
      // وقتی ضبط به صورت غیرمنتظره تمام شد (مثلا کاربر صدای بلند نداشت)
      setIsRecording(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscription]);

  const handleRecordToggle = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        toast.error("خطا در شروع ضبط: " + error.message);
      }
    }
  };

  return (
    <>
      <div
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
        style={{
          backgroundColor: isRecording
            ? "var(--color-red-link)"
            : "var(--color-custom-teal)",
        }}
        onClick={handleRecordToggle}
      >
        <MicIcon className="text-4xl text-white" />
      </div>
      {isRecording ? (
        <p>در حال ضبط و تشخیص گفتار...</p>
      ) : (
        <p>برای شروع به صحبت، دکمه را فشار دهید</p>
      )}
    </>
  );
}

export default Recorder;
