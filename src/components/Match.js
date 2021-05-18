import { React, useState, useEffect } from "react";
import axios from "axios";
//import MatchDescription from "./MatchDescription";

function Match({ result }) {
  // variables
  const urlHome = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${result.idHomeTeam}`;
  const urlAway = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${result.idAwayTeam}`;

  //state
  const [homeBadge, setHomeBadge] = useState(null);
  const [awayBadge, setAwayBadge] = useState(null);
  //const [showDescription, setShowDescription] = useState(false);

  // fetch
  useEffect(() => {
    axios.get(urlHome).then((response) => {
      setHomeBadge(response.data.teams[0].strTeamBadge);
    });
  }, [urlHome]);

  useEffect(() => {
    axios.get(urlAway).then((response) => {
      setAwayBadge(response.data.teams[0].strTeamBadge);
    });
  }, [urlAway]);

  /*
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };
  */

  return (
    <div className="match-card">
      <div className="match-info">
        <img src={homeBadge} alt="home team badge" />
        <h4>
          {result.intHomeScore} - {result.intAwayScore}
        </h4>
        <img src={awayBadge} alt="away team badge" />
      </div>
    </div>
  );
}

export default Match;

/*

  <div className="match-card" onClick={toggleDescription}>
      <div className="match-info">
        <div className="team">
          <img src={homeBadge} alt="home team badge" />
          <p>{result.strHomeTeam}</p>
        </div>
        <div className="score">
          <h4>
            {result.intHomeScore} - {result.intAwayScore}
          </h4>
        </div>
        <div className="team">
          <img src={awayBadge} alt="away team badge" />
          <p>{result.strAwayTeam}</p>
        </div>
      </div>
      {showDescription ? (
        <MatchDescription
          description={result.strDescriptionEN}
          toggleDescription={toggleDescription}
        />
      ) : null}
    </div>

*/
