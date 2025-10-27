import React, { useEffect, useState } from "react";
import { PlaneLanding, X } from "lucide-react";
import DayCard from "../../components/DayCard";
import { useWeekdays } from "../../Context/useWeekdays.js";

const Modal = ({ onClose, meal }) => {
  const { weekdays } = useWeekdays();
  const [isVisable, setIsVisable] = useState(false);
  const isModal = true;

  useEffect(() => {
    setIsVisable(true);
  }, []);
  const handleModalButton = (day, section) => {
    const raw = localStorage.getItem("planner");
    const data = raw ? JSON.parse(raw) : {};
    if (!data[day]) {
      data[day] = {};
    }
    data[day][section] = {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
    };
    localStorage.setItem("planner", JSON.stringify(data));
    localStorage.setItem("lastUpdated", new Date().toISOString());
    onClose();
  };

  return (
    <div
      className={`fixed flex justify-center items-center w-screen h-screen p-16 bg-[#000000a2] top-0 left-0 transistion-opacity duration-400 ${
        isVisable ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="rounded-2xl p-6 bg-[#f4f3f3] shadow-lg pb-8">
        <button className="w-full flex justify-end" onClick={onClose}>
          <X />
        </button>
        <h2 className="leading-10 text-black text-center mb-3">
          Add your meal to a day
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Select a meal section for the day you wish to add to. 🍔
        </p>
        <ul className="flex justify-center gap-4  px-9">
          {weekdays.map((weekday) => {
            return (
              <li className="flex-1" key={weekday}>
                <DayCard
                  isModal={isModal}
                  weekday={weekday}
                  handleModalButton={handleModalButton}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
