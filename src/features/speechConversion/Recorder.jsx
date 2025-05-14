import { useState, useRef } from "react";

function Recorder({ selectedLanguage }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [transcript, setTranscript] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
      audioChunks.current = [];

      // TODO: send `audioBlob` + `selectedLanguage` to backend or API
      // then setTranscript(...)
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="text-center">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`rounded-full px-4 py-2 text-white ${isRecording ? "bg-red-500" : "bg-green-500"}`}
      >
        {isRecording ? "توقف" : "شروع ضبط"}
      </button>

      {audioURL && (
        <div className="mt-4">
          <audio controls src={audioURL} />
        </div>
      )}

      {transcript && (
        <div className="mt-4 rounded border bg-gray-50 p-4 text-right">
          <strong>متن پیاده شده:</strong>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default Recorder;
