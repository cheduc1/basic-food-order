import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(item =>
      item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updateCartItems;

    if (existingItem) {
      const updateCartItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      }
      updateCartItems = [...state.items];
      updateCartItems[existingItemIndex] = updateCartItem;
    } else {
      updateCartItems = state.items.concat(action.item);
    }
    //const updateCartItem = state.items.concat(action.item);
    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount
    };
  }

  if (action.type === 'REMOVE') {
    const updatedItemIndex = state.items.findIndex(item =>
      item.id === action.id
    );
    const updatedItem = state.items[updatedItemIndex];
    const updateTotalAmount = state.totalAmount - updatedItem.price;
    let updateCartItems;

    if (updatedItem.amount === 1) {
      updateCartItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedCartItem = {
        ...updatedItem,
        amount: updatedItem.amount - 1,
      }
      updateCartItems = [...state.items];
      updateCartItems[updatedItemIndex] = updatedCartItem;
    }

    return {
      items: updateCartItems,
      totalAmount: updateTotalAmount,
    }
  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartState({
      type: 'ADD',
      item: item
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartState({
      type: 'REMOVE',
      id: id
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider