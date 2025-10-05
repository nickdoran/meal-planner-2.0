import { Link, useNavigate } from "react-router-dom";
import "./DayCard.css";
import { PlaneLanding } from "lucide-react";
import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const DayCard = ({ weekday }) => {
  const [planner, setPlanner] = useState({});
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const navigate = useNavigate();

  // Load planner from localStorage on mount
  useEffect(() => {
    const rawPlanner = localStorage.getItem("planner");
    const rawLastUpdated = localStorage.getItem("lastUpdated");

    const plannerData = rawPlanner ? JSON.parse(rawPlanner) : {}; // parsed planner

    const lastUpdated = rawLastUpdated ? new Date(rawLastUpdated) : null; // parsed date
    const today = new Date(); // today
    let toDeleteIndices = []; // to delete indices array

    if (lastUpdated) {
      const msInADay = 1000 * 60 * 60 * 24; // Milliseconds in a day
      const dayDifference = Math.floor((today - lastUpdated) / msInADay);

      if (dayDifference >= 7) {
        // If more than 7 days have passed, clear the entire planner
        console.log(
          "More than a week has passed. Clearing the entire planner."
        );
        localStorage.removeItem("planner");
        setPlanner({});
      } else {
        const todaysDay = today.getDay();
        const lastUpdatedDay = lastUpdated.getDay();

        console.log(lastUpdatedDay);
        console.log("Today", todaysDay);

        let i = lastUpdatedDay;
        while (i != todaysDay) {
          toDeleteIndices.push(i);
          i = (i + 1) % 7;
        }
        toDeleteIndices.forEach((dayIndex) => {
          const dayName = dayNames[dayIndex];
          if (plannerData[dayName]) delete plannerData[dayName];
        });

        localStorage.setItem("planner", JSON.stringify(plannerData));
        setPlanner(plannerData);
      }
    } else {
      console.log("No lastUpdated found. Initializing planner.");
      setPlanner(plannerData);
    }
  }, []);

  const addMealHandle = (day, section) => {
    navigate(`/search?day=${day}&section=${section}`);
  };

  const handleDelete = (day, section) => {
    setPlanner((prevPlanner) => {
      const updatedPlanner = { ...prevPlanner };
      if (updatedPlanner[day]) {
        delete updatedPlanner[day][section];
      }
      // Update localStorage
      localStorage.setItem("planner", JSON.stringify(updatedPlanner));
      return updatedPlanner;
    });
  };

  const renderMealSection = (section) => {
    const curDay = dayNames[weekday.getDay()];
    const curObj = planner[curDay]?.[section];

    if (curObj) {
      console.log(curObj.strMeal);
      console.log(curObj);
      return (
        <Link
          className="bg-white hover:scale-[1.05] transition-all duration-400"
          to={`/mealdetails/${curObj.strMeal}`} // * need meal ID
        >
          <div className="border-2 border-emerald-500 flex flex-col items-start rounded-2xl py-2.5 px-3 ">
            <span className="text-xs px-2 py-1 rounded-2xl bg-emerald-200 text-emerald-700 mb-2.5">
              {section}
            </span>
            <img
              className="h-16 w-full object-cover rounded-md mb-4"
              src={curObj.strMealThumb}
              alt={`Image of ${curObj.strMeal}`}
            />
            <div className="flex justify-between items-end w-full">
              <div>
                <h6 className="text-black font-semibold">{curObj.strMeal}</h6>
                <p className="text-gray-300 text-xs">
                  {curObj.strArea} · {curObj.strCategory}
                </p>
              </div>
              <button
                className="text-black"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the click from bubbling up to the Link
                  e.preventDefault();
                  handleDelete(curDay, section);
                }}
              >
                <X
                  size={20}
                  className="text-gray-400 transition-color duration-200 p-1.5 rounded-2xl box-content   bg-[hsl(111,100%,99%)] hover:bg-red-100 hover:text-red-400"
                />
              </button>
            </div>
          </div>
        </Link>
      );
    } else {
      return (
        <button
          className="group"
          onClick={() => {
            addMealHandle(dayNames[weekday.getDay()], section);
          }}
        >
          <div className="border-2 flex flex-col items-center justify-center border-gray-300 text-center py-3 px-8 rounded-2xl border-dashed hover:border-emerald-400 transition-all duration-400 hover:scale-[1.02] relative min-h-[60px]">
            {/* Text with custom transition */}
            <p className="text-gray-400 add-text">Add a {section}</p>

            {/* Plus icon with custom transition */}
            <Plus
              className="text-gray-300 absolute flex items-center justify-center add-icon"
              size={25}
              strokeWidth={2.5}
            />
          </div>
        </button>
      );
    }
  };

  return (
    <div className="flex flex-col p-4 bg-[hsl(111,100%,99%)] rounded-2xl shadow-2xl h-full">
      <h3 className="mb-3 text-black">{dayNames[weekday.getDay()]}</h3>
      <div className="flex flex-col gap-2">
        {["breakfast", "lunch", "dinner"].map((section) => {
          return renderMealSection(section);
        })}
      </div>
    </div>
  );
};

export default DayCard;
