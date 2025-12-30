import { useEffect, useState } from "react";

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="font-mono text-sm text-muted-foreground">
      <span className="text-foreground tabular-nums">{formatTime(time)}</span>
      <span className="mx-2">·</span>
      <span>New York, NY</span>
    </div>
  );
}
