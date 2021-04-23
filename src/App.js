// images
import topFiveLogo from "./img/top-five-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// components
import Table from "./components/Table";
import SideBar from "./components/SideBar";
// styles
import "./styles/app.scss";

function App() {
  return (
    <div className="layout-grid">
      <SideBar />
      <div className="content">
        <div className="header">
          <img src={topFiveLogo} alt="logo" />
          <div className="search-bar">
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <input type="text" placeholder="Search for a league" />
          </div>
        </div>
        <h1>English Premier League</h1>
      </div>
    </div>
  );
}

export default App;
