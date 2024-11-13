import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate;

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/home-page">Home</Link>
      </li>
      <li className="navbar-item">
        <Link to="/create-catprofile"> Create a Cat Profile</Link>
      </li>
      {localStorage.getItem("catShare_user") ? (
        <li className="navbar-item">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("catShare_user");
              navigate("/");
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
