import React from "react";

import mealImg from "../../assets/meals.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            ReactMeals
          </Link>
        </h1>
        <div className={styles["button-container"]}>
          <button className={styles.button}>
            <Link style={{ textDecoration: "none", color: "white" }} to="/history">History</Link>
          </button>
          <HeaderCartButton onShown={props.onShown}></HeaderCartButton>
        </div>
      </header>
      <div className={styles["meal-img"]}>
        <img src={mealImg} alt=""></img>
      </div>
    </>
  );
};

export default Header;
