import React, { useState, useEffect } from "react";

const Table = () => {
  // variables
  const url =
    "https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=4328";
  // states
  const [items, setItems] = useState(null);
  // api call
  useEffect(async () => {
    let resp = await fetch(url);
    let data = await resp.json();
    const [league] = data.leagues;
    setItems(league);
  }, []);

  if (items) {
    return (
      <div>
        <img src={items.strBanner} alt="league banner" />
        <h3>this is the {items.strLeague}</h3>
        <p>{items.strDescriptionEN}</p>
      </div>
    );
  }

  return <div>loading...</div>;
};

export default Table;
