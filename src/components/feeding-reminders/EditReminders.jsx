import { useLocation, useNavigate } from "react-router-dom";
import "./EditReminders.css";
import { useEffect, useState } from "react";
import {
  getReminderById,
  updateReminder,
} from "../../services/feedingscheduleServices";
export const EditReminders = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const catId = location.state?.catId;
  const [reminderObj, setReminderObject] = useState({});
  const [changedReminderObj, setChangedReminderObj] = useState({});
  useEffect(() => {
    getReminderById(catId).then(setChangedReminderObj);
  }, [catId]);
  useEffect(() => {
    getReminderById(catId).then(setReminderObject);
  }, [catId]);

  const handleChange = (event) => {
    const copy = { ...changedReminderObj };
    copy[event.target.name] = event.target.value;
    setChangedReminderObj(copy);
  };

  const handleSave = () => {
    updateReminder(changedReminderObj).then(navigate(`/reminders`));
  };

  return (
    <div className="edit-reminders-outside">
      <div className="edit-reminder-container">
        <h1>Edit Schedule</h1>
        <div className="edit-first-time">
          <h2>First Time:</h2>
          <input
            type="time"
            name="firstTime"
            className="edit-first-time-box"
            placeholder={reminderObj.firstTime}
            onChange={() => {
              handleChange(event);
            }}
          />
        </div>
        <div className="edit-second-time">
          <h2>Second Time:</h2>
          <input
            type="time"
            className="edit-second-time-box"
            name="secondTime"
            onChange={() => {
              handleChange(event);
            }}
          />
        </div>
        <div className="edit-third-time">
          <h2>Third Time:</h2>
          <input
            type="time"
            className="edit-third-time-box"
            name="thirdTime"
            onChange={() => {
              handleChange(event);
            }}
          />
        </div>

        <button
          className="edit-reminders-button"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};
