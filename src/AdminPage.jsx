import { useEffect, useState } from "react";
import io from "socket.io-client";

import useOrders from "./useOrder";
import "./AdminPage.css";

function AdminPage() {
  const { orders } = useOrders();

  function handleClick() {}
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Orders Queue</h2>

      <div className="adminOrder">
        {orders.map((ord) => {
          return (
            <div className="orderPreview" onClick={handleClick} key={ord.id}>
              <div>Table: {ord.tableNumber}</div>
              <div className="orderDetails">
                {Object.keys(ord.order).map((cat) => {
                  return (
                    <div key={cat}>
                      <h3>Category: {cat}</h3>
                      {ord.order[cat].map((item) => {
                        return (
                          <div key={item.title}>
                            <h1>{item.title}</h1>
                            <h2>Price: {item.price * item.qt} DH</h2>
                            <img
                              src={`./assets/${item.img}`}
                              alt={item.title}
                            />
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="controlBtns">
                <span className="confirm">
                  <i className="bx bxs-check-square"></i>
                </span>
                <span className="reject">
                  <i className="bx bxs-x-circle"></i>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
