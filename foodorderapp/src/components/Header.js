import React from "react";
import mealsImage from "../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import styles from "../css/Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ZeeexMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
