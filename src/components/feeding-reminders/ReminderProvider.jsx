import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeedingSchedulesWithCatEntries } from "../../services/feedingscheduleServices";

const ReminderContex = createContext();

export const ReminderProvider = ({ children }) => {
  //State for reminders
  const [reminders, setReminders] = useState([]);

  //This gets and sets reminders
  useEffect(() => {
    getFeedingSchedulesWithCatEntries().then(setReminders);
  }, []);

  //This converts the time to 24 hour notation
  const convertTo24HourFormat = (time12) => {
    const [time, period] = time12.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours === 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  //This converts the time into 12 hour notation
  const convertTo12HourFormat = (time24) => {
    const [hours24, minutes] = time24.split(":").map(Number);

    const period = hours24 >= 12 ? "PM" : "AM";

    const hours12 = hours24 % 12 || 12;

    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      console.log(currentTime);

      reminders.forEach((reminder) => {
        const reminderTime24 = convertTo24HourFormat(reminder.firstTime);
        console.log(reminderTime24);
        if (convertTo24HourFormat(reminder.firstTime) === currentTime) {
          window.alert("Hello there!");
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);
  return (
    <ReminderContex.Provider value={{ reminders }}>
      {children}
    </ReminderContex.Provider>
  );
};
