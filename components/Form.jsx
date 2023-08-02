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
      className={`flex h-[48px] bg-black/5 px-8 text-[14px] font-bold text-black placeholder:font-sans placeholder:text-[14px] placeholder:font-medium ${className}`}
      onChange={onChange}
      value={value}
    />
  );
}
