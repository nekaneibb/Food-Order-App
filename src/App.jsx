import Header from "./components/Header";
import Meals from "./components/Meals";
import { useEffect, useState, useContext } from "react";
import { fetchAvailableMeals } from "../src/https.js";
import { CartContextProvider } from "./store/CarContext";
import { existingCartItem, removeCartItem } from "./utils/ItemQuantity.js";
import { UserProgressContextProvider } from "./store/UsersProgressContext";
import UserProgressContext from "./store/UsersProgressContext";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";

function App() {
  const [meals, setAvailableMeals] = useState([]);
  const [error, setError] = useState("");
  const [cartMeals, setCartMeals] = useState([]);

  const userProgressCtx = useContext(UserProgressContext);

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
    <UserProgressContextProvider>
      <Header
        cartMeals={cartMeals}
        onRemoveMeal={handleRemoveMeal}
        onAddMeal={handleAddMeal}
      />
      <Meals meals={meals} onSelectMeal={handleAddMeal} />
      <Cart
        cartMeals={cartMeals}
        onRemoveMeal={handleRemoveMeal}
        onAddMeal={handleAddMeal}
      />

      {/* {userProgressCtx.progress === "checkout" && (
      )} */}
        <Checkout cartMeals={cartMeals} />
    </UserProgressContextProvider>
  );
}

export default App;
