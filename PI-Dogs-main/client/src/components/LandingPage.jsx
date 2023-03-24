import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (    
      <div>
        <h1>Dog Breed Pedia</h1>
        
        <Link to="/home">
            <button >Go home</button>
        </Link>      
    </div>
  );
}

export default LandingPage;
