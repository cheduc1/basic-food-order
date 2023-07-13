import React from "react";
import { useState } from "react";
import Cart from "../components/Cart/Cart";
import Header from "../components/Layout/Header";

import Meals from "../components/Meals/Meals";

const HomePage = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <>
      {cartIsShown && <Cart onHide={hideCartHandler} />}
      <Header onShown={showCartHandler}></Header>
      <main>
        <Meals />
      </main>
    </>
  );
};

export default HomePage;
