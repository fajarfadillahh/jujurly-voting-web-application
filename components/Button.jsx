export default function Button({ text, className, variant, type }) {
  let baseStyle =
    "inline-flex justify-center items-center h-[48px] px-10 font-semibold transition-all duration-300";

  if (variant === "fill") {
    baseStyle += " bg-black text-white hover:bg-black/90";
  } else if (variant === "stroke") {
    baseStyle +=
      " bg-transparent border-2 border-black text-black hover:bg-black hover:text-white";
  }

  // testing button
  const clicked = () => {
    alert("clicked");
  };

  return (
    <button
      className={`${baseStyle} ${variant} ${className}`}
      type={type}
      onClick={clicked}
    >
      {text}
    </button>
  );
}
