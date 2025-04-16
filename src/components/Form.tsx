import { useRef, useState, useMemo } from "react";
import { timezoneData } from "../utils/timezoneData";

interface FormProps {
  onSubmit: (params: { origen: string; date: string; time: string }) => void;
}

interface CountryTimezone {
  emoji: string;
  name: string;
  timezones: string[];
}

export function Form({ onSubmit }: FormProps) {
  const inputDayRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    origen: "",
    date: "",
    time: ""
  });
  const [errors, setErrors] = useState<string[]>([]);

  const timezoneOptions = useMemo(() => (
    timezoneData.map((country: CountryTimezone, index) => (
      <optgroup key={index} label={`${country.emoji} ${country.name}`}>
        {country.timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </optgroup>
    ))
  ), []);

  const validateForm = () => {
    const newErrors = [];
    if (!formData.origen) newErrors.push("timezone");
    if (!formData.date) newErrors.push("date");
    if (!formData.time) newErrors.push("time");
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    onSubmit({
      origen: formData.origen,
      date: formData.date,
      time: formData.time
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4">Crear Contador</h1>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="timezone" className="text-sm font-medium">
          Zona Horaria del Evento
        </label>
        <select
          id="timezone"
          className={`rounded-md bg-[#14161C] px-4 py-2 outline-none ${
            errors.includes("timezone") ? "border-2 border-red-500" : ""
          }`}
          value={formData.origen}
          onChange={(e) => setFormData({ ...formData, origen: e.target.value })}
        >
          <option value="">Selecciona una zona horaria</option>
          {timezoneOptions}
        </select>
        {errors.includes("timezone") && (
          <span className="text-red-500 text-sm">Selecciona una zona horaria</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Fecha y Hora del Evento</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              ref={inputDayRef}
              type="date"
              className={`w-full bg-[#14161C] px-4 py-2 rounded-md ${
                errors.includes("date") ? "border-2 border-red-500" : ""
              }`}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              onFocus={() => inputDayRef.current?.showPicker()}
            />
            {errors.includes("date") && (
              <span className="text-red-500 text-sm">Selecciona una fecha</span>
            )}
          </div>
          
          <div className="flex-1">
            <input
              ref={inputTimeRef}
              type="time"
              className={`w-full bg-[#14161C] px-4 py-2 rounded-md ${
                errors.includes("time") ? "border-2 border-red-500" : ""
              }`}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              onFocus={() => inputTimeRef.current?.showPicker()}
            />
            {errors.includes("time") && (
              <span className="text-red-500 text-sm">Selecciona una hora</span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-[#28328A] px-4 py-2 rounded-md text-white font-medium hover:bg-[#1f2661] transition-colors mt-4"
      >
        Crear Contador
      </button>
    </form>
  );
}