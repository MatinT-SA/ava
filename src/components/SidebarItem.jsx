import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:bg-sidebar-item-hover flex cursor-pointer items-center justify-start gap-4 rounded-md py-2.5 pr-5 ${
          isActive ? "bg-sidebar-item-active text-white" : ""
        }`
      }
    >
      <Icon />
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;
