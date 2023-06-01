import React, { forwardRef } from 'react'

import styles from './Input.module.css';
const Input = forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        {...props.input}
      >
      </input>
    </div>
  )
})

export default Input