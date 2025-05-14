import { useState } from "react";
import MicIcon from "../../assets/icons/MicIcon";

function Recorder() {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordToggle = () => {
    setIsRecording((prev) => !prev);
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
        <p>ضبط در حال انجام است...</p>
      ) : (
        <p>برای شروع به صحبت، دکمه را فشار دهید</p>
      )}
    </>
  );
}

export default Recorder;
