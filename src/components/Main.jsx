import React from "react";

function Main() {
  return (
    <main className="flex-1 p-6 pr-64">
      <h1 className="text-3xl font-bold mb-4">خوش آمدید به سایت ما!</h1>
      <p className="text-lg mb-6">
        در اینجا می‌توانید به راحتی به آرشیو پست‌ها، مقالات، و محتوای قدیمی
        دسترسی داشته باشید.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-3">محتواهای موجود:</h2>
        <ul className="list-disc pr-5 space-y-2 text-base">
          <li>
            <span className="text-blue-600 hover:underline cursor-pointer">
              آرشیو ورزشی
            </span>
          </li>
          <li>
            <span className="text-blue-600 hover:underline cursor-pointer">
              آرشیو موسیقی
            </span>
          </li>
          <li>
            <span className="text-blue-600 hover:underline cursor-pointer">
              آرشیو تکنولوژی
            </span>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Main;
