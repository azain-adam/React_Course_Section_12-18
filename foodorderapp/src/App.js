import React, { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import CartProvider from "./context/CartProvider";

const App = () => {
  const [isCartShown, setIsCardShown] = useState(false);

  const handleShowCart = () => {
    setIsCardShown(true);
  };

  const handleHideCart = () => {
    setIsCardShown(false);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart onClose={handleHideCart} />}
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
