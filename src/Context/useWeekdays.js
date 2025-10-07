import { useContext } from "react";
import WeekdaysContext from "./WeekdaysContext";

// Custom hook to use the WeekdaysContext
export const useWeekdays = () => {
  const context = useContext(WeekdaysContext);
  if (!context) {
    throw new Error("useWeekdays must be used within a WeekdaysProvider");
  }
  return context;
};
