import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navLink">
        <span>Coin</span>
        <span>Exchange</span>
      </div>
      <h4>Crypto Market</h4>
      <div className="nav">
        <button className="btn pointer">Connect wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
