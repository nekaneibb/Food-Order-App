import logo from "../assets/logo.jpg";
import UserProgressContext from "../store/UsersProgressContext";
import Cart from "./Cart";
import Modal from "./Modal";
import Button from "./UI/Button";
import { useState, useContext } from "react";

export default function Header({ cartMeals, onRemoveMeal, onAddMeal }) {
  const userProgressCtx = useContext(UserProgressContext);

  function cartQuantity() {
    const totalCartQuantity = cartMeals.reduce((accumulator, meal) => {
      return accumulator + meal.quantity;
    }, 0);

    return totalCartQuantity;
  }

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>Food Cart</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({cartQuantity()})
        </Button>
      </nav>
    </header>
  );
}
