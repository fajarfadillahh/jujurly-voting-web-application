export default function Button({ text, className, variant, type, onClick }) {
  let baseStyle =
    "inline-flex justify-center items-center h-[48px] px-10 font-semibold transition";

  if (variant === "fill") {
    baseStyle +=
      " bg-black text-white hover:bg-black/10 hover:text-black dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-500";
  } else if (variant === "stroke") {
    baseStyle +=
      " bg-transparent border-[2px] border-black text-black hover:bg-black hover:text-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700";
  }

  return (
    <button
      className={`${baseStyle} ${className}`}
      variant={variant}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
