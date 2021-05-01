import { useEffect, useState } from "react";
// images
import topFiveLogo from "./img/top-five-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// components
import Table from "./components/Table";
import SideBar from "./components/SideBar";
// styles
import "./styles/app.scss";
import { ThemeConsumer } from "styled-components";

function App() {
  // variables
  let allLeaguesList = [];
  let count = 0;
  let randomNumber;

  //useState
  const [league, setLeague] = useState([]);

  // useEffect
  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php")
      .then((resp) => resp.json())
      .then((data) => {
        for (let i = 0; i < data.leagues.length; i++) {
          if (data.leagues[i].strSport == "Soccer") {
            allLeaguesList.push(data.leagues[i].strLeague);
          }
        }
        setLeague(allLeaguesList[0]);
      });
  }, []);

  useEffect(() => {
    fetch("https://www.thesportsdb.com/api/v1/json/1/all_leagues.php")
      .then((resp) => resp.json())
      .then((data) => {
        for (let i = 0; i < data.leagues.length; i++) {
          if (data.leagues[i].strSport == "Soccer") {
            allLeaguesList.push(data.leagues[i].strLeague);
          }
        }
      });
  }, [league]);

  // functions
  const getRandomLeague = () => {
    randomNumber = Math.floor(Math.random(allLeaguesList.length) * 100);
    setLeague(allLeaguesList[randomNumber]);
    console.log(allLeaguesList[randomNumber]);
    console.log(allLeaguesList);
    console.log(randomNumber);
  };

  return (
    <div className="layout-grid">
      <SideBar league={league} />
      <div className="content">
        <div className="header">
          <img src={topFiveLogo} alt="logo" />
          <div className="search-bar">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input type="text" placeholder="Search for a league..." />
          </div>
          <button onClick={getRandomLeague}>Random League</button>
        </div>
        <h1>{league}</h1>
      </div>
    </div>
  );
}

export default App;
