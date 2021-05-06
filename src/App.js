import { useEffect, useState } from "react";
// images
import topFiveLogo from "./img/top-five-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// components
import SideBar from "./components/SideBar";
import axios from "axios";
// styles
import "./styles/app.scss";

function App() {
  // variables
  let randomNumber;
  const url = "https://www.thesportsdb.com/api/v1/json/1/all_leagues.php";

  //useState
  const [league, setLeague] = useState(null);
  const [leagueList, setLeagueList] = useState(null);

  useEffect(() => {
    axios.get(url).then((response) => {
      setLeague(response.data.leagues[0].strLeague);
      setLeagueList(response.data.leagues);
    });
  }, [url]);

  // functions
  const getRandomLeague = () => {
    randomNumber = Math.floor(Math.random(leagueList.length) * 100);
    setLeague(leagueList[randomNumber].strLeague);
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
