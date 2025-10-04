import React, { useEffect, useState, useRef } from "react";
import Spinner from "../../components/Spinner.jsx";
import Card from "../../components/Card.jsx";
import { ChefHat } from "lucide-react";

const SearchResults = ({ searchTerm }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const debounceDelay = 500;
  const debounceTimerRef = useRef(null);

  // Debounce the incoming searchTerm into debouncedTerm
  useEffect(() => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchTerm) {
      // If search term is empty, reset immediately
      setDebouncedTerm("");
      setMeals([]);
      setLoading(false);
      return;
    }

    // User has typed something: clear previous results and show loading immediately
    setMeals([]);
    setLoading(true);

    // Schedule the debounced term update
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, debounceDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm]);

  // Fetch whenever debouncedTerm changes. Use AbortController and a local active flag
  // so only the latest fetch updates component state.
  useEffect(() => {
    if (!debouncedTerm) {
      // nothing to fetch
      return;
    }

    let active = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            debouncedTerm
          )}`,
          { signal }
        );

        if (!active) return;

        const data = await response.json();

        if (!active) return;

        setMeals(data.meals || []);
      } catch (error) {
        if (error.name === "AbortError") {
          // request was aborted - ignore
          return;
        }
        console.error("Error fetching search results:", error);
        if (active) {
          setMeals([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();

    return () => {
      active = false;
      controller.abort();
    };
  }, [debouncedTerm]);

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

    if (loading) {
      return <Spinner />;
    }

    if (!meals || meals.length === 0) {
      return <p className="text-center mt-6">No results found.</p>;
    }

    return (
      <div
        className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 transition-opacity duration-500 opacity-100`}
      >
        {meals.map((meal) => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    );
  };

  return renderContent();
};

export default SearchResults;
