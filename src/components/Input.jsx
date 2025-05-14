import LinkIcon from "../assets/icons/LinkIcon";

function Input({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="pointer-events-none absolute top-1/2 left-13 -translate-y-1/2">
        <div className="bg-red-link flex h-7.5 w-7.5 items-center justify-center rounded-full">
          <LinkIcon className="h-4 w-3 text-white" />
        </div>
      </div>
      <input
        type="text"
        placeholder="example.com/sample.mp3"
        value={value}
        onChange={onChange}
        className="border-red-link focus:ring-red-link w-10/12 rounded-full border bg-white py-3 pl-15 text-left text-base text-gray-700 placeholder-gray-400 shadow-sm transition focus:ring-1 focus:outline-none"
      />
    </div>
  );
}

export default Input;
