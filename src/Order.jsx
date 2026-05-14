import { useEffect } from "react";
import Book from "./Book";
import { useNavigate } from "react-router-dom";
export default function Order({ tableNumber, order, setOrder }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!order || Object.keys(order).length === 0) {
      navigate("/", { replace: true });
      return;
    }
  }, [order]);

  let data = [];

  Object.keys(order).forEach((o) => {
    order[o].forEach((item) => {
      data.push([item, null]);
    });
  });

  console.log("Heythis is", data);
  console.log("Data:", data);
  return (
    <Book
      data={data}
      order={order}
      tableNumber={tableNumber}
      setOrder={setOrder}
      bookType="order"
    />
  );
}
