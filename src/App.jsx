import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { data } from "./data";

// Components
import Home from "./Home.jsx";
import Book from "./Book.jsx";
import Order from "./Order.jsx";
import Thanks from "./Thanks.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import AdminPage from "./AdminPage.jsx";

function TableInitializer({ setTableNumber }) {
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If tableNumber exists in URL and isn't "0" (our null-placeholder)
    if (tableNumber && tableNumber !== "0") {
      setTableNumber(tableNumber);
      localStorage.setItem("tableNumber", tableNumber);
    } else {
      setTableNumber(null);
      localStorage.removeItem("tableNumber");
    }
    navigate("/home", { replace: true });
  }, [tableNumber, setTableNumber, navigate]);

  return <div className="loading-screen">Loading Menu...</div>;
}

export default function App() {
  const [tableNumber, setTableNumber] = useState(() =>
    localStorage.getItem("tableNumber"),
  );
  const [order, setOrder] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/table/:tableNumber"
          element={<TableInitializer setTableNumber={setTableNumber} />}
        />

        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route
          path="/home"
          element={
            <Home tableNumber={tableNumber} categories={Object.keys(data)} />
          }
        />

        {Object.keys(data).map((path) => {
          console.log(path);
          return (
            <Route
              key={path}
              path={`/${path}`}
              element={
                <Book
                  tableNumber={tableNumber}
                  data={data[path]}
                  order={order}
                  setOrder={setOrder}
                  bookType="menu"
                />
              }
            />
          );
        })}

        <Route
          path="/order"
          element={
            <Order
              order={order}
              tableNumber={tableNumber}
              setOrder={setOrder}
            />
          }
        />

        <Route
          path="/thanks"
          element={
            <Thanks
              tableNumber={tableNumber}
              setOrder={setOrder}
              order={order}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route
          path="*"
          element={<div className="p-10 text-center">404 - Page Not Found</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}
