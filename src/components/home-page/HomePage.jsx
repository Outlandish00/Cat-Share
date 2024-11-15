import { useEffect, useState } from "react";
import { getCatEntriesIfPublicWithBreedAndSex } from "../../services/catServices";
import "./HomePage.css";
import { Link } from "react-router-dom";

export const HomePage = ({ searchTerm }) => {
  const [publicCatEntries, setPublicCatEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  useEffect(() => {
    getCatEntriesIfPublicWithBreedAndSex().then(setPublicCatEntries);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredEntries(publicCatEntries);
    } else {
      const foundEntries = publicCatEntries.filter((entry) =>
        entry.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(foundEntries);
    }
  }, [searchTerm, publicCatEntries]);

  return (
    <div className="outer-container">
      {filteredEntries.map((catObj) => {
        return (
          <>
            <Link to={`/home-page/${catObj.id}`}>
              <div key={filteredEntries.id} className="card-outer">
                <div className="image-container">
                  <div className="cat-details">
                    <h2>{catObj.name}</h2>
                    <h2>{catObj.age} years old</h2>
                    <h3>
                      {catObj.isSocial
                        ? "This cat is social!"
                        : "This cat isn't social"}
                    </h3>
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};
