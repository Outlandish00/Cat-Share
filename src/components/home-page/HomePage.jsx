import { useEffect, useState } from "react";
import { getCatEntriesIfPublic } from "../../services/catServices";
import "./HomePage.css";

export const HomePage = () => {
  const [publicCatEntries, setPublicCatEntries] = useState([]);

  useEffect(() => {
    getCatEntriesIfPublic().then(setPublicCatEntries);
  }, []);

  return (
    <div className="outer-container">
      {publicCatEntries.map((catObj) => {
        return (
          <div className="card-outer">
            <div className="image-container">
              <div className="cat-details">
                <h2>{catObj.name}</h2>
                <h2>{catObj.age} years old</h2>
                <h3>Sex</h3>
                <h3>Location</h3>
                <h3>
                  {catObj.isSocial
                    ? "This cat is social!"
                    : "This cat isn't social"}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
