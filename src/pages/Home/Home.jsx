import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div className="flex mt-12 h-[70vh]">
        <div className="w-1/2 flex justify-center items-center">
          <div className=" flex justify-center items-start flex-col">
            <h1 className="text-[clamp(2rem,6vw,4rem)]">
              Perfect your meal Schedule
            </h1>
            <p className="text-gray-300 mb-5">
              Dynamically change your meal planning with meal planner.{" "}
            </p>
            <Link
              to={"/planner"}
              className="bg-emerald-700 font-semibold text-lg py-2.5 px-3.5 rounded-2xl text-white
          "
            >
              Start Planning
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="relative w-full max-w-full aspect-[2.6566037736/1]">
            {/* Background solid box */}
            <div className="absolute inset-0 w-full h-full bg-emerald-700 rounded-2xl translate-x-4 translate-y-4"></div>

            {/* Foreground image card */}
            <div className="relative w-full h-full bg-white rounded-lg shadow-xl overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src="/Hero.png"
                alt="hero-section-picture"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
