import React from 'react'

import mealImg from '../../assets/meals.jpg'
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onShown={props.onShown}></HeaderCartButton>
      </header>
      <div className={styles['meal-img']}>
        <img src={mealImg} alt=''></img>
      </div>
    </>
  )
}

export default Header