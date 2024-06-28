import React from "react";
import "./Loading.css";

export default function LoadingSpinner() {
  return (
    <div className="spinnerContainer">
      <div className="spinnerContents">      
        <div className="loadingSpinner">          
        </div>
        <div className="loading_cotents">
          <div className="loading_img"></div>
          <p className="loadingText">LinkBee</p>
        </div>
      </div>
    </div>
  );
}