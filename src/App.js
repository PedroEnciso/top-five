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
  const [leagueId, setLeagueId] = useState(0);
  const [leagueIdList, setLeagueIdList] = useState(null);

  useEffect(() => {
    let listOfLeagues = [];
    let listOfLeagueIds = [];
    axios.get(url).then((response) => {
      setLeague(response.data.leagues[0].strLeague);
      setLeagueId(response.data.leagues[0].idLeague);
      //setLeagueList(response.data.leagues);
      for (let i = 0; i < response.data.leagues.length; i++) {
        if (response.data.leagues[i].strSport === "Soccer") {
          listOfLeagues.push(response.data.leagues[i].strLeague);
          listOfLeagueIds.push(response.data.leagues[i].idLeague);
        }
      }
      setLeagueList(listOfLeagues);
      setLeagueIdList(listOfLeagueIds);
    });
  }, [url]);

  // functions
  const getRandomLeague = () => {
    randomNumber = Math.floor(Math.random(leagueList.length) * 100);
    setLeague(leagueList[randomNumber]);
    setLeagueId(leagueIdList[randomNumber]);
  };

  const keyup = () => {
    console.log("hello");
  };

  return (
    <div className="layout-grid">
      <SideBar league={league} />
      <div className="content">
        <div className="header">
          <img src={topFiveLogo} alt="logo" />
          <div className="search-bar">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input
              onKeyUp={keyup}
              type="text"
              placeholder="Search for a league..."
            />
          </div>
          <button onClick={getRandomLeague}>Random League</button>
        </div>
        <h1>{league}</h1>
        <p>The League ID is {leagueId}</p>
      </div>
    </div>
  );
}

export default App;
