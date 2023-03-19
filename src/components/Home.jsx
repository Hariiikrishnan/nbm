import React from "react";

import { Link } from "react-router-dom";

function Home() {
  const shareData = {
    title: "NB's Memories Wall",
    text: "Check Out the Memories of Nav Bharath Alumni Shared!",
    url: "https://developer.mozilla.org",
  };

  async function handleShareBtn() {
   
      try {
        await navigator.share(shareData);
        console.log("MDN shared successfully");
      } catch (err) {
        console.log(`Error: ${err}`);
      }
   
  }

  return (
    <div className="home">
      <h1>Click here to Open the NavBharat Memories Wall</h1>
      <img alt="Hridayam Cover" src="images/hridayam_cover.jpg" />
      <button class="openBtn">
        <Link to="/wall">Open</Link>
      </button>
      <button class="openBtn shareBtn" onClick={handleShareBtn}>
        Share
      </button>
    </div>
  );
}
export default Home;
