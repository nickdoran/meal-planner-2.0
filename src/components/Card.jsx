import React from "react";
import Star from "./Star";

const Card = ({ meal }) => {
  return (
    <div
      className="
      rounded-2xl shadow-lg flex flex-col justify-start items-start gap-2 bg-slate-100 hover:scale-[1.02] transition-transform duration-200 ease-in-out"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-t-2xl"
      />

      <div className="flex w-full justify-between items-end px-4 pt-0.5 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-black">{meal.strMeal}</h2>
          <p className="text-sm text-gray-400">
            {meal.strCategory} · {meal.strArea}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between items-end px-3 pb-3">
        <button className="bg-emerald-900 text-white rounded-lg py-2 px-4 hover:bg-emerald-700">
          Add to Planner
        </button>
        <Star className="w-8 h-8 stroke-yellow-500 fill-none hover:fill-yellow-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Card;
