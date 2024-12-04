import { useRef, useState } from "react";
import { timezoneData } from "../utils/timezoneData";

export function Form({ send }: {send: any}) {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const inputDay = useRef<any>();
  const inputHours = useRef<any>();

  const handleCreateCountdown = () => {
    if (!selectedTimezone || !date || !time)
      return alert("Completa todos los campos");
    const newUrl = `${window.location.pathname}?origen=${selectedTimezone}&date=${date}&time=${time}`;
    window.history.pushState(null, "", newUrl);
    send(true)
  };

  return (
    <div className="flex flex-col gap-4 text-center">
      <h1 className="text-center">Crear Contador</h1>
      <select
        className="rounded-md appearance-none bg-[#14161C] border-none outline-none cursor-pointer w-full pr-4 pl-8 py-2 text-white"
        onChange={(e) => setSelectedTimezone(e.target.value)}
        value={selectedTimezone}
      >
        <option value="">Selecciona una zona horaria</option>
        {timezoneData.map((country, index) => (
          <optgroup key={index} label={`${country.emoji} ${country.name}`}>
            {country.timezones.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <button
        onClick={() => inputDay.current.showPicker()}
        className="bg-[#14161C] px-4 py-2 rounded-md text-white flex gap-3 items-center cursor-pointer"
      >
        <input
          ref={inputDay}
          className="bg-transparent outline-none cursor-pointer w-full"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </button>
      <button
        onClick={() => inputHours.current.showPicker()}
        className="bg-[#14161C] px-4 py-2 rounded-md text-white flex gap-3 items-center cursor-pointer"
      >
        <input
          ref={inputHours}
          className="bg-transparent outline-none cursor-pointer w-full"
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
      </button>
      <button
        className="bg-[#28328A] px-4 py-2 h-10 rounded-md text-white flex justify-center items-center gap-2 text-center"
        onClick={handleCreateCountdown}
      >
        Crear Contador
      </button>
    </div>
  );
}
