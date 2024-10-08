import Modal from "./Modal";
import Button from "../components/UI/Button";
import UserProgressContext from "../store/UsersProgressContext";
import { useContext } from "react";
import Input from "./Input";

export default function Checkout({ cartMeals }) {
  const userProgressCtx = useContext(UserProgressContext);

  function cartTotalAmount() {
    const totalCart = cartMeals.reduce((accumulator, meal) => {
      return accumulator + parseFloat(meal.price) * meal.quantity;
    }, 0);

    return totalCart.toFixed(2);
  }

  function handleHideCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartMeals,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout form</h2>
        <p>Total amount: {cartTotalAmount()}</p>
        <Input label="Full Name" id="name" type="text"></Input>
        <Input label="Email Address" id="email" type="email"></Input>
        <Input label="Street" id="street" type="text"></Input>
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text"></Input>
          <Input label="City" id="city" type="text"></Input>
        </div>
        <p className="modal-actions">
          <Button
            className="button"
            type="button"
            textOnly
            onClick={handleHideCheckout}
          >
            Close
          </Button>
          <button className="button">Submit order</button>
        </p>
      </form>
    </Modal>
  );
}
