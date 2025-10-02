import React from "react";
import Star from "./Star";

const Card = ({ meal }) => {
  return (
    <div
      className="border-1 border-emerald-900
      rounded-2xl shadow-md flex flex-col justify-start items-start gap-2 bg-[#3c6047]"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded-t-2xl"
      />

      <div className="flex w-full justify-between items-end px-4 pt-0.5 pb-4">
        <div>
          <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
          <p className="text-sm text-gray-300">
            {meal.strCategory} · {meal.strArea}
          </p>
        </div>
        <Star className="w-6 h-6 stroke-yellow-500 fill-none hover:fill-yellow-500 cursor-pointer" />
      </div>
    </div>
  );
};

export default Card;
