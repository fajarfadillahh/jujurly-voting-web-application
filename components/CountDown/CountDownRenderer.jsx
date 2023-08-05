// import components
import CountDownItem from "./CountDownItem";

export default function CountDownRenderer({ days, hours, minutes, seconds }) {
  return (
    <div className="inline-flex items-center">
      <CountDownItem label="Hari" value={days} />
      <CountDownItem label="Jam" value={hours} />
      <CountDownItem label="Menit" value={minutes} />
      <CountDownItem label="Detik" value={seconds} />
    </div>
  );
}
