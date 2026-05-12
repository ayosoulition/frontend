import Thanks from "./Thanks";

export default function Ticket({ order, children, ticketType, timestamp }) {
  const keys = Object.keys(order);

  let total = 0;

  keys.forEach((category) => {
    order[category].forEach((element) => {
      total += element.price * element.qt;
    });
  });
  return (
    <>
      {keys.length !== 0 ? (
        <>
          {ticketType === "menu" ? (
            <h1>
              Your <span className="mainColor">Order</span>
            </h1>
          ) : ticketType === "order" ? ( // Added a '?' here
            <h1>
              Confirm <span className="mainColor">Order</span>
            </h1>
          ) : (
            <>
              <h1>
                Your Ticket <span className="mainColor">Order</span>
              </h1>
              <p className="thanksText">
                Thanks for your order! Heres your ticket. We will serve you as
                soon as possible. Thanks for your time!
              </p>

              <p>{timestamp}</p>
            </>
          )}
          {keys.map((category) => (
            <div className="ticket" key={category}>
              <h2>{category}</h2>
              {order[category].map((element) => (
                <p className="item" key={element.id}>
                  {element.title}
                  <span className="itemQt">x {element.qt}</span>
                </p>
              ))}
            </div>
          ))}

          <div className="total">
            <hr />
            <div className="price">
              Total: <span className="mainColor">{total} DH</span>
            </div>
          </div>
        </>
      ) : (
        <div className="browse">
          <h1>
            Your <span className="mainColor">Order</span>
          </h1>

          {children}
        </div>
      )}
    </>
  );
}
