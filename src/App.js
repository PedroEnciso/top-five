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
  const AUTOCOMPLETE_OPTIONS = 4;
  let suggestions = [];

  //useState
  const [league, setLeague] = useState(null);
  const [leagueList, setLeagueList] = useState(null);
  const [leagueId, setLeagueId] = useState(0);
  const [leagueIdList, setLeagueIdList] = useState(null);
  const [suggestedLeagues, setSuggestedLeagues] = useState([]);

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
    setSuggestedLeagues([]);
  };

  const loadSuggestions = (event) => {
    const userInput = capitalizeInput(event.target.value);
    suggestions = leagueList.filter((league) => {
      return league.includes(userInput);
    });
    if (suggestions.length > AUTOCOMPLETE_OPTIONS) {
      suggestions.length = AUTOCOMPLETE_OPTIONS;
    }
    setSuggestedLeagues(suggestions);
  };

  const chooseSuggestion = (event) => {
    const chosenSuggestion = event.target;
    setLeague(chosenSuggestion.innerHTML);
    // clear suggestion box
    setSuggestedLeagues([]);
    // update league ID
    const index = leagueList.indexOf(chosenSuggestion.innerHTML);
    setLeagueId(leagueIdList[index]);
  };

  const capitalizeInput = (userInput) => {
    if (!userInput) {
      return;
    }
    const words = userInput.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i]) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    return words.join(" ");
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
              onKeyUp={(event) => loadSuggestions(event)}
              type="text"
              placeholder="Search for a league..."
            />
          </div>
          <button onClick={getRandomLeague}>Random League</button>
          <div className="suggestion-container">
            {suggestedLeagues.map((league) => (
              <div key={league} onClick={(event) => chooseSuggestion(event)}>
                <p>{league}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
        <h1>{league}</h1>
        <p>The League ID is {leagueId}</p>
      </div>
    </div>
  );
}

export default App;
