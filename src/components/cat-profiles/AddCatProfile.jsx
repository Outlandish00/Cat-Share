import { useEffect, useState } from "react";
import {
  addCatProfile,
  getCatBreeds,
  getCatSexes,
} from "../../services/catServices";
import { useNavigate } from "react-router-dom";

export const AddCatProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [catSexes, setCatSexes] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({
    id: 0,
    name: "",
    weight: 0,
    age: 0,
    isSocial: false,
    isPublic: false,
    catBreedId: 0,
    userId: 0,
    feedingScheduleId: 0,
  });

  useEffect(() => {
    if (currentUser.id) {
      setCurrentProfile((prevProfile) => ({
        ...prevProfile,
        userId: currentUser.id,
      }));
    }
  }, [currentUser]);

  const handleAddButton = () => {
    addCatProfile(currentProfile).then(() => {
      navigate("/home-page");
    });
  };

  const handleInputChange = (event) => {
    const copy = { ...currentProfile };
    if (event.target.name === "name") {
      copy[event.target.name] = event.target.value;
      setCurrentProfile(copy);
    } else {
      copy[event.target.name] = parseInt(event.target.value);
      setCurrentProfile(copy);
    }
  };

  const handleSocialRadioChange = (event) => {
    const radioValue = event.target.value === "true";
    const copy = { ...currentProfile };
    copy[event.target.name] = radioValue;
    setCurrentProfile(copy);
  };

  const handlePublicRadioChange = (event) => {
    const radioValue = event.target.value === "true";
    const copy = { ...currentProfile };
    copy[event.target.name] = radioValue;
    setCurrentProfile(copy);
  };

  useEffect(() => {
    getCatSexes().then(setCatSexes);
  }, []);

  useEffect(() => {
    getCatBreeds().then(setCatBreeds);
  }, []);

  return (
    <div className="outer-container">
      <div className="profile-container">
        <input
          type="text"
          name="name"
          onChange={(event) => {
            handleInputChange(event);
          }}
          placeholder="Enter your cat's name"
        />
        <input
          type="number"
          name="age"
          onChange={(event) => {
            handleInputChange(event);
          }}
          placeholder="Enter your cat's age"
        />
        <input
          type="number"
          name="weight"
          onChange={(event) => {
            handleInputChange(event);
          }}
          placeholder="Enter your cat's weight"
        />
        {catSexes.map((sex) => {
          return (
            <div key={sex.id}>
              <input
                type="radio"
                name="sex"
                value={sex.id}
                onChange={(event) => {
                  handleInputChange(event);
                }}
              />
              <label htmlFor={`sex-${sex.id}`}>{sex.type}</label>
            </div>
          );
        })}
        <div className="breed-dropdown">
          <select
            onChange={(event) => {
              handleInputChange(event);
            }}
            className="breed-dropdown"
            name="catBreedId"
          >
            <option value="0">Choose a cat breed</option>
            {catBreeds.map((breed) => {
              return (
                <option key={breed.id} value={breed.id}>
                  {breed.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="social-buttons-container">
          <input
            className="social-buttons"
            id="1"
            type="radio"
            name="isSocial"
            value="true"
            onChange={(event) => {
              handleSocialRadioChange(event);
            }}
          />
          <label htmlFor={`isSocial-1`}>Yes</label>
          <input
            className="social-buttons"
            id="2"
            type="radio"
            name="isSocial"
            value="false"
            onChange={(event) => {
              handleSocialRadioChange(event);
            }}
          />
          <label htmlFor={`isSocial-2`}>No</label>
        </div>
        <div className="public-buttons-container">
          <input
            className="public-buttons"
            id="1"
            type="radio"
            name="isPublic"
            value="true"
            onChange={(event) => {
              handlePublicRadioChange(event);
            }}
          />
          <label htmlFor={`isPublic-1`}>Yes</label>
          <input
            className="public-buttons"
            id="2"
            type="radio"
            name="isPublic"
            value="false"
            onChange={(event) => {
              handlePublicRadioChange(event);
            }}
          />
          <label htmlFor={`isPublic-2`}>No</label>
        </div>
        <div className="add-btn">
          <button name="add-button" onClick={handleAddButton}>
            Add Cat
          </button>
        </div>
      </div>
    </div>
  );
};
