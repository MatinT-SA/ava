import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button";
import ArrowIconDown from "../../assets/icons/ArrowIconDown";
import ArrowIconUp from "../../assets/icons/ArrowIconUp";

function Goftar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("فارسی");
  const dropdownRef = useRef(null);

  const languages = ["فارسی", "انگلیسی"];

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="text-custom-teal mt-5 flex w-full items-center justify-end gap-6">
      <span className="text-custom-gray text-sm">زبان گفتار:</span>

      <div className="relative" ref={dropdownRef}>
        <Button
          className="flex items-center justify-between gap-6 border-2 border-[#2dd4bf] pr-9 text-sm"
          onClick={toggleDropdown}
        >
          <span>{selectedLang}</span>
          <span>{isOpen ? <ArrowIconUp /> : <ArrowIconDown />}</span>
        </Button>

        {isOpen && (
          <ul className="absolute top-full right-0 z-20 mt-2 w-full min-w-[120px] rounded-md border bg-white py-1 text-sm text-gray-700 shadow-md">
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => handleSelect(lang)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Goftar;
