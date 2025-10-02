import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner.jsx";
import Card from "../../components/Card.jsx";

const SearchResults = ({ searchTerm }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchSearchResults = async (query = "") => {
    setLoading(true);
    setVisible(false);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      console.log(data);
      setMeals(data.meals);
    } catch (error) {
      console.error("We could not fetch the data", error);
    } finally {
      setLoading(false);
      setTimeout(() => setVisible(true), 100); // slight delay for fade-in
    }
  };

  useEffect(() => {
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
      <div
        className={`mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
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
