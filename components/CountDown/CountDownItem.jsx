import { zeroPad } from "react-countdown";

export default function CountDownItem({ value, label }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <span className="-mb-2 text-[48px] font-bold text-black dark:text-white">
          {zeroPad(value, 2)}
        </span>
        <span className="text-[14px] font-medium text-black dark:text-white">
          {label}
        </span>
      </div>
      {label !== "Detik" && (
        <span className="mx-3 text-[32px] font-medium">:</span>
      )}
    </div>
  );
}
