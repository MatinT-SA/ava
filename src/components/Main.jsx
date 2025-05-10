import { useState } from "react";
import Button from "./Button";
import Microphone from "./Microphone";
import Uploader from "./Uploader";
import Goftar from "./Goftar";

function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-10 px-4 pt-24 text-center">
      {/* عنوان اصلی */}
      <h1 className="text-4xl font-bold">تبدیل گفتار به متن</h1>

      {/* توضیح زیر عنوان */}
      <p className="max-w-xl text-lg">
        آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف، زبان فارسی را
        یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
      </p>

      {/* کامپوننت میکروفن در مرکز */}
      <Microphone />

      {/* کامپوننت uploader (با تب‌ها برای ضبط و آپلود و لینک) */}
      <Uploader />

      {/* کامپوننت Goftar */}
      <Goftar />
    </main>
  );
}

export default Main;
