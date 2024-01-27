import React, { useState, useEffect } from "react";
import "./App.scss";
import SavingSegmantModal from "./modal";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleClick = () => {
    setIsPopupOpen(true);
  };
  return (
    <div className="App">
      <button className="btn-style" onClick={handleClick}>
        Save segment
      </button>
      <SavingSegmantModal isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
    </div>
  );
}

export default App;
