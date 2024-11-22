import { useEffect, useState } from "react";
import { getCatsWithUserIdAndReminders } from "../../services/userServices";
import "./FeedingSchedules.css";
export const FeedingSchedules = ({ currentUser }) => {
  const [usersCatEntriesWithReminders, setUsersCatEntriesWithReminders] =
    useState([]);

  useEffect(() => {
    if (currentUser.id) {
      getCatsWithUserIdAndReminders(currentUser.id).then(
        setUsersCatEntriesWithReminders
      );
    }
  }, [currentUser]);

  return (
    <div className="reminders-outer">
      <div className="reminders-card-container">
        {usersCatEntriesWithReminders.map((catEntry) => {
          const feedingSchedule = catEntry.feedingSchedules[0];
          return (
            <div className="reminders-card-outer" key={catEntry.id}>
              <div className="cat-name-container">{catEntry.name}</div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};
