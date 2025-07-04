import Uploader from "./Uploader";

function Main() {
  return (
    <div className="mb-10 flex min-h-screen flex-col items-center justify-start space-y-3 bg-white px-4 text-center">
      <h1 className="text-3xl font-bold text-[#00BA9F]">تبدیل گفتار به متن</h1>

      <p className="text-custom-gray max-w-xl text-lg">
        آوا با استفاده از هزاران ساعت گفتار با صدای افراد مختلف، <br />
        زبان فارسی را یاد گرفته است و می‌تواند متن صحبت‌ها را بنویسد.
      </p>

      <Uploader />
    </div>
  );
}

export default Main;
