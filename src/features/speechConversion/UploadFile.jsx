import { useRef } from "react";
import UploadIcon from "../../assets/icons/UploadIcon";

function UploadFile({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className="bg-blue-upload flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
      onClick={handleClick}
    >
      <UploadIcon className="text-4xl text-white" />
      <input
        type="file"
        accept="audio/*,video/*"
        ref={fileInputRef}
        onChange={handleChange}
        hidden
      />
    </div>
  );
}

export default UploadFile;
