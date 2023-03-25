import React from "react";

function ShareBtn() {
  const shareData = {
    title: "NB's Memories Wall",
    text: "Check Out the Memories of Nav Bharath Alumni Shared!",
    url: "https://nb-memories.netlify.app",
  };

  async function handleShareBtn() {
    try {
      await navigator.share(shareData);
      console.log("WebSite Shared Successfully");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  return (
    <button class="openBtn shareBtn" onClick={handleShareBtn}>
      Share <span class="material-symbols-outlined">share</span>
    </button>
  );
}

export default ShareBtn;
