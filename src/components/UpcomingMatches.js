import { React, useEffect, useState } from "react";

import axios from "axios";

function UpcomingMatches({ leagueId }) {
  // variables
  const url = `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${leagueId}`;

  // useState
  const [matchDay, setMatchDay] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      if (response.data.events) {
        let week = response.data.events[0].intRound;
        setMatchDay(`Match Day ${week}`);
        setResults(response.data.events);
      } else {
        setMatchDay(`No previous matches`);
      }
    });
  }, [url]);

  console.log(results);

  return (
    <div>
      <h4>{matchDay}</h4>
    </div>
  );
}

export default UpcomingMatches;
