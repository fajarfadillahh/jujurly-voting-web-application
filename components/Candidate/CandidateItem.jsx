import { HiCheck } from "react-icons/hi";

export default function CandidateItem({ name, percentage, index }) {
  return (
    <div className="flex w-[820px] items-center justify-between border-[2px] border-black/10 p-8">
      <div className="grid gap-4">
        <div className="inline-flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center bg-black/10 text-[18px] font-bold text-black">
            {index + 1}
          </div>
          <span className="text-[24px] font-bold text-black">{name}</span>
        </div>

        <div className="inline-flex items-center gap-8">
          <div className="relative h-[6px] w-[550px] rounded-full bg-black/10">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-black"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-[18px] font-semibold text-black">
            {percentage}%
          </span>
        </div>
      </div>

      <div className="group inline-flex h-16 w-16 cursor-pointer items-center justify-center bg-black/10 transition hover:bg-black">
        <HiCheck className="text-[32px] text-black group-hover:text-white" />
      </div>
    </div>
  );
}