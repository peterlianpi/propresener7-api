import { useEffect, useState } from "react";
import { useProPresenterData } from "../../libs/ProPresenterDataProvider";

function ConnectionNotification() {
  const { connected, retryCount, maxRetries, retryInterval } =
    useProPresenterData();
  const [retryCountdown, setRetryCountdown] = useState(null);

  console.log("Connected : ", connected);

  useEffect(() => {
    let interval;
    if (connected && retryCount < maxRetries) {
      // Start countdown if not connected
      let count = retryInterval / 1000;
      interval = setInterval(() => {
        count--;
        setRetryCountdown(count);
        if (count === 0) clearInterval(interval);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [connected, maxRetries, retryCount, retryInterval]);

  if (connected) {
    return (
      <div className="py-2 text-center text-white bg-red-500">
        {retryCountdown !== null
          ? `Connecting...${retryCountdown}s (Retry ${
              retryCount + 1
            }/${maxRetries})`
          : "Try Again..."}
        {retryCountdown !== null &&
          Array.from({ length: retryCountdown }, (_, i) => i + 1).map((num) => (
            <span key={num}> {num}</span>
          ))}
      </div>
    );
  } else {
    return null;
  }
}

export default ConnectionNotification;
