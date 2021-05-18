import React from "react";
import LeagueTable from "./LeagueTable";

function InnerGrid({ leagueId }) {
  return (
    <div className="inner-grid">
      <LeagueTable leagueId={leagueId} />
    </div>
  );
}

export default InnerGrid;
