import { BrowserRouter, useParams, Route, Routes } from "react-router-dom";

import axios from "axios";

import Home from "./Home.jsx";
import Book from "./Book.jsx";
import Order from "./Order.jsx";
import Thanks from "./Thanks.jsx";
import { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import AdminPage from "./AdminPage.jsx";

const data = {
  beverage: [
    [
      {
        title: "Italiano",
        description: "description goes here",
        img: "coffeback.jpg",
        type: "beverage",
        price: 10,
        id: 1,
      },
      {
        title: "Americano",
        description: "description goes here",
        img: "coffeback.jpg",
        type: "beverage",
        price: 10,
        id: 2,
      },
    ],
    [
      {
        title: "mangoJuice",
        description: "description goes here",
        img: "mangoJuice.jpg",
        type: "beverage",
        price: 13,
        id: 3,
      },
      {
        title: "Kiwi Juice",
        img: "kiwiJuice.jpg",
        type: "beverage",
        description: "description goes here",
        price: 13,
        id: 4,
      },
    ],
    [
      {
        title: "Orange Juice",
        img: "OrangeJuice.jpg",
        description: "description goes here",
        type: "beverage",
        price: 22,
        id: 5,
      },
      {
        title: "Lemon Juice",
        description: "description goes here",
        img: "lemonJuice.jpg",
        type: "beverage",
        price: 24,
        id: 6,
      },
    ],
  ],

  bakery: [
    [
      {
        title: "Creme Amande mini",
        description: "description goes here",
        img: "cremeAmande.jpg",
        type: "bakery",
        price: 2.5,
        id: 7,
      },
      {
        title: "Pain suisse mini",
        description: "description goes here",
        img: "painSuisse.jpg",
        type: "bakery",
        price: 2.5,
        id: 8,
      },
    ],
    [
      {
        title: "Creme Amande big",
        description: "description goes here",
        img: "cremeAmande.jpg",
        type: "bakery",
        price: 5,
        id: 9,
      },
      {
        title: "Pain suise big",
        description: "description goes here",
        img: "painSuisse.jpg",
        type: "bakery",
        price: 8,
        id: 10,
      },
    ],
  ],

  breakFast: [
    [
      {
        title: "Continental BreakFast",
        description: "description goes here",
        img: "continentalBreakFast.jpg",
        type: "breakFast",
        price: 20,
        id: 11,
      },
      {
        title: "American BreakFast",
        description: "description goes here",
        img: "americanBreakFast.jpg",
        type: "breakFast",
        price: 25,
        id: 12,
      },
    ],
    [
      {
        title: "Chineese breakFast",
        description: "Chineese breakFast perfect for the morning ",
        img: "chineeseBreakFast.jpg",
        type: "breakFast",
        price: 30,
        id: 13,
      },

      {
        title: "Chineese breakFast",
        description: "Chineese breakFast perfect for the morning ",
        img: "chineeseBreakFast.jpg",
        type: "breakFast",
        price: 30,
        id: 14,
      },
    ],
  ],
  iceCreams: [
    [
      {
        title: "Chocolate",
        description: "description goes here",
        img: "chocolateIceCream.jpg",
        type: "iceCream",
        price: 30,
        id: 17,
      },
      {
        title: "Pistashu",
        description: "description goes here",
        img: "pistashuIceCream.jpg",
        type: "iceCream",
        price: 40,
        id: 18,
      },
    ],
    [
      {
        title: "Vanilla",
        description: "description goes here",
        img: "vanillaIceCream.jpg",
        type: "iceCream",
        price: 30,
        id: 19,
      },
      {
        title: "Strawberry",
        description: "description goes here",
        img: "strawberryIceCream.jpg",
        type: "iceCream",
        price: 30,
        id: 20,
      },
    ],
  ],
};

export default function App() {
  const [tableNumber, setTableNumber] = useState(null);
  const { tablenumber } = useParams();

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setTableNumber(tablenumber);
  }, [tablenumber]);

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // setToken(urlParams.get("token"));
    // if (token) {
    //   verifyTableToken(token); // Call the function to verify the token
    // } else {
    //   setLoading(false);
    // }

    console.log(window.location.pathname);
  }, []);
  const [order, setOrder] = useState({});

  // const verifyTableToken = async (token) => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4000/verify?token=" + token,
  //     );
  //     if (response.data.tableNumber) {
  //       setTableNumber(response.data.tableNumber); // Update the table number
  //     } else {
  //       console.error("Invalid token");
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Home tableNumber={tableNumber} loading={loading} />}
          path="/"
        />
        <Route
          element={
            <Book
              tableNumber={tableNumber}
              data={data.bakery}
              order={order}
              setOrder={setOrder}
              bookType="menu"
            />
          }
          path="/bakery"
        />

        <Route
          element={
            <Book
              tableNumber={tableNumber}
              data={data.beverage}
              order={order}
              setOrder={setOrder}
              bookType="menu"
            />
          }
          path="/beverages"
        />

        <Route
          element={
            <Book
              tableNumber={tableNumber}
              data={data.breakFast}
              order={order}
              setOrder={setOrder}
              bookType="menu"
            />
          }
          path="/breakfasts"
        />

        <Route
          element={
            <Book
              tableNumber={tableNumber}
              data={data.iceCreams}
              order={order}
              setOrder={setOrder}
              bookType="menu"
            />
          }
          path="/icecreams"
        />

        <Route
          element={
            tableNumber ? (
              <Order
                order={order}
                tableNumber={tableNumber}
                setOrder={setOrder}
              />
            ) : (
              <div>Not Found</div>
            )
          }
          path="/order"
        />
        <Route
          element={
            tableNumber ? (
              <Thanks
                tableNumber={tableNumber}
                setOrder={setOrder}
                order={order}
                token={token}
              />
            ) : (
              <div>Not Found</div>
            )
          }
          path="/thanks"
        />

        {/* <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<AdminPage />} path="/AdminPage" /> */}
      </Routes>
    </BrowserRouter>
  );
}
