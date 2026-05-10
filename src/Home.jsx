import { Link } from "react-router-dom";
import "./Home.css";
import Header from "./Header";

import Lottie from "react-lottie";

import animation from "../public/assets/loadingSpinner.json";

export default function Home({ tableNumber, loading }) {
  const lottieOptions = {
    loop: true, // Set to true for infinite loop
    autoplay: true, // Autoplay the animation
    animationData: animation, // Lottie JSON data
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice", // Maintain the aspect ratio
    },
  };

  if (loading) {
    return (
      <div className="loadingSpin">
        {/* Show Lottie animation while loading */}
        <Lottie options={lottieOptions} height={100} width={100} />
      </div>
    );
  }
  return (
    <>
      <Header tableNumber={tableNumber} className="homeHeader" />
      <main>
        <div className="boxContainer">
          <Link to="./beverages">
            <div className="catContainer beverages left">
              <img src="assets/coffeback.jpg" alt="" />
              <div className="action">
                <h2>Beverages</h2>
                <span className="action-btn">
                  <i className="bx bxs-book-bookmark btn" id="btn"></i>
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="boxContainer">
          <Link to="./bakery">
            <div className="catContainer bakery right">
              <img src="assets/bakery.jpg" alt="" />
              <div className="action">
                <span className="action-btn">
                  <i className="bx bxs-book-bookmark btn" id="btn"></i>
                </span>
                <h2>Bakery</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="boxContainer">
          <Link to="./icecreams">
            <div className="catContainer icecreams left">
              <img src="assets/icecreams.jpg" alt="" />
              <div className="action">
                <h2>IceCreams</h2>
                <span className="action-btn">
                  <i className="bx bxs-book-bookmark btn" id="btn"></i>
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="boxContainer">
          <Link to="./breakfasts">
            <div className="catContainer breakfasts right">
              <img src="assets/break.jpg" alt="" />
              <div className="action">
                <span className="action-btn">
                  <i className="bx bxs-book-bookmark btn" id="btn"></i>
                </span>
                <h2>BreakFasts</h2>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </>
  );
}
