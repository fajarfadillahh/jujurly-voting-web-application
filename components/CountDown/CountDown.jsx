import Countdown from "react-countdown";
import CountDownRenderer from "./CountDownRenderer";

export default function CountDown() {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    return (
      <CountDownRenderer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  };

  return (
    <div className="grid justify-items-center gap-2">
      <p className="section-text">Voting akan berakhir dalam:</p>
      <Countdown date={Date.now() + 150000000} renderer={renderer} />
    </div>
  );
}
