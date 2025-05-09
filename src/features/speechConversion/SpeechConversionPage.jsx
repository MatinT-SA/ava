import React from "react";
import SpeechInput from "./components/SpeechInput";
import SpeechOutput from "./components/SpeechOutput";

const SpeechConversionPage = () => {
  return (
    <div>
      <h1>تبدیل گفتار</h1>
      <SpeechInput />
      <SpeechOutput />
    </div>
  );
};

export default SpeechConversionPage;
