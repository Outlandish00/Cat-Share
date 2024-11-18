import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCatProfile,
  getCatProfileByIdWithBreedandSex,
} from "../../services/catServices";
import "./CatDetails.css";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CatDetails = ({ currentUser }) => {
  const navigate = useNavigate();
  const { catProfileId } = useParams();

  const [currentCatProfile, setCurrentCatProfile] = useState({});

  const handleProfileDeletion = (catId) => {
    deleteCatProfile(catId).then(navigate("/home-page"));
  };

  useEffect(() => {
    getCatProfileByIdWithBreedandSex(catProfileId).then(setCurrentCatProfile);
  }, [catProfileId]);

  return (
    <div className="details-outer-container">
      <div className="details-container">
        <div className="details-image-container">
          {currentCatProfile.userId === currentUser.id ? (
            <FontAwesomeIcon
              icon={faPencil}
              className="edit-pencil"
              onClick={() => {
                navigate(`/home-page/${currentCatProfile.id}/edit`);
              }}
            />
          ) : (
            ""
          )}

          <img src={currentCatProfile.pictureUrl} alt="cat-picture" />
        </div>
        <div className="cat-name">{currentCatProfile.name}</div>
        <div className="cat-age-sex">
          <h3> {currentCatProfile.catSex?.type || "Loading Cat Sex..."} </h3>
          <h3>
            {" "}
            {currentCatProfile.age <= 1
              ? `${currentCatProfile.age} year old `
              : `${currentCatProfile.age} years old `}{" "}
          </h3>
        </div>
        <div className="cat-breed-fixed">
          <h3>{currentCatProfile.catBreed?.name || "Loading Cat Breed..."} </h3>
          <h3>
            {currentCatProfile.isFixed
              ? "This cat IS fixed"
              : "This cat is NOT fixed."}{" "}
          </h3>
        </div>
        <div className="social-container">
          {currentCatProfile.isSocial
            ? "This cat IS social"
            : "This cat is NOT social"}
        </div>
        {currentCatProfile.userId === currentUser.id ? (
          <FontAwesomeIcon
            icon={faTrash}
            className="delete-button"
            onClick={() => {
              handleProfileDeletion(catProfileId);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
