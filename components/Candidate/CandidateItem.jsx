import { HiCheck } from "react-icons/hi";

export default function CandidateItem({
  candidate,
  index,
  isSelected,
  onClick,
  isAvailable,
}) {
  return (
    <div className="flex w-full flex-col gap-6 border-[2px] border-black/10 p-8 dark:border-zinc-700 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
      <div className="flex w-full flex-col gap-4">
        <div className="inline-flex items-start gap-4">
          <div className="flex h-8 w-8 items-center justify-center bg-black/10 text-[18px] font-bold text-black dark:bg-zinc-800 dark:text-white">
            {index + 1}
          </div>
          <div className="inline-flex flex-col gap-1">
            <span className="text-[24px] font-bold text-black dark:text-white">
              {candidate.name}
            </span>
            <span className="font-medium text-black dark:text-white">
              Kandidat / Opsi {index + 1}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="relative flex h-[6px] w-full rounded-full bg-black/10 dark:bg-zinc-800">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-black dark:bg-zinc-500"
              style={{ width: `${candidate.percentage}%` }}
            />
          </div>
          <span className="text-[18px] font-semibold text-black dark:text-white">
            {candidate.percentage}%
          </span>
        </div>
      </div>

      {isAvailable ? (
        <div
          className={`group inline-flex h-16 w-full cursor-pointer items-center justify-center text-[32px] sm:w-16 ${
            isSelected
              ? "bg-black text-white dark:bg-white dark:text-zinc-900"
              : "bg-black/10 text-black hover:bg-black/20 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
          }`}
          onClick={onClick}
        >
          <HiCheck />
        </div>
      ) : null}
    </div>
  );
}
