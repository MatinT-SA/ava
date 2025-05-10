// components/Microphone.jsx
function Microphone() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="h-[62px] w-[62px]">
        {/* آیکون میکروفن */}
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... مسیر کامل SVG ... */}
        </svg>
      </div>
      <p className="text-base">
        برای شروع به صحبت، دکمه را فشار دهید
        <br />
        متن پیاده شده آن، در اینجا ظاهر شود
      </p>
    </div>
  );
}

export default Microphone;
