import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Serveur.css";

const API_BASE_URL = "http://192.168.0.189:3005";
const socket = io(API_BASE_URL);

export default function Serveur() {
  const [tables, setTables] = useState({});
  const [selectedTable, setSelectedTable] = useState(null);
  const [orders, setOrders] = useState({});

  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTable, setSearchTable] = useState("");

  const notificationSoundRef = useRef(null);
  const prevTablesRef = useRef({});

  // =========================
  // INIT SOUND
  // =========================
  useEffect(() => {
    const sound = new Audio("/assets/notif.wav");
    sound.preload = "auto";
    sound.load();

    notificationSoundRef.current = sound;

    const unlockAudio = () => {
      const s = notificationSoundRef.current;
      if (!s) return;

      s.play()
        .then(() => {
          s.pause();
          s.currentTime = 0;
        })
        .catch(() => {});
    };

    window.addEventListener("click", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  const playSound = () => {
    const sound = notificationSoundRef.current;
    if (!sound) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  // =========================
  // SOCKETS (FIXED)
  // =========================
  useEffect(() => {
    fetch(`${API_BASE_URL}/orders`)
      .then((res) => res.json())
      .then(setOrders);

    fetch(`${API_BASE_URL}/tables`)
      .then((res) => res.json())
      .then(setTables);

    socket.on("tables-update", (newTables) => {
      const prevTables = prevTablesRef.current;

      const importantStatuses = new Set(["ordered", "bill"]);

      let shouldPlaySound = false;

      for (const tableId in newTables) {
        const next = newTables[tableId];
        const prev = prevTables?.[tableId];

        if (!prev) continue;

        if (prev.status !== next.status && importantStatuses.has(next.status)) {
          shouldPlaySound = true;
          break;
        }
      }

      if (shouldPlaySound) playSound();

      // FIX: stable deep copy
      prevTablesRef.current = JSON.parse(JSON.stringify(newTables));

      setTables(newTables);
    });

    socket.on("new-order", (data) => {
      setOrders(data);
      playSound();
    });

    return () => {
      socket.off("tables-update");
      socket.off("new-order");
    };
  }, []);

  // =========================
  // API CALL
  // =========================
  const updateTableStatus = async (tableId, action) => {
    return fetch(`${API_BASE_URL}/tables/${tableId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
  };

  // =========================
  // ACTION HANDLER (FIXED LOGIC)
  // =========================
  const handleActionAndClose = async (action) => {
    if (!selectedTable) return;

    try {
      await updateTableStatus(selectedTable, action);

      setTables((prev) => ({
        ...prev,
        [selectedTable]: {
          ...prev[selectedTable],
          status:
            action === "confirm"
              ? "confirmed"
              : action === "served"
                ? "notPayed" // ✅ FIXED
                : action === "paid"
                  ? "empty"
                  : prev[selectedTable]?.status,
        },
      }));

      setSelectedTable(null);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // CANCEL
  // =========================
  const handleCancel = async (tableId) => {
    try {
      await updateTableStatus(tableId, "cancel");

      setOrders((prev) => {
        const copy = { ...prev };
        delete copy[tableId];
        return copy;
      });

      setTables((prev) => ({
        ...prev,
        [tableId]: { ...prev[tableId], status: "empty" },
      }));

      setSelectedTable(null);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      empty: "Libre",
      ordered: "Commande",
      confirmed: "Confirmée",
      notPayed: "Non payée",
      bill: "Addition",
    };
    return labels[status] || status;
  };

  const closeModal = () => setSelectedTable(null);

  const selectedStatus = tables[selectedTable]?.status;

  const filteredTables = Object.keys(tables).filter((tableId) => {
    const table = tables[tableId];

    const matchStatus = statusFilter === "all" || table.status === statusFilter;

    const matchSearch = tableId.toString().includes(searchTable.trim());

    return matchStatus && matchSearch;
  });

  return (
    <div className="dashboard-container">
      <header className="app-header">
        <div className="app-logo">Serveur Interface</div>

        <nav className="header-nav">
          <button className="nav-link active">🍽️ Tables</button>
          <button className="nav-link">📋 Commandes</button>
          <button className="nav-link">📜 Historique</button>
        </nav>
      </header>

      <main className="main-content">
        {/* FILTER */}
        <div style={filterBar}>
          <input
            type="text"
            placeholder="🔢 Table number..."
            value={searchTable}
            onChange={(e) => setSearchTable(e.target.value)}
            style={searchInput}
          />

          <div style={filterButtons}>
            <button
              onClick={() => setStatusFilter("all")}
              style={statusFilter === "all" ? activeBtn : btn}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter("ordered")}
              style={statusFilter === "ordered" ? activeBtn : btn}
            >
              Commande
            </button>
            <button
              onClick={() => setStatusFilter("confirmed")}
              style={statusFilter === "confirmed" ? activeBtn : btn}
            >
              Confirmée
            </button>
            <button
              onClick={() => setStatusFilter("bill")}
              style={statusFilter === "bill" ? activeBtn : btn}
            >
              Addition
            </button>
            <button
              onClick={() => setStatusFilter("notPayed")}
              style={statusFilter === "notPayed" ? activeBtn : btn}
            >
              Non payée
            </button>
          </div>
        </div>

        {/* TABLES */}
        <section className="tables-grid">
          {filteredTables.map((table) => (
            <div
              key={table}
              onClick={() => setSelectedTable(table)}
              className={`table-card status-${tables[table].status}`}
            >
              <div className="table-card-header">
                {getStatusLabel(tables[table].status)}
              </div>
              <div className="table-card-body">
                <div className="table-number">{table}</div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* MODAL */}
      {selectedTable && (
        <div style={modalOverlay} onClick={closeModal}>
          <div style={modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h3>Table {selectedTable}</h3>
              <button style={closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div style={modalBody}>
              {orders[selectedTable]?.order ? (
                Object.entries(orders[selectedTable].order).map(
                  ([cat, items]) => (
                    <div key={cat} style={{ marginBottom: 15 }}>
                      <h4 style={{ marginBottom: 8 }}>{cat}</h4>

                      {items.map((item) => (
                        <div key={item.id} style={itemCard}>
                          <img
                            src={`assets/${item.img}`}
                            style={imgStyle}
                            alt={item.title}
                          />
                          <div>
                            <div style={{ fontWeight: 600 }}>{item.title}</div>
                            <div style={smallText}>Qty: {item.qt}</div>
                            <div style={smallText}>{item.price} DH</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                )
              ) : (
                <p style={{ color: "#666" }}>No order for this table</p>
              )}

              <div style={btnContainer}>
                {selectedStatus === "ordered" && (
                  <>
                    <button
                      style={confirmBtn}
                      onClick={() => handleActionAndClose("confirm")}
                    >
                      Confirm
                    </button>

                    <button
                      style={cancelBtn}
                      onClick={() => handleCancel(selectedTable)}
                    >
                      Cancel
                    </button>
                  </>
                )}

                {selectedStatus === "confirmed" && (
                  <button
                    style={servedBtn}
                    onClick={() => handleActionAndClose("served")}
                  >
                    Served
                  </button>
                )}

                {(selectedStatus === "bill" ||
                  selectedStatus === "notPayed") && (
                  <button
                    style={paidBtn}
                    onClick={() => handleActionAndClose("paid")}
                  >
                    Paid ✔
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES (UNCHANGED) ================= */

const filterBar = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  marginBottom: 15,
};
const searchInput = {
  padding: 10,
  borderRadius: 10,
  border: "1px solid #ddd",
};
const filterButtons = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const btn = {
  padding: "6px 10px",
  border: "1px solid #ddd",
  borderRadius: 8,
  background: "#fff",
  fontSize: 12,
};
const activeBtn = {
  padding: "6px 10px",
  border: "1px solid #22c55e",
  borderRadius: 8,
  background: "#22c55e",
  color: "#fff",
  fontSize: 12,
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: 10,
  zIndex: 1000,
};
const modalBox = {
  background: "#fff",
  width: "100%",
  maxWidth: 520,
  maxHeight: "85vh",
  borderRadius: "20px 20px 14px 14px",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};
const modalHeader = {
  padding: 14,
  borderBottom: "1px solid #eee",
  display: "flex",
  justifyContent: "space-between",
};
const modalBody = { padding: 14, overflowY: "auto", flex: 1 };
const closeBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 8,
};

const itemCard = {
  display: "flex",
  gap: 10,
  padding: 10,
  background: "#f8fafc",
  borderRadius: 12,
  marginBottom: 8,
};
const imgStyle = { width: 50, height: 50, borderRadius: 10 };
const smallText = { fontSize: 12, color: "#666" };

const btnContainer = { display: "flex", gap: 10, marginTop: 15 };
const confirmBtn = {
  flex: 1,
  padding: 10,
  background: "#22c55e",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
const cancelBtn = {
  flex: 1,
  padding: 10,
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
const servedBtn = {
  width: "100%",
  padding: 10,
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: 10,
};
const paidBtn = {
  width: "100%",
  padding: 12,
  background: "linear-gradient(135deg, #10b981, #22c55e)",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
};
