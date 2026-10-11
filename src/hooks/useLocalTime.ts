import { useEffect, useState } from 'react';
import { site } from '../data/profile';

const format = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date());

/** Current time in Addis Ababa, refreshed every 30 seconds. */
export function useLocalTime() {
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
