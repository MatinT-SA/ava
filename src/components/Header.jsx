import UserMenu from "./UserMenu";

function Header() {
  const handleLogout = () => {
    console.log("خروج کلیک شد");
    // اینجا می‌تونی منطق لاگ‌اوت رو پیاده‌سازی کنی
  };

  return (
    <header className="flex items-center justify-end bg-white px-14 pt-12">
      <UserMenu onLogout={handleLogout} />
    </header>
  );
}

export default Header;
