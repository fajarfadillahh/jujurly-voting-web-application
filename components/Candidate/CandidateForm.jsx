import { useEffect, useState } from "react";
import { HiOutlineX } from "react-icons/hi";

// import components
import Form from "../Form";

export default function CandidateForm({
  candidate,
  submitCandidate,
  removeCandidateForm,
}) {
  const [isCandidate, setIsCandidate] = useState({
    key: 0,
    name: "",
  });

  useEffect(() => {
    setIsCandidate(candidate);
  }, [candidate]);

  useEffect(() => {
    submitCandidate(isCandidate);
  }, [isCandidate]);

  return (
    <div className="relative grid w-[300px] justify-items-center gap-8 border-[2px] border-black/10 p-5">
      <div
        className="absolute right-2 top-2 cursor-pointer p-1 text-[20px] text-black/40 hover:bg-black/10"
        onClick={() => removeCandidateForm(isCandidate.key)}
      >
        <HiOutlineX />
      </div>

      <div className="flex aspect-square w-16 items-center justify-center rounded-full bg-black/10 text-[24px] font-bold text-black">
        {candidate.key}
      </div>

      <div className="grid gap-2">
        <label className="text-[18px] font-semibold text-black">
          Nama Kandidat
        </label>
        <Form
          type="text"
          placeholder="Masukkan Nama Kandidat"
          className="w-full"
          value={isCandidate.name}
          onChange={(e) => {
            setIsCandidate({ ...isCandidate, name: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
