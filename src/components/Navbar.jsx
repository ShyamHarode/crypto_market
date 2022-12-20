import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navLink">
        <span>Coin</span>
        <span>Exchange</span>
        <span>Swap</span>
      </div>
      <h2>Crypto Market</h2>
      <div>
        <input className="search" type="search" placeholder="Search" />
        <select className="select" name="language" id="">
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
        </select>
        <button className="btn">Connect wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
