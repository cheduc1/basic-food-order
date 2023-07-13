import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Header from "../Layout/Header";
import styles from "./History.module.css";
import HistoryItem from "./HistoryItem/HistoryItem";

const History = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        "https://react-http-test-454f1-default-rtdb.asia-southeast1.firebasedatabase.app/odrers.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await response.json();
      const rawOrderData = [];
      for (const key in data) {
        rawOrderData.push({
          key,
          orderItems: data[key].orderItems,
          userName: data[key].user.name,
        });
      }
      console.log(rawOrderData);
      setOrder(rawOrderData);
    };
    fetchOrder();
  }, []);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const orderList = order.map((order, index) => (
    <HistoryItem
      key={order.key}
      index={index}
      userName={order.userName}
      orderItems={order.orderItems}
    />
  ));

  return (
    <>
      {cartIsShown && <Cart onHide={hideCartHandler} />}
      <Header onShown={showCartHandler}></Header>
      <main className={styles["grid-container"]}>
        {orderList}
      </main>
    </>
  );
};

export default History;
