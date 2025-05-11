import DropdownMenu from "./DropdownMenu";
import UserIcon from "../assets/icons/UserIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import Button from "./Button";

export default function UserMenu({ onLogout }) {
  return (
    <DropdownMenu label="مهمان" icon={<UserIcon />}>
      <Button
        onClick={onLogout}
        className="flex items-center justify-start gap-2 hover:bg-gray-100"
      >
        <LogoutIcon />
        خروج
      </Button>
    </DropdownMenu>
  );
}
