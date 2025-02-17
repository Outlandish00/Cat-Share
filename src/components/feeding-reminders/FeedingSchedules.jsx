import { useEffect, useState } from "react";
import { getCatsWithUserIdAndReminders } from "../../services/userServices";
import "./FeedingSchedules.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteFeedingSchedule } from "../../services/feedingscheduleServices";

export const FeedingSchedules = ({ currentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usersCatEntriesWithReminders, setUsersCatEntriesWithReminders] =
    useState([]);

  useEffect(() => {
    getCatsWithUserIdAndReminders(currentUser.id).then(
      setUsersCatEntriesWithReminders
    );
  }, [currentUser]);

  useEffect(() => {
    if (location.state?.key) {
      getCatsWithUserIdAndReminders(currentUser.id).then(
        setUsersCatEntriesWithReminders
      );
    }
  }, [location.state?.key, currentUser.id]);

  const handleDelete = (ReminderId) => {
    deleteFeedingSchedule(ReminderId).then(
      getCatsWithUserIdAndReminders(currentUser.id).then(
        setUsersCatEntriesWithReminders
      )
    );
  };
  return (
    <>
      <div className="reminders-outer">
        <div className="reminders-card-container">
          {usersCatEntriesWithReminders.map((catEntry) => {
            const feedingSchedule = catEntry.feedingSchedules[0];
            if (feedingSchedule) {
              return (
                <div className="reminders-card-outer" key={catEntry.id}>
                  <div className="cat-name-container">
                    {catEntry.name}{" "}
                    <FontAwesomeIcon
                      className="edit-reminders-pencil"
                      icon={faPencil}
                      onClick={() => {
                        navigate("/reminders/reminders-edit", {
                          state: { catId: catEntry.feedingSchedules[0].id },
                        });
                      }}
                    />
                  </div>
                  <div className="first-container">
                    <h2>First Time:</h2>
                    <h2>
                      {" "}
                      {feedingSchedule
                        ? feedingSchedule.firstTime
                        : "No Time Available"}{" "}
                    </h2>
                  </div>
                  <div className="second-container">
                    <h2>Second Time:</h2>
                    <h2>
                      {feedingSchedule
                        ? feedingSchedule.secondTime
                        : "No Time available"}
                    </h2>
                  </div>
                  <div className="third-container">
                    <h2>Third Time:</h2>
                    <h2>
                      {feedingSchedule
                        ? feedingSchedule.thirdTime
                        : "No Time Available"}
                    </h2>
                  </div>
                  <FontAwesomeIcon
                    id={catEntry.feedingSchedules[0].id}
                    className="reminder-delete-button"
                    icon={faTrash}
                    onClick={(event) => {
                      handleDelete(event.currentTarget.id);
                    }}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="new-reminders-btn">
        <button
          onClick={() => {
            navigate("/reminders/reminders-add");
          }}
        >
          New Reminder
        </button>
      </div>
    </>
  );
};
