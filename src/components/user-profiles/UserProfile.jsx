import { faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getUserById } from "../../services/userServices";
import { getCatProfileWithAMatchingUserId } from "../../services/catServices";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

export const UserProfile = ({ currentUser }) => {
  const navigate = useNavigate();

  const [userObj, setUserObj] = useState({});
  const [catProfiles, setCatProfiles] = useState([]);

  useEffect(() => {
    getUserById(currentUser.id).then(setUserObj);
  }, [currentUser]);

  useEffect(() => {
    getCatProfileWithAMatchingUserId(userObj.id).then(setCatProfiles);
  }, [userObj.id]);

  return (
    <div className="user-profile-outer">
      <div className="your-cat-entries">
        <div className="cat-entries-header">
          <div className="hiding-div"></div>
          <h2>Your Cat Entries</h2>
          <div
            className="plus-button"
            onClick={() => {
              navigate("/add-catprofile");
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </div>
        <div className="cat-entries-cards">
          {catProfiles.map((cat) => {
            return (
              <>
                <div
                  className="entry-card-outer"
                  onClick={() => {
                    navigate(`/home-page/${cat.id}`);
                  }}
                >
                  <div className="entry-image-container">
                    <img src={cat.pictureUrl} alt="cat-image" />
                  </div>
                  <div className="cat-name">{cat.name}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div className="profile-information">
        <div className="user-image-container">
          <img src={userObj.profilePic} />
          <FontAwesomeIcon
            icon={faPencil}
            className="profile-edit-pencil"
            onClick={() => {
              navigate();
            }}
          />
        </div>

        <div className="user-profile-information">
          <h3 className="user-name">{userObj.userName}</h3>
          <h3 className="user-email">Email: {userObj.email}</h3>
        </div>
      </div>
    </div>
  );
};
