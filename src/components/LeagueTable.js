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
      if (response.data.table) {
        let standingsData = sortLeagueStandings(response.data.table);
        setStandings(standingsData);
      }
    });
  }, [url]);

  // functions
  const sortLeagueStandings = (standingsData) => {
    let leagueStandings = [];
    let leaguePosition;
    for (let j = 0; j < standingsData.length; j++) {
      for (let i = 0; i < standingsData.length; i++) {
        leaguePosition = standingsData[i].intRank - 1;
        if (leaguePosition === j) {
          leagueStandings.push(standingsData[i]);
        }
      }
    }
    return leagueStandings;
  };

  return (
    <div>
      <h4>League Table</h4>
      <table className="league-table">
        <thead>
          <tr>
            <td>Team</td>
            <td>P</td>
            <td>GD</td>
            <td>Pts</td>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.strTeam}>
              <td>{team.strTeam}</td>
              <td>{team.intPlayed}</td>
              <td>{team.intGoalDifference}</td>
              <td>{team.intPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;
