export function existingCartItem(meal, cartMeals) {
  const existingCartItemIndex = cartMeals.findIndex(
    (item) => item.id === meal.id
  );
  const updatedItems = [...cartMeals];

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

export function removeCartItem(meal, cartMeals) {
  const existingCartItemIndex = cartMeals.findIndex(
    (item) => item.id === meal.id
  );

  if (existingCartItemIndex === -1) {
    return cartMeals;
  }

  const updatedItems = [...cartMeals];
  const existingItem = updatedItems[existingCartItemIndex];

  if (existingItem.quantity > 1) {
    updatedItems[existingCartItemIndex] = {
      ...existingItem,
      quantity: existingItem.quantity - 1,
    };
  } else {
    updatedItems.splice(existingCartItemIndex, 1);
  }

  return updatedItems;
}


