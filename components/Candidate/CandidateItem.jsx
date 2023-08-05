import { HiCheck } from "react-icons/hi";

export default function CandidateItem() {
  return (
    <div className="flex w-[820px] items-center justify-between border-[2px] border-black/10 p-8">
      <div className="grid gap-4">
        <div className="inline-flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center bg-black/10 text-[18px] font-bold text-black">
            1
          </div>
          <span className="text-[24px] font-bold text-black">
            Nama kandidat
          </span>
        </div>

        <div className="inline-flex items-center gap-8">
          <div className="relative h-[6px] w-[550px] rounded-full bg-black/10">
            <div className="absolute left-0 top-0 h-full w-[50%] rounded-full bg-black" />
          </div>
          <span className="text-[18px] font-semibold text-black">50%</span>
        </div>
      </div>

      <div className="inline-flex h-16 w-16 cursor-pointer items-center justify-center bg-black/10 transition-all hover:bg-black/20">
        <HiCheck className="text-[32px] text-black" />
      </div>
    </div>
  );
}
