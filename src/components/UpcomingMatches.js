import { React, useEffect, useState } from "react";
import Match from "./Match";
import axios from "axios";

function UpcomingMatches({ leagueId }) {
  // variables
  const url = `https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${leagueId}`;

  // useState
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(url).then((response) => {
      if (response.data.events) {
        setResults(response.data.events.slice(0, 10));
      }
    });
  }, [url]);

  return (
    <div className="upcoming-matches">
      <h4 className="title">Latest Results</h4>
      <div className="latest-results">
        {results.map((result) => (
          <Match result={result} key={result.idEvent} />
        ))}
      </div>
    </div>
  );
}

export default UpcomingMatches;
