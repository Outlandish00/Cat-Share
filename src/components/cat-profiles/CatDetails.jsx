import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteCatProfile,
  getCatProfileByIdWithBreedandSex,
} from "../../services/catServices";

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
    <div className="outer-container">
      <div className="image-container"></div>
      <div className="cat-name">{currentCatProfile.name}</div>
      <div className="cat-age-sex">
        {currentCatProfile.catSex?.type || "Loading Cat Sex..."}
      </div>
      <div className="cat-breed">
        {currentCatProfile.catBreed?.name || "Loading Cat Breed..."}
      </div>
      <div className="cat-fixed">
        {currentCatProfile.isFixed
          ? "This cat IS fixed"
          : "This cat is NOT fixed."}
      </div>
      {currentCatProfile.isSocial
        ? "This cat IS social"
        : "This cat is NOT social"}
      {currentUser.id === currentCatProfile.userId ? (
        <>
          <div className="edit-button-container">
            <button
              className="edit-button"
              onClick={() => {
                navigate(`/home-page/${currentCatProfile.id}/edit`);
              }}
            >
              {" "}
              Edit Profile
            </button>
          </div>
          <div className="delete-button">
            <button
              onClick={() => {
                handleProfileDeletion(catProfileId);
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};
