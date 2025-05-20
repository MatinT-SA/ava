import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mt-12 text-center">
      <h1 className="mb-4 text-4xl text-red-600">صفحه مورد نظر پیدا نشد!</h1>
      <p className="mb-6 text-lg text-gray-500">
        متاسفانه صفحه‌ای که دنبال آن بودید وجود ندارد.
      </p>
      <Link
        to="/"
        className="text-xl text-blue-500 no-underline hover:underline"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFound;
