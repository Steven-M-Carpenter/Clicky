//This is going to be the sticky header to show the title and keep score
//**May need to break this down more to handle the changing score
//**This may also need to be a class is score = state
//
import React from "react";
import "./header.css";


function Header(props) {
  return (
    <nav className="navbar fixed-top d-flex justify-content-between navbar-light">
      <h2><a className="navbar-brand" href="/">Click-a-saurus</a></h2>
      <h2>Score: {props.score} | High Score: {props.highScore}</h2>
    </nav>
  );
};

export default Header;