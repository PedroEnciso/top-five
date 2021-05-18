import { React, useState, useEffect } from "react";
import axios from "axios";

function LeagueTable({ leagueId }) {
  // varibales
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId}&s=2020-2021`;

  // state
  const [standings, setStandings] = useState([]);

  // fetch
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data.table);
    });
  }, [url]);
  return (
    <div>
      <h4>League Table</h4>
      <div className="league-table"></div>
    </div>
  );
}

export default LeagueTable;
