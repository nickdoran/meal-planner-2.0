import React, { useEffect, useState } from "react";
import Star from "./Star";
import "./Card.css";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Modal from "../pages/Search/Modal";

const Card = ({ meal }) => {
    const [visible, setVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchParams] = useSearchParams();
    const day = searchParams.get("day");
    const section = searchParams.get("section");
    const navigate = useNavigate();

    const onClose = () => {
        setShowModal(false);
    };

    const handleAdd = () => {
        if (day && section) {
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
        } else {
            setShowModal(true); // a flag to show if their should me a modal.
        }
    };

    useEffect(() => {
        // Trigger fade-in after mount
        setTimeout(() => setVisible(true), 50);
    }, []);

    return (
        <>
            <Link
                to={day ? "#" : `/mealdetails/${meal.idMeal}`}
                className={`group card-transition rounded-3xl shadow-md hover:shadow-2xl overflow-hidden bg-white border border-gray-100 flex flex-col transition-all duration-300 ${
                    visible ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {meal.strCategory}
                    </div>
                </div>

                <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-br from-white to-gray-50">
                    <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-200">
                            {meal.strMeal}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                {meal.strArea}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-200">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAdd();
                            }}
                            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl py-2.5 px-4 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Add to Planner
                        </button>
                        <Star
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                            }}
                            className="w-10 h-10 stroke-amber-400 fill-none hover:fill-amber-400 hover:scale-110 cursor-pointer transition-all duration-200"
                        />
                    </div>
                </div>
            </Link>
            {showModal && <Modal meal={meal} onClose={onClose} />}
        </>
    );
};

export default Card;
