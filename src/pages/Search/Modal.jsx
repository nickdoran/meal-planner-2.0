import React from "react";
import { PlaneLanding, X } from "lucide-react";
import DayCard from "../../components/DayCard";

const Modal = ({ onClose, meal }) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const isModal = true;
  const handleModalButton = () => {};

  return (
    <div className="fixed flex justify-center items-center w-screen h-screen bg-[hsla(0,0%,0%,.2)] top-0 left-0">
      <div className="w-full bg-white">
        <button onClick={onClose}>
          <X />
        </button>
        {dayNames.map((dayName) => {
          return (
            <li key={dayName}>
              <DayCard
                dayName={dayName}
                isModal={isModal}
                handleModalButton={handleModalButton}
              />
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
