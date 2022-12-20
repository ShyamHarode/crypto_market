import React, { useEffect, useState } from "react";
import "./App.css";
import { FaRegStar } from "react-icons/fa";
import Navbar from "./components/Navbar";

function App() {
  const [coinList, setCoinList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [sortKey, setSortKey] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [displayCol, setDisplayCol] = useState("priceChange1h");
  const [limit, setLimit] = useState(20);
  const [filterKey, setFilterKey] = useState({
    rank: false,
    price: false,
    marketCap: false,
    priceChange1d: false,
  });

  const fetchData = async () => {
    const response = await fetch("https://api.coinstats.app/public/v1/coins");
    const data = await response.json();
    if (sortKey !== "") {
      sortData(data.coins);
    } else {
      setFilterList(data.coins);
    }
  };

  useEffect(() => {
    const getData = setInterval(() => fetchData(), 3000);
    const list = [...filterList];
    setCoinList([...list.splice(0, limit)]);

    return () => clearInterval(getData);
    // eslint-disable-next-line
  }, [filterList]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [sortKey]);

  const handleChange = () => {
    setLimit((prev) => prev + 20);
  };

  const sortData = (data) => {
    const newList = [...data];
    if (filterKey[sortKey]) {
      newList.sort((a, b) => {
        return a[sortKey] - b[sortKey];
      });
    } else {
      newList.sort((a, b) => {
        return b[sortKey] - a[sortKey];
      });
    }
    setFilterList(newList);
  };

  const formatNumber = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(2) + "T";
  };
  const addToFavorite = (id) => {
    const list = [...favorite];
    if (favorite.some((item) => item.id === id)) {
      const newList = list.filter((obj) => obj.id !== id);
      setFavorite(newList);
      return;
    }
    const coin = coinList.find((obj) => obj.id === id);
    if (list.length < 3) {
      list.push(coin);
    } else {
      alert("You can not add more than 3 Coin");
    }
    setFavorite(list);
  };

  const handleSort = (k) => {
    setSortKey(k);
    const sorted = {
      rank: false,
      price: false,
      marketCap: false,
      priceChange1d: false,
    };
    setFilterKey({ ...sorted, [k]: !filterKey[k] });
    // fetchData();
  };

  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <table className="table">
          <thead className="tableHead">
            <tr>
              <th>Favorite</th>
              <th className="pointer" onClick={() => handleSort("rank")}>
                Rank
              </th>
              <th style={{ textAlign: "start", paddingLeft: "10px" }}>Name</th>
              <th className="pointer" onClick={() => handleSort("price")}>
                Price
              </th>
              <th className="pointer" onClick={() => handleSort("marketCap")}>
                Market Cap
              </th>
              <th>Volume</th>
              <th>Supply</th>
              <th>
                <span
                  className="pointer"
                  onClick={() => handleSort(displayCol)}
                >
                  Change
                </span>
                <select
                  name="price"
                  className="select pointer"
                  onChange={(e) => setDisplayCol(e.target.value)}
                >
                  <option value="priceChange1h">1h</option>
                  <option value="priceChange1d">1d</option>
                  <option value="priceChange1w">1w</option>
                </select>
              </th>
            </tr>
          </thead>

          {coinList && (
            <tbody className="tableBody">
              {coinList.map((coin) => {
                return (
                  <tr key={coin.id} className="tableRow">
                    <td>
                      <FaRegStar
                        className="pointer star"
                        onClick={() => addToFavorite(coin.id)}
                        style={{
                          backgroundColor: favorite.some(
                            (c) => c.id === coin.id
                          )
                            ? "yellow"
                            : "",
                        }}
                      />
                    </td>
                    <td>{coin.rank}</td>
                    <td className="coinName">
                      <img className="icon" src={coin.icon} alt="icon" />
                      <div>
                        <span>{coin.name}</span>
                        <span style={{ color: "gray", fontSize: "smaller" }}>
                          {coin.symbol}
                        </span>
                      </div>
                    </td>
                    <td>${coin.price.toFixed(2)}</td>
                    <td>${formatNumber(coin.marketCap)}</td>
                    <td>${formatNumber(coin.volume)}</td>
                    <td>{formatNumber(coin.totalSupply)}</td>
                    <td
                      style={{ color: coin[displayCol] > 0 ? "green" : "red" }}
                    >
                      {formatNumber(coin[displayCol])}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <button className="btn" onClick={() => handleChange()}>
          View More
        </button>
      </main>
    </div>
  );
}

export default App;
