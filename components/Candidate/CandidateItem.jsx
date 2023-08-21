import { HiCheck } from "react-icons/hi";

export default function CandidateItem({
  candidate,
  index,
  isSelected,
  onClick,
  isAvailable,
}) {
  return (
    <div className="flex w-full items-center justify-between gap-12 border-[2px] border-black/10 p-8">
      <div className="flex w-full flex-col gap-4">
        <div className="inline-flex items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center bg-black/10 text-[18px] font-bold text-black">
            {index + 1}
          </div>
          <div className="inline-flex flex-col gap-1">
            <span className="text-[24px] font-bold text-black">
              {candidate.name}
            </span>
            <span className="font-medium text-black">Kandidat {index + 1}</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative flex h-[6px] w-full rounded-full bg-black/10">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-black"
              style={{ width: `${candidate.percentage}%` }}
            />
          </div>
          <span className="text-[18px] font-semibold text-black">
            {candidate.percentage}%
          </span>
        </div>
      </div>

      {isAvailable ? (
        <div
          className={`group inline-flex h-16 w-16 cursor-pointer items-center justify-center text-[32px] ${
            isSelected
              ? "bg-black text-white"
              : "bg-black/10 text-black hover:bg-black/20"
          }`}
          onClick={onClick}
        >
          <HiCheck />
        </div>
      ) : null}
    </div>
  );
}
