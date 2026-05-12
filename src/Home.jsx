import { Link } from "react-router-dom";
import "./Home.css";
import Header from "./Header";

import Lottie from "react-lottie";

import animation from "../public/assets/loadingSpinner.json";

export default function Home({ tableNumber, loading, categories }) {
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
        {categories.map((categorie) => {
          return (
            <div className="boxContainer" key={categorie}>
              <Link to={`/${categorie}`}>
                <div className={`catContainer bakery left`}>
                  <img src={`assets/${categorie}.jpg`} alt="" />
                  <div className="action">
                    <h2>{categorie.toUpperCase()}</h2>
                    <span className="action-btn">
                      <i className="bx bxs-book-bookmark btn" id="btn"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}
