import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCatBreeds,
  getCatProfileByIdWithBreedandSex,
  getCatSexes,
  updateCatProfile,
} from "../../services/catServices";

export const EditCatProfile = () => {
  const navigate = useNavigate();
  const { catProfileId } = useParams();
  const [catSexes, setCatSexes] = useState([]);
  const [currentCatProfile, setCurrentCatProfile] = useState({});
  const [catBreeds, setCatBreeds] = useState([]);

  useEffect(() => {
    getCatProfileByIdWithBreedandSex(catProfileId).then(setCurrentCatProfile);
  }, [catProfileId]);

  useEffect(() => {
    getCatSexes().then(setCatSexes);
  }, []);

  useEffect(() => {
    getCatBreeds().then(setCatBreeds);
  }, []);

  const handleInputChange = (event) => {
    const copy = { ...currentCatProfile };
    if (event.target.name === "name") {
      copy[event.target.name] = event.target.value;
      setCurrentCatProfile(copy);
    } else {
      copy[event.target.name] = parseInt(event.target.value);
      setCurrentCatProfile(copy);
    }
  };
  const handleSocialRadioChange = (event) => {
    const radioValue = event.target.value === "true";
    const copy = { ...currentCatProfile };
    copy[event.target.name] = radioValue;
    setCurrentCatProfile(copy);
  };
  const handlePublicRadioChange = (event) => {
    const radioValue = event.target.value === "true";
    const copy = { ...currentCatProfile };
    copy[event.target.name] = radioValue;
    setCurrentCatProfile(copy);
  };

  const handleFixedRadioChange = (event) => {
    const radioValue = event.target.value === "true";
    const copy = { ...currentCatProfile };
    copy[event.target.name] = radioValue;
    setCurrentCatProfile(copy);
  };

  const handleSave = (catProfile) => {
    const cleanProfile = {
      id: currentCatProfile.id,
      name: currentCatProfile.name,
      weight: currentCatProfile.weight,
      age: currentCatProfile.age,
      isSocial: currentCatProfile.isSocial,
      isPublic: currentCatProfile.isPublic,
      userId: currentCatProfile.userId,
      catSexId: currentCatProfile.catSexId,
    };
    updateCatProfile(cleanProfile).then(navigate("/home-page"));
  };

  if (!catBreeds.length || !currentCatProfile.catBreedId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <div className="card-outer">
        <div className="cat-details">
          <div className="cat-name-input">
            <h3>Cat Name:</h3>
            <input
              placeholder={currentCatProfile.name}
              type="text"
              name="name"
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
          </div>
          <div className="cat-age-input">
            <h3>Cat Age:</h3>
            <input
              type="number"
              placeholder={currentCatProfile.age}
              name="age"
              onChange={(event) => {
                handleInputChange(event);
              }}
            />
          </div>
          <div className="cat-weight-input">
            <h3>Cat Weight:</h3>
            <input
              type="number"
              name="weight"
              onChange={(event) => {
                handleInputChange(event);
              }}
              placeholder={currentCatProfile.weight}
            />
          </div>
          <div className="cat-sex-dropdown">
            {catSexes.map((sex) => {
              return (
                <div key={sex.id}>
                  <input
                    type="radio"
                    name="catSexId"
                    value={sex.id}
                    checked={sex.id === currentCatProfile.catSexId}
                    onChange={(event) => {
                      handleInputChange(event);
                    }}
                  />
                  <label htmlFor={`sex-${sex.id}`}>{sex.type}</label>
                </div>
              );
            })}
          </div>
          <div className="breed-dropdown">
            <h3>Cat Breed:</h3>
            <select
              onChange={(event) => {
                handleInputChange(event);
              }}
              className="breed-dropdown"
              name="catBreedId"
              defaultValue={currentCatProfile.catBreedId}
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
          <div className="social-button-container">
            <h3>Social?</h3>
            <input
              className="social-buttons"
              id="1"
              type="radio"
              name="isSocial"
              value="true"
              checked={currentCatProfile.isSocial === true}
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
              checked={currentCatProfile.isSocial === false}
              onChange={(event) => {
                handleSocialRadioChange(event);
              }}
            />
            <label htmlFor={`isSocial-2`}>No</label>
          </div>
          <div className="public-buttons-container">
            <h3>Public?</h3>
            <input
              className="public-buttons"
              id="1"
              type="radio"
              name="isPublic"
              value="true"
              checked={currentCatProfile.isPublic === true}
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
              checked={currentCatProfile.isPublic === false}
              onChange={(event) => {
                handlePublicRadioChange(event);
              }}
            />
            <label htmlFor={`isPublic-2`}>No</label>
          </div>
          <div className="fixed-buttons">
            <h3>Is your cat Fixed?</h3>
            <input
              className="fixed-buttons"
              id="1"
              type="radio"
              name="isFixed"
              value="true"
              checked={currentCatProfile.isFixed === true}
              onChange={() => {
                handleFixedRadioChange(event);
              }}
            />
            <label htmlFor={`isFixed-1`}>Yes</label>
            <input
              className="fixed-buttons"
              id="2"
              type="radio"
              name="isFixed"
              value="false"
              checked={currentCatProfile.isFixed === false}
              onChange={() => {
                handleFixedRadioChange(event);
              }}
            />
            <label htmlFor={`isFixed-2`}>No</label>
          </div>
          <div className="save-button">
            <button
              onClick={() => {
                handleSave(currentCatProfile);
              }}
            >
              {" "}
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
