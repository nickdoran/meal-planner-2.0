import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner.jsx";
import Card from "../../components/Card.jsx";
import { ChefHat } from "lucide-react";

const SearchResults = ({ searchTerm }) => {
  const [state, setState] = useState({ meals: [], loading: false });
  const [showCards, setShowCards] = useState(false);

  const fetchSearchResults = async (query = "") => {
    setState((prev) => ({ ...prev, loading: true }));
    setShowCards(false);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setTimeout(() => {
        setState({ meals: data.meals || [], loading: false });
        setShowCards(true);
      }, 500);
    } catch (error) {
      console.error("We could not fetch the data", error);
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (!searchTerm) return;
    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  const renderContent = () => {
    if (!searchTerm) {
      return (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="bg-slate-900/20 backdrop-blur-2xl rounded-4xl max-w-[1052px] w-full h-[512px] mx-4 flex flex-col items-center justify-center">
            <ChefHat
              className="w-16 h-16 text-slate-300 mb-3"
              strokeWidth={1}
            />
            <p className="text-center text-sm text-slate-300 font-light font-alan">
              Search for a meal!
              <br /> Tip: Try "Chicken", "Beef", or "Pasta"
            </p>
          </div>
        </div>
      );
    }
    if (state.loading) {
      return <Spinner />;
    }
    if (!state.meals || state.meals.length === 0) {
      return <p className="text-center mt-6 ">No results found.</p>;
    }
    return (
      <div
        className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 transition-opacity duration-500 ${
          showCards ? "opacity-100" : "opacity-0"
        }`}
      >
        {state.meals.map((meal) => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    );
  };

  return renderContent();
};

export default SearchResults;
