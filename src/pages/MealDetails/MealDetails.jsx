import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);
  return <div>MealDetails</div>;
};

export default MealDetails;
