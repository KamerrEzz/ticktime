import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface CountdownProps {
  origen: string;
  date: string;
  time: string;
  selectedTimezone: string;
}

export function CountDown({ origen, date, time, selectedTimezone }: CountdownProps) {
  const [remainingTime, setRemainingTime] = useState("Cargando...");

  useEffect(() => {
    const targetTime = moment.tz(`${date} ${time}`, "YYYY-MM-DD HH:mm", origen);
    
    if (!targetTime.isValid()) {
      setRemainingTime("Fecha/hora inválida");
      return;
    }

    const updateCountdown = () => {
      const now = moment.tz(selectedTimezone);
      const diff = targetTime.diff(now);
      
      if (diff <= 0) {
        setRemainingTime("TERMINADO");
        return;
      }

      const duration = moment.duration(diff);
      const days = Math.floor(duration.asDays());
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");

      setRemainingTime(
        days > 0 
          ? `${days} días ${hours}:${minutes}:${seconds}`
          : `${hours}:${minutes}:${seconds}`
      );
    };

    updateCountdown(); // Ejecución inmediata inicial
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, [origen, date, time, selectedTimezone]);

  return (
    <div>
      <h1 className="text-center text-7xl font-bold">{remainingTime}</h1>
      <p className="text-xs opacity-50 text-center">
        Hora del navegador: {selectedTimezone}
      </p>
    </div>
  );
}