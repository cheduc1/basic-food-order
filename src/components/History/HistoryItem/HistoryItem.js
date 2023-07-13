import React from "react";
import styles from "./HistoryItem.module.css";
import Card from "../../UI/Card";

const HistoryItem = (props) => {
  const itemsList = props.orderItems.map(item => (
    <div key={item.id} className={styles["item"]}>
      <h4>{item.name}</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>Price: {item.price}</div>
        <div>Q.ty: {item.amount}</div>
      </div>
    </div>
  ));

  let totalPrice = 0;
  for (const element of props.orderItems) {
    totalPrice += element.price * element.amount;
  }

  return (
    <Card className={styles.card}>
      <div className={styles["order-description"]}>
        <h3>Order #{props.index + 1}</h3>
        <div
          style={{ borderBottom: "1px solid black", paddingBottom: "0.5rem" }}
        >
          <span style={{ fontWeight: "bold" }}>Username: </span>
          {props.userName}
        </div>
      </div>
      {itemsList}
      <div
        style={{
          paddingTop: "0.5rem",
          borderTop: "1px solid black",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: "rgb(161, 31, 8)", fontWeight: "bold" }}>
          Total price
        </span>
        <span style={{ color: "rgb(161, 31, 8)", fontWeight: "bold" }}>
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </Card>
  );
};

export default HistoryItem;
