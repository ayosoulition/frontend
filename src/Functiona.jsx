import React from "react";

import { useState } from "react";
function Functiona({ item, order, setOrder }) {
  console.log("Order omar", order);
  console.log(item);

  let elem = order[item.type]?.find((elem) => elem.id === item.id);
  const [qt, setQt] = useState(item.qt ? item.qt : elem ? elem.qt : 0);
  function handleInc() {
    setQt((qt) => ++qt);
    handleNewOrder(qt + 1);
  }

  function handleNewOrder(qt) {
    if (order[item.type]) {
      let elem = order[item.type].find((elem) => elem.id === item.id);

      if (elem) {
        if (qt === 0) {
          order[item.type] = order[item.type].filter(
            (elem) => elem.id !== item.id,
          );

          if (order[item.type].length === 0) {
            delete order[item.type];
          }
        } else {
          elem.qt = qt;
        }
      } else {
        order[item.type].push({
          title: item.title,
          id: item.id,
          qt: qt,
          price: item.price,
          img: item.img,
          type: item.type,
        });
      }

      setOrder({ ...order });
    } else {
      setOrder({
        ...order,
        [item.type]: [
          {
            title: item.title,
            id: item.id,
            qt: qt,
            price: item.price,
            img: item.img,
            type: item.type,
          },
        ],
      });
    }
  }

  function handleDec() {
    setQt((qt) => (--qt < 0 ? 0 : qt));
    if (qt - 1 >= 0) {
      handleNewOrder(qt - 1);
    }
  }
  return (
    <div className="quantity">
      <button className="addBtn" onClick={handleInc}>
        <i className="bx bx-plus"></i>
      </button>
      <p>{qt}</p>
      <button onClick={handleDec}>
        <i className="bx bx-minus"></i>
      </button>
    </div>
  );
}

export default Functiona;
