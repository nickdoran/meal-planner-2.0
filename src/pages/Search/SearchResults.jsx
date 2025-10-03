import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner.jsx";
import Card from "../../components/Card.jsx";

const SearchResults = ({ searchTerm }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (query = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setMeals(data.meals);
    } catch (error) {
      console.error("We could not fetch the data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm) return; // Don't fetch if searchTerm is empty
    fetchSearchResults(searchTerm);
  }, [searchTerm]);

  const renderContent = () => {
    if (!searchTerm) {
      return null;
    }
    if (loading) {
      return <Spinner />;
    }
    if (!meals) {
      return <p className="text-center mt-6">No results found.</p>;
    }
    return (
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {meals.map((meal) => (
          <Card key={meal.idMeal} meal={meal} />
        ))}
      </div>
    );
  };

  return renderContent();
};

export default SearchResults;
