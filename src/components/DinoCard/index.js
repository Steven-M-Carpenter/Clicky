//This will be the component to hold the images
//
import React from "react";
import "./dinocard.css";

function DinoCard(props) {
  return (
    <div className="card" onClick={() => props.dinoClicked(props.id)}>
      <div className="img-container">
        <img alt={props.name} src={props.image} />
      </div>
    </div>
  );
}

export default DinoCard;
