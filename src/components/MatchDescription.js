import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function MatchDescription({ description, toggleDescription }) {
  return (
    <div className="modal-background" onClick={toggleDescription}>
      <div className="modal-container">
        <FontAwesomeIcon className="modal-exit" icon={faTimes} />
        <div className="modal">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default MatchDescription;
