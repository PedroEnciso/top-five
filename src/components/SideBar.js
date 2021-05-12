import { React, useEffect, useState } from "react";
import axios from "axios";

const SideBar = ({ leagueId }) => {
  // variables
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${leagueId}`;

  // state
  const [leagueBadge, setLeagueBadge] = useState(null);

  // fetch
  useEffect(() => {
    axios.get(url).then((response) => {
      if (response.data.leagues) {
        setLeagueBadge(response.data.leagues[0].strBadge);
      }
    });
  }, [url]);

  return (
    <div className="side-bar">
      <div className="league-badge-container">
        <img src={leagueBadge} alt="league badge" />
      </div>
    </div>
  );
};

export default SideBar;
