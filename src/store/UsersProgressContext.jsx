import { useState, createContext } from "react";

const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});
export function UserProgressContextProvider({ children }) {
  const [useProgress, setUseProgress] = useState("");

  function showCart() {
    setUseProgress("cart");
  }
  function hideCart() {
    setUseProgress("");
  }
  function showCheckout() {
    setUseProgress("checkout");
  }
  function hideCheckout() {
    setUseProgress("");
  }
  const userProgressCtx = {
    progress: useProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
