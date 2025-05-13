export default function Button({
  onClick,
  children,
  className = "",
  type = "button",
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-full px-4 py-2 ${className}`}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
