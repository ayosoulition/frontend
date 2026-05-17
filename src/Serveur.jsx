import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./Serveur.css";

export default function Serveur() {
  const socket = io("http://localhost:3005");

  const [selectedTable, setSelectedTable] = useState(null);
  // Sample table data with extended information
  const [orders, setOrders] = useState({});

  useEffect(() => {
    socket.on("new-order", (incomingOrders) => {
      console.log("Received new orders:", incomingOrders);

      setOrders(incomingOrders);
    });

    return () => {
      socket.off("new-order");
    };
  }, []);

  const handleTableClick = (table) => {
    console.log(table);
    console.log(orders);
    setSelectedTable(table.number); // This sets the data and serves as the trigger to open the modal
  };

  // 3. Function to close the modal
  const closeModal = () => {
    setSelectedTable(null);
  };

  const tables = [
    {
      id: 1,
      number: "1",
      status: "confirmed",
    },
    {
      id: 2,
      number: "2",
      status: "empty",
    },
    {
      id: 3,
      number: "3",
      status: "confirmed",
    },
    {
      id: 4,
      number: "4",
      status: "ordered",
    },
    {
      id: 5,
      number: "5",
      status: "bill",
    },
    {
      id: 6,
      number: "6",
      status: "empty",
    },
    {
      id: 7,
      number: "7",
      status: "confirmed",
    },
    {
      id: 8,
      number: "8",
      status: "ordered",
    },
    {
      id: 9,
      number: "9",
      status: "bill",
    },
    {
      id: 10,
      number: "10",
      status: "notPayed",
    },
    {
      id: 11,
      number: "11",
      status: "confirmed",
    },
    {
      id: 12,
      number: "12",
      status: "empty",
    },
  ];

  const getStatusLabel = (status) => {
    const labels = {
      empty: "Libre",
      ordered: "Commande",
      confirmed: "En cours",
      notPayed: "Non payée",
      bill: "Addition",
    };
    return labels[status] || status;
  };
  return (
    <div className="dashboard-container">
      {/* Red Header */}
      <header className="app-header">
        <div className="app-logo">Serveur Interface</div>
        <nav className="header-nav">
          <button className="nav-link active">
            <span className="nav-icon">🍽️</span> Tables
          </button>

          <button className="nav-link">
            <span className="nav-icon">📋</span> Commandes
          </button>

          <button className="nav-link">
            <span className="nav-icon">📜</span> Historique
          </button>
        </nav>
      </header>

      <main className="main-content">
        {/* Statistics Section */}

        {/* Filter Bar */}

        {/* Table Grid */}
        <section className="tables-grid">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => {
                handleTableClick(table);
              }}
              className={`table-card status-${table.status}`}
            >
              <div className="table-card-header">
                {getStatusLabel(table.status)}
              </div>
              <div className="table-card-body">
                <div className="table-number">{table.number}</div>
                <div className="table-details">
                  <div className="table-detail-row">
                    <span>{table.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {selectedTable && (
            <div style={modalOverlayStyle}>
              <div style={modalContentStyle}>
                <h3>Details for {selectedTable}</h3>
                <hr />
                <p>
                  <strong>Current Order:</strong>
                </p>

                {console.log(orders)}
                {Object.entries(orders[selectedTable].order).map(
                  ([category, items]) => (
                    <div className="categorySection" key={category}>
                      <h3>{category}</h3>

                      {items.map((item) => (
                        <div className="itemCard" key={item.id}>
                          <img src={`assets/${item.img}`} alt={item.title} />

                          <div>
                            <h4>{item.title}</h4>

                            <p>Quantité : {item.qt}</p>

                            <p>Prix : {item.price} DH</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                )}
                <button onClick={closeModal} style={closeButtonStyle}>
                  Close
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  minWidth: "300px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
};

const closeButtonStyle = {
  marginTop: "15px",
  padding: "8px 16px",
  backgroundColor: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
