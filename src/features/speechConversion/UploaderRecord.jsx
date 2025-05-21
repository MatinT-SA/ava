import { useSelector, useDispatch } from "react-redux";
import { setTranscript } from "../../redux/uploaderSlice";

import Recorder from "./Recorder";
import RefreshIcon from "../../assets/icons/RefreshIcon";

export default function UploaderRecord() {
  const dispatch = useDispatch();
  const transcript = useSelector((state) => state.uploader.transcript);
  const loading = useSelector((state) => state.uploader.loading);

  return (
    <>
      <Recorder
        onTranscription={(newText) => {
          // اضافه کردن متن جدید به متن قبلی
          dispatch(
            setTranscript(transcript ? transcript + " " + newText : newText),
          );
        }}
      />

      {loading && (
        <p className="mt-2 text-center text-gray-600">در حال پردازش...</p>
      )}

      {transcript && (
        <div className="relative mt-4 px-10 text-center leading-8 text-gray-700">
          <p>متن پیاده شده: {transcript}</p>
          <button
            onClick={() => dispatch(setTranscript(""))}
            className="absolute top-0 right-0 p-2 hover:text-red-500"
            aria-label="شروع مجدد"
          >
            <RefreshIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </>
  );
}
