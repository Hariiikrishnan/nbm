import React from "react";

import ShareBtn from "./ShareBtn";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1 class="title">NavBharat's Memories Wall</h1>

      <img alt="Hridayam Cover" src="images/hridayam_cover.jpg" />
      <h2>Click here to Open the NavBharat Memories Wall</h2>
      <Link to="/wall"><button class="openBtn">
        Open
      </button></Link>
      <ShareBtn />
    </div>
  );
}
export default Home;
