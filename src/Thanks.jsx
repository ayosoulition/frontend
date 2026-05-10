import Ticket from "./Ticket";
import "./Thanks.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Thanks({ order, setOrder, token, tableNumber }) {
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(order);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      console.log("hey");
      setOrder({});
    });
    if (!order || Object.keys(order).length === 0) {
      navigate("/", { replace: true });
      return;
    }
    if (!token || !order) {
      navigate("/", { replace: true });
      return;
    }

    const placeOrder = async () => {
      try {
        const response = await axios.post("http://localhost:4000/order", {
          token: token,
          order,
        });
        console.log(response.data, "orders");
        setConfirmation(response.data.order); // Assuming `response.data.order` contains the confirmed order details
      } catch (err) {
        // Check if the error response exists
        console.log(err.message);
        const message = err.response?.data?.message || "Failed to place order.";
        setError(message);
      }
    };

    placeOrder();
  }, [token, order]);
  return (
    <main>
      <Header className="menuHeader" tableNumber={tableNumber} />
      <div className="ticketThanks">
        {error ? (
          <div className="error">{error}</div>
        ) : (
          confirmation && <Ticket order={confirmation} ticketType="thanks" />
        )}
      </div>
    </main>
  );
}
