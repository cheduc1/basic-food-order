import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

const BackDrop = props => {
  return (
    <div className={styles.backdrop} onClick={props.onHide} ></div>
  );
}
const ModalOverlay = props => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
const Modal = (props) => {
  return (
    <>
      {createPortal(<BackDrop onHide={props.onHide}/>, document.getElementById('overlays'))}
      {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, document.getElementById('overlays'))}
    </>
  )
}

export default Modal