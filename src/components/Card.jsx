import React, { useEffect, useState } from "react";
import Star from "./Star";
import "./Card.css";
import { useSearchParams, useNavigate } from "react-router-dom";

const Card = ({ meal }) => {
  const [visible, setVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const day = searchParams.get("day");
  const section = searchParams.get("section");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (searchParams) {
      if (!day || !section) {
        console.warn("Cannot add meal: missing queries");
        return;
      }
      const raw = localStorage.getItem("planner");
      const plannerData = raw ? JSON.parse(raw) : {};

      if (!plannerData[day]) plannerData[day] = {};
      plannerData[day][section] = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
      };
      localStorage.setItem("planner", JSON.stringify(plannerData));
      localStorage.setItem("lastUpdated", new Date().toISOString());

      navigate(`/planner`);
    } //TODO: add implementation for the case of no queries.
  };

  useEffect(() => {
    // Trigger fade-in after mount
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div
      className={`card-transition transform rounded-2xl shadow-lg flex flex-col justify-start items-start bg-transparent ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        loading="lazy"
        className="w-full rounded-t-2xl border-b-emerald-500 border-4 border-x-[335145] border-x-transparent border-t-transparent"
      />
      <div className="w-full bg-slate-100 rounded-b-2xl flex-1 flex flex-col justify-between">
        <div className=" flex w-full justify-between items-end px-4 pt-0.5 pb-4">
          <div>
            <h3 className="font-bold text-black">{meal.strMeal}</h3>
            <p className="text-sm text-gray-400">
              {meal.strCategory} · {meal.strArea}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between items-end px-3 pb-3 rounded-b-2xl">
          <button
            onClick={() => {
              handleAdd();
            }}
            className="bg-emerald-900 text-white rounded-lg py-2 px-4 hover:bg-emerald-800 trnsition-color duration-200"
          >
            Add to Planner
          </button>
          <Star className="w-8 h-8 stroke-yellow-500 fill-none hover:fill-yellow-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Card;
