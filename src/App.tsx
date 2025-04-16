import { useEffect, useState } from "react";
import moment from "moment-timezone";
import { CountDown } from "./components/Countdown";
import { Form } from "./components/Form";

interface CountdownParams {
  origen: string;
  date: string;
  time: string;
}

function App() {
  const [countdownParams, setCountdownParams] = useState<CountdownParams | null>(null);
  const [selectedTimezone] = useState(moment.tz.guess());

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const origen = searchParams.get("origen");
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (origen && date && time) {
      setCountdownParams({ origen, date, time });
    }
  }, []);

  const handleFormSubmit = (params: CountdownParams) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value);
    });
    window.history.pushState(null, '', `?${searchParams.toString()}`);
    setCountdownParams(params);
  };

  return (
    <div className="max-w-5xl h-screen m-auto py-4 px-4 lg:px-0">
      {!countdownParams ? (
        <div className="w-full h-full flex justify-center items-center">
          <Form onSubmit={handleFormSubmit} />
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <CountDown
            {...countdownParams}
            selectedTimezone={selectedTimezone}
          />
        </div>
      )}
    </div>
  );
}

export default App;