import { useEffect, useState } from "react";
import moment from "moment-timezone";

import { CountDown } from "./components/Countdown";
import { Form } from "./components/Form";

function App() {
  const [GUI, setGUI] = useState("FORM");
  const [remainingTime, setRemainingTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState(moment.tz.guess());
  const [origen, setOrigen] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    const origenParam = searchParams.get("origen");
    const dateParam = searchParams.get("date");
    const timeParam = searchParams.get("time");

    if (origenParam && dateParam && timeParam) {
      setOrigen(origenParam);
      setDate(dateParam);
      setTime(timeParam);
      setGUI("COUNTDOWN");
    }
  }, [GUI, created]);

  return (
    <div className="max-w-5xl h-screen m-auto py-4 px-4 lg:px-0">
      {GUI === "FORM" ? (
        <div className="w-full h-full flex justify-center items-center">
          <Form send={setCreated} />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <CountDown
            origen={origen}
            date={date}
            time={time}
            selectedTimezone={selectedTimezone}
            setRemainingTime={setRemainingTime}
            remainingTime={remainingTime}
          />
        </div>
      )}
    </div>
  );
}

export default App;
