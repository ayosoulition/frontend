import { useState, useEffect, useRef, useId } from "react";
import Paper from "./Paper";
import Ticket from "./Ticket";
import "./Book.css";
import { Link } from "react-router-dom";
import Header from "./Header";

export default function Book({ data, tableNumber, order, setOrder, bookType }) {
  const [page, setPage] = useState({ pageNum: null });
  const id = useId();
  const pagesRefs = useRef([]);
  function handleNext(pageNum) {
    setPage({ pageNum });
  }

  const setPagesRefs = (el, index) => {
    pagesRefs.current[index] = el;
  };

  useEffect(() => {
    let baseIndex = 20;
    let pages = pagesRefs.current;
    let { pageNum } = page;

    if (pageNum !== null) {
      console.log("hey");
      let pageTurn = pages[pageNum];

      if (pageTurn.classList.contains("turn")) {
        pageTurn.classList.remove("turn");

        setTimeout(() => {
          pageTurn.style.zIndex = baseIndex - pageNum * 100;
          if (pageNum === 0) {
            setPage({ pageNum: null });
          }
        }, 500);
      } else {
        pageTurn.classList.add("turn");

        setTimeout(() => {
          pageTurn.style.zIndex = baseIndex + pageNum * 100;

          if (pageNum === 0) {
            setPage({ pageNum: null });
          }
        }, 500);
      }
    }
  }, [page]);

  function handleBack() {
    let pages = pagesRefs.current;

    console.log(pages.length);
    let pageNumber = page.pageNum;

    for (let i = pageNumber; i >= 0; i--) {
      setTimeout(
        () => {
          setPage({ pageNum: pageNumber-- });
        },
        (i + 1) * 200 + 100,
      );
    }
  }

  return (
    <div className="menuPage">
      <Header tableNumber={tableNumber} className="menuHeader" />
      <main className="menu">
        <div className="wrapper">
          <div className="cover cover-left"></div>
          <div className="cover cover-right turn"></div>

          <div className="book">
            {data.length > 0 ? (
              <span className="back-first" onClick={handleBack}>
                <i className="bx bxs-left-arrow"></i>
              </span>
            ) : null}

            <div className="book-page page-left">
              <Ticket order={order} ticketType={bookType}>
                {bookType === "menu" ? (
                  <p>
                    Browse the Menu and choose your items. Come back to this
                    page to see the ticket and confirm the order.
                  </p>
                ) : null}
              </Ticket>
            </div>
            {data.map((items, index) => {
              return (
                <Paper
                  order={tableNumber ? order : null}
                  setOrder={tableNumber ? setOrder : null}
                  key={`${id}-${index}`}
                  items={items}
                  ref={(el) => setPagesRefs(el, index)}
                  handleNext={handleNext}
                  zindex={20 - index}
                  pageNumber={index}
                />
              );
            })}
          </div>
        </div>
        {bookType === "menu" ? (
          Object.keys(order).length !== 0 ? (
            <div className="actionBtn">
              <Link to="/order" replace>
                <span className="sendOrder">Send Order</span>
              </Link>
            </div>
          ) : null
        ) : (
          <div className="actionBtn">
            <Link to="/thanks" replace>
              <span className="sendOrder">Confirm</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
