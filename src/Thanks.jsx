import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "./Ticket";
import Header from "./Header";
import "./Thanks.css";

export default function Thanks({ order, setOrder, tableNumber }) {
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!order || Object.keys(order).length === 0) {
      const timer = setTimeout(
        () => navigate("/home", { replace: true }),
        3000,
      );
      return () => clearTimeout(timer);
    }

    const processOrder = () => {
      const finalReceipt = {
        table: tableNumber || "Walk-in",
        items: { ...order }, // Shallow copy to be safe
        total: Object.values(order).reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        timestamp: new Date().toLocaleString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      };

      console.log("Order Processed:", finalReceipt);

      setConfirmation(finalReceipt);
      setOrder({});
      setLoading(false);
    };

    processOrder();

    const handleBackButton = () => setOrder({});
    window.addEventListener("popstate", handleBackButton);

    return () => window.removeEventListener("popstate", handleBackButton);
  }, []); // Run once on mount

  return (
    <main>
      <Header className="menuHeader" tableNumber={tableNumber} />

      <div className="ticketThanks">
        {loading ? (
          <div className="status-msg">Sending order to kitchen...</div>
        ) : (
          <div className="thanks-container">
            <Ticket
              order={confirmation.items}
              table={confirmation.table}
              timestamp={confirmation.timestamp}
              ticketType="thanks"
            />
          </div>
        )}
      </div>
    </main>
  );
}
