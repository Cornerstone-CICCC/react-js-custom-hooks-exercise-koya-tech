import { useState, useEffect } from "react";

function getTimeValue<T extends string>(type: "hour" | "day"): T {
  const now = new Date();
  if (type === "hour") {
    return now.getHours().toString() as T;
  } else if (type === "day") {
    return now.toLocaleDateString(undefined, { weekday: "long" }) as T;
  }
  throw new Error("Invalid type");
}

export function useTime<T extends string>(type: "hour" | "day"): T {
  const [value, setValue] = useState<T>(() => getTimeValue<T>(type));

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(getTimeValue<T>(type));
    }, 1000 * 60); // update every minute
    return () => clearInterval(interval);
  }, [type]);

  return value;
}
