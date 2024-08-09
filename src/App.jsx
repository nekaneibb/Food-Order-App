import Header from "./components/Header";
import Meals from "./components/Meals";
import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../src/https.js";
import { CartContextProvider } from './store/CarContext'

function App() {
  const [meals, setAvailableMeals] = useState([]);
  const [error, setError] = useState("");
  const [addedMeals, setAddedMeals] = useState([]);

  function handleAddMeal(meal) {
    setAddedMeals((prevMeals) => {
      if (!Array.isArray(prevMeals)) {
        console.error("prevMeals is not an array:", prevMeals);
        return [meal];
      }

      return [...prevMeals, meal];
    });
  }

  function handleRemoveMeal(mealId) {
    setAddedMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
  }

  useEffect(() => {
    async function fetchMeals() {
      try {
        const availableMeals = await fetchAvailableMeals();
        setAvailableMeals(availableMeals);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch meals" });
      }
    }
    fetchMeals();
  }, []);

  return (
    <>
      <Header cartMeals={addedMeals} onRemoveMeal={handleRemoveMeal}/>
      <Meals meals={meals} onSelectMeal={handleAddMeal} />
      <p>Don't worry - we've all been there. Let's build it together!</p>
    </>
  );
}

export default App;
