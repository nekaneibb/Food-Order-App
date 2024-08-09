import logo from "../assets/logo.jpg";
import Modal from "./Modal";
import Button from "./UI/Button";
import { useState } from "react";

export default function Header({ cartMeals, onRemoveMeal }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseCart(){
    setModalIsOpen(false)
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>Food Cart</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleOpenModal} >
          Cart ({cartMeals.length})
        </Button>
        <Modal cartMeals={cartMeals} open={modalIsOpen} onClose={handleCloseCart} onRemoveMeal={onRemoveMeal}/>
      </nav>
    </header>
  );
}
