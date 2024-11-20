import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/userServices";
import "./EditUserProfile.css";
import { useNavigate } from "react-router-dom";

export const EditUserProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({});
  const [initalUserObj, setInitalUserObj] = useState({});

  useEffect(() => {
    getUserById(currentUser.id).then(setInitalUserObj);
  }, [currentUser]);

  useEffect(() => {
    getUserById(currentUser.id).then(setUserObj);
  }, [currentUser]);

  const handleInputChange = (event) => {
    const copy = { ...userObj };
    copy[event.target.name] = event.target.value;
    setUserObj(copy);
  };

  const handleSave = (user) => {
    updateUser(userObj).then(navigate("/profile"));
  };

  const handleBlur = (event) => {
    if (
      event.target.value === "" ||
      event.target.value === "0" ||
      event.target.value === null
    ) {
      const copy = { ...userObj };
      copy[event.target.name] = initalUserObj[event.target.name];
      setUserObj(copy);
    }
  };

  return (
    <div className="edit-outer">
      <div className="edit-profile-outer">
        <div className="image-preview">
          <img src={userObj.profilePic} />
        </div>
        <div className="image-url">
          <h3>Image URL:</h3>
          <input
            name="profilePic"
            type="text"
            placeholder={userObj.profilePic}
            onChange={(event) => {
              handleInputChange(event);
            }}
            onBlur={(event) => {
              handleBlur(event);
            }}
          />
        </div>
        <div className="username-input">
          <h3>UserName:</h3>
          <input
            type="text"
            name="userName"
            placeholder={userObj.userName}
            onChange={(event) => {
              handleInputChange(event);
            }}
            onBlur={(event) => {
              handleBlur(event);
            }}
          />
        </div>
        <div className="email-input">
          <h3>Email:</h3>
          <input
            name="email"
            type="email"
            placeholder={userObj.email}
            onChange={(event) => {
              handleInputChange(event);
            }}
            onBlur={(event) => {
              handleBlur(event);
            }}
          />
        </div>
        <div className="password-input">
          <h3>Password:</h3>
          <input
            type="password"
            name="password"
            placeholder={userObj.password}
            onChange={(event) => {
              handleInputChange(event);
            }}
            onBlur={(event) => {
              handleBlur(event);
            }}
          />
        </div>
        <div className="save-profile-button">
          <button
            onClick={(event) => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
