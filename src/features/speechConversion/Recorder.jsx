import { useState, useEffect, useRef } from "react";
import MicIcon from "../../assets/icons/MicIcon";
import toast from "react-hot-toast";

function Recorder({ onTranscription }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const isManuallyStopped = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("مرورگر شما از قابلیت تشخیص گفتار پشتیبانی نمی‌کند.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "fa-IR";

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }

      if (finalTranscript && onTranscription) {
        onTranscription(finalTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("❌ Error:", event.error);
      toast.error("خطا در تشخیص گفتار: " + event.error);
      setIsRecording(false);
      isManuallyStopped.current = true;
    };

    recognition.onend = () => {
      setIsRecording(false);

      if (!isManuallyStopped.current) {
        setTimeout(() => {
          if (!isManuallyStopped.current) {
            recognition.start();
          }
        }, 500);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      isManuallyStopped.current = true;
      recognition.stop();
    };
  }, [onTranscription]);

  const handleRecordToggle = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (isRecording) {
      isManuallyStopped.current = true;
      recognition.stop();
    } else {
      isManuallyStopped.current = false;
      try {
        recognition.start();
      } catch (error) {
        toast.error("خطا در شروع ضبط: " + error.message);
        console.error("❌ Start error:", error);
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
        <p>در حال ضبط گفتار...</p>
      ) : (
        <p>برای شروع به صحبت، دکمه را فشار دهید</p>
      )}
    </>
  );
}

export default Recorder;
