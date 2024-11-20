import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import CatShareLogo from "../../assets/CatShareLogoNoBackground.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userServices";

library.add(faMagnifyingGlass);

export const NavBar = ({ setSearchTerm, currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    getUserById(currentUser.id).then(setUserObj);
  }, [currentUser]);

  return (
    <ul className="navbar">
      {location.pathname === "/home-page" && (
        <li className="navbar-item-searchbar grow-searchbar">
          <>
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              className="search-icon"
            />
            <input
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              type="text"
              placeholder="Search Cat Profiles"
              className="search-bar-input"
            />
          </>
        </li>
      )}

      <li className="navbar-item-logo">
        <button
          onClick={() => {
            navigate("/home-page");
          }}
        >
          <img className="home-img" src={CatShareLogo} />
          CatShare
        </button>
      </li>
      <li className="navbar-item">
        <button
          onClick={() => {
            navigate("/add-catprofile");
          }}
        >
          Create a cat profile
        </button>
      </li>
      {localStorage.getItem("catShare_user") ? (
        <li className="navbar-item">
          <button
            onClick={() => {
              localStorage.removeItem("catShare_user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </li>
      ) : (
        ""
      )}
      <li className="navbar-item pfp-container">
        <Link to="profile">
          <img className="pfp-img" src={userObj.profilePic} />
        </Link>
      </li>
    </ul>
  );
};
