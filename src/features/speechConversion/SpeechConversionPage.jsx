import React from "react";
import SpeechInput from "./SpeechInput";
import SpeechOutput from "./SpeechOutput";

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
