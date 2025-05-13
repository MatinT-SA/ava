// import { FaLink } from "react-icons/fa";
import LinkIcon from "../assets/icons/LinkIcon";

function Input() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute top-1/2 left-13 -translate-y-1/2">
        <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#FF1654]">
          <LinkIcon className="h-4 w-3 text-white" />
        </div>
      </div>
      <input
        type="text"
        placeholder="example.com/sample.mp3"
        className="w-10/12 rounded-full border border-[#FF1654] bg-white py-3 pl-15 text-left text-base text-gray-700 placeholder-gray-400 shadow-sm transition focus:ring-1 focus:ring-[#FF1654] focus:outline-none"
      />
    </div>
  );
}

export default Input;
