export default function Button({ text, className, variant, type, onClick }) {
  let baseStyle =
    "inline-flex justify-center items-center h-[48px] px-10 font-semibold transition-all duration-300";

  if (variant === "fill") {
    baseStyle += " bg-black text-white hover:bg-black/90";
  } else if (variant === "stroke") {
    baseStyle +=
      " bg-transparent border-[3px] border-black text-black hover:bg-black hover:text-white";
  }

  return (
    <button
      className={`${baseStyle} border ${className}`}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
