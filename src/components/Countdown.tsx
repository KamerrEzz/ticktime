import { useEffect } from "react";
import moment from "moment-timezone";
// import { timezoneData } from "../utils/timezoneData";

export function CountDown({
  origen,
  date,
  time,
  selectedTimezone,
  setRemainingTime,
  remainingTime,
}: {
  origen: any;
  date: any;
  time: any;
  selectedTimezone: any;
  setRemainingTime: any;
  remainingTime: any;
}) {
  useEffect(() => {
    if (origen && date && time) {
      const updateCountdown = () => {
        const targetTime = moment.tz(
          `${date} ${time}`,
          "YYYY-MM-DD HH:mm",
          origen
        );
        if (!targetTime.isValid()) {
          console.error("Fecha y hora objetivo inválidas");
          return;
        }

        const now = moment.tz(selectedTimezone);
        const diff = targetTime.valueOf() - now.valueOf();

        if (diff <= 0) {
          setRemainingTime("TERMINADO");
        } else {
          const duration = moment.duration(diff);
          const days = Math.floor(duration.asDays());
          const hours = String(duration.hours()).padStart(2, "0");
          const minutes = String(duration.minutes()).padStart(2, "0");
          const seconds = String(duration.seconds()).padStart(2, "0");

          const timeString =
            days > 0
              ? `${days} días ${hours}:${minutes}:${seconds}`
              : `${hours}:${minutes}:${seconds}`;
          setRemainingTime(timeString);
        }
      };
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedTimezone]);

  return (
    <div>
      <h1 className="text-center text-7xl font-bold">{remainingTime}</h1>
      <p className="text-xs opacity-50 text-center">Hora del navegador: {selectedTimezone}</p>
      {/* <select
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
      </select> */}
    </div>
  );
}
