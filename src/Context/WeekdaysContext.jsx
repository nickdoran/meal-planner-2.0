import { createContext, useState, useMemo, useEffect } from "react";

// Create the context
const WeekdaysContext = createContext();

// Context provider component
export const WeekdaysProvider = ({ children }) => {
  const [weekdays, setWeekdays] = useState([]);
  useEffect(() => {
    const today = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    setWeekdays(dates);
  }, [setWeekdays]);

  // Memoize the context value to ensure stability
  const value = useMemo(() => ({ weekdays, setWeekdays }), [weekdays]);

  return (
    <WeekdaysContext.Provider value={value}>
      {children}
    </WeekdaysContext.Provider>
  );
};

// Export the context itself for use in the custom hook
export default WeekdaysContext;
