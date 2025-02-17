import { useEffect, useState } from "react";
import "./AddFeedingSchedules.css";
import { getCatProfileWithAMatchingUserId } from "../../services/catServices";
import { addNewSchedule } from "../../services/userServices";
import { useNavigate } from "react-router-dom";

export const AddFeedingSchedules = ({ currentUser }) => {
  const navigate = useNavigate();
  const [newFeedingSchedule, setNewFeedingSchedule] = useState({
    id: 0,
    firstTime: "",
    secondTime: "",
    thirdTime: "",
    catEntryId: 0,
  });

  const [refreshKey, setRefreshKey] = useState(0);

  const [usersCatEntries, setusersCatEntries] = useState([]);

  useEffect(() => {
    getCatProfileWithAMatchingUserId(currentUser.id).then(setusersCatEntries);
  }, [currentUser]);

  // const handleInputChange = (event) => {
  //   const copy = { ...currentProfile };
  //   if (event.target.name === "name" || event.target.name === "pictureUrl") {
  //     copy[event.target.name] = event.target.value;
  //     setCurrentProfile(copy);
  //   } else {
  //     copy[event.target.name] = parseInt(event.target.value);
  //     setCurrentProfile(copy);
  //   }
  // };

  const handleTimeChange = (event) => {
    const copy = { ...newFeedingSchedule };
    copy[event.target.name] = event.target.value;
    setNewFeedingSchedule(copy);
  };
  const handleSelectChange = (event) => {
    const copy = { ...newFeedingSchedule };
    copy[event.target.name] = parseInt(event.target.value);
    setNewFeedingSchedule(copy);
  };
  const handleSave = (newFeedingSchedule) => {
    addNewSchedule(newFeedingSchedule).then(
      navigate("/reminders", { state: { key: refreshKey + 1 } })
    );
  };

  return (
    <div className="schedule-outer">
      <div className="schedule-form-container">
        <h1>New Schedule</h1>
        <div className="first-time">
          <h3>First Time:</h3>
          <input
            type="time"
            className="first-time-input"
            name="firstTime"
            onChange={() => {
              handleTimeChange(event);
            }}
          />
        </div>
        <div className="second-time">
          <h3>Second Time:</h3>
          <input
            type="time"
            className="second-time-input"
            name="secondTime"
            onChange={() => {
              handleTimeChange(event);
            }}
          />
        </div>
        <div className="third-time">
          <h3>Third Time:</h3>
          <input
            type="time"
            className="third-time-input"
            name="thirdTime"
            onChange={() => {
              handleTimeChange(event);
            }}
          />
        </div>
        <div className="cat-entry-selector">
          <h3>Which cat entry?</h3>
          <select
            className="cat-entry-dropdown"
            name="catEntryId"
            onChange={() => {
              handleSelectChange(event);
            }}
          >
            <option value="0">Choose</option>
            {usersCatEntries.map((cat) => {
              return (
                <option value={cat.id} key={cat.id} id={cat.id}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="schedule-button">
          <button
            onClick={() => {
              handleSave(newFeedingSchedule);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
