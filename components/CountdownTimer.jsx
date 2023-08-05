export default function CountdownTimer() {
  return (
    <div className="grid gap-2">
      <p className="section-text">Voting akan berakhir pada :</p>
      <div className="inline-flex items-center justify-center gap-5">
        <div className="grid justify-items-center">
          <span className="-mb-2 text-[48px] font-bold text-black">37</span>
          <span className="text-[14px] font-medium text-black">Jam</span>
        </div>
        <span className="text-[32px] font-medium">:</span>
        <div className="grid justify-items-center">
          <span className="-mb-2 text-[48px] font-bold text-black">24</span>
          <span className="text-[14px] font-medium text-black">Menit</span>
        </div>
        <span className="text-[32px] font-medium">:</span>
        <div className="grid justify-items-center">
          <span className="-mb-2 text-[48px] font-bold text-black">56</span>
          <span className="text-[14px] font-medium text-black">Detik</span>
        </div>
      </div>
    </div>
  );
}
