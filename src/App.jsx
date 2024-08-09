import Header from "./components/Header";
import Meals from "./components/Meals";
import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../src/https.js";
import { CartContextProvider } from "./store/CarContext";
import { existingCartItem, removeCartItem } from "./utils/ItemQuantity.js";

function App() {
  const [meals, setAvailableMeals] = useState([]);
  const [error, setError] = useState("");
  const [cartMeals, setCartMeals] = useState([]);

  function handleAddMeal(meal) {
    setCartMeals((prevMeals) => existingCartItem(meal, prevMeals));
  }

  function handleRemoveMeal(meal) {
    setCartMeals((prevMeals) => removeCartItem(meal, prevMeals));
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
      <Header cartMeals={cartMeals} onRemoveMeal={handleRemoveMeal} />
      <Meals meals={meals} onSelectMeal={handleAddMeal} />
    </>
  );
}

export default App;
