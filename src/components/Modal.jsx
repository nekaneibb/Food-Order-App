import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ cartMeals, open, children, onClose, onRemoveMeal }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  function cartTotalAmount() {
    const totalCart = cartMeals.reduce((accumulator, meal) => {
      return accumulator + parseFloat(meal.price);
    }, 0);

    return totalCart.toFixed(2);
  }

  return createPortal(
    <dialog ref={dialog} className="cart">
      <h2> This is your cart</h2>
      {cartMeals.length > 0 ? (
        <ul>
          {cartMeals.map((meal) => (
            <li key={meal.id} className="cart-item">
              <p>{meal.name}</p>
              {meal.quantity ? <p>{meal.quantity}</p> : null}
              <p>{meal.price}</p>
              <button
                className="cart-item-actions"
                onClick={() => onRemoveMeal(meal.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        "Your cart is empty"
      )}
      {cartMeals.length > 0 ? <p className="cart-total"> Total: {cartTotalAmount()}</p> : null}
      
      <p className="modal-actions">
        <button className=" button text-button">Place order</button>
        <button className="button text-button" onClick={onClose}>
          Close
        </button>
      </p>
    </dialog>,
    document.getElementById("modal")
  );
}
export default Modal;
