import { useEffect, useState } from "react";
import dayjs from "dayjs";

const Clock = () => {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const id = setInterval(() => setNow(dayjs()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  return <span>{now.format("ddd MMM D")}&nbsp;&nbsp;{now.format("h:mm A")}</span>;
};

export default Clock;
