export default function Form({
  type,
  placeholder,
  className,
  onChange,
  value,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`flex h-[48px] bg-black/10 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-semibold placeholder:text-black/60 ${className} dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500`}
      onChange={onChange}
      value={value}
    />
  );
}
