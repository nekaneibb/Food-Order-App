import Header from "./components/Header";
import Meals from "./components/Meals";
import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../src/https.js";
import { CartContextProvider } from "./store/CarContext";

function existingCartItem(meal, addedMeals) {
  const existingCartItemIndex = addedMeals.findIndex(
    (item) => item.id === meal.id
  );
  const updatedItems = [...addedMeals];

  if (existingCartItemIndex > -1) {
    const existingItem = updatedItems[existingCartItemIndex];

    const updatedItem = {
      ...existingItem,
      quantity: (existingItem.quantity || 0) + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    updatedItems.push({ ...meal, quantity: 1 });
  }

  return updatedItems;
}

function App() {
  const [meals, setAvailableMeals] = useState([]);
  const [error, setError] = useState("");
  const [cartMeals, setCartMeals] = useState([]);

  function handleAddMeal(meal) {
    setCartMeals((prevMeals) => existingCartItem(meal, prevMeals));
  }

  function handleRemoveMeal(mealId) {
    setCartMeals((prevMeals) =>
      prevMeals.filter((meal) => meal.id !== mealId)
    );
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
      <p>Don't worry - we've all been there. Let's build it together!</p>
    </>
  );
}

export default App;
