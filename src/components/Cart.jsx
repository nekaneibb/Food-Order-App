import UserProgressContext from "../store/UsersProgressContext";
import Checkout from "./Checkout.jsx";
import Modal from "./Modal";
import Button from "./UI/Button";
import { useContext } from "react";

export default function Cart({ cartMeals, onRemoveMeal, onAddMeal }) {
  const userProgressCtx = useContext(UserProgressContext);

  function cartTotalAmount() {
    const totalCart = cartMeals.reduce((accumulator, meal) => {
      return accumulator + parseFloat(meal.price) * meal.quantity;
    }, 0);

    return totalCart.toFixed(2);
  }

  function handleShowCheckout() {
    userProgressCtx.showCheckout();
  }

  function handleHideCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2> This is your cart</h2>
      {cartMeals.length > 0 ? (
        <ul>
          {cartMeals.map((meal) => (
            <li key={meal.id} className="cart-item">
              <p>
                {meal.name} - {meal.quantity} x {meal.price}
              </p>
              <p className="cart-item-actions">
                <button onClick={() => onRemoveMeal(meal)}>-</button>
                <span>{meal.quantity}</span>
                <button
                  className="cart-item-actions"
                  onClick={() => onAddMeal(meal)}
                >
                  +
                </button>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        "Your cart is empty"
      )}
      {cartMeals.length > 0 && (
        <p className="cart-total"> Total: {cartTotalAmount()}</p>
      )}
      <p className="modal-actions">
        <Button className="button text-button" onClick={handleHideCart}>
          Close
        </Button>
        {cartMeals.length > 0 && (
          <button className="button" onClick={handleShowCheckout}>
            Place order
          </button>
        )}
      </p>
    </Modal>
  );
}
