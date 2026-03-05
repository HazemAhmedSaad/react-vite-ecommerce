import { useEffect, useMemo, useState } from "react";

export default function OrderCountDown() {
  const [timeLeft, setTimeLeft] = useState(() => 2 * 60 * 60);
  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="order-time my-3">
      <i className="fa-solid fa-truck-fast me-1"></i>
      <span>Order within </span>
      <span className="fw-bold highlight-time">{formattedTime}</span>
      <span> to get </span>
      <span className="fw-bold highlight-delivery">Tomorrow</span>
    </div>
  );
}
