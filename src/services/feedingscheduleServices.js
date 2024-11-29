export const getFeedingSchedulesWithCatEntries = () => {
  return fetch("http://localhost:8088/feedingSchedules?_embed=catEntries").then(
    (res) => res.json()
  );
};

export const deleteFeedingSchedule = (id) => {
  return fetch(`http://localhost:8088/feedingSchedules/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getReminderById = (id) => {
  return fetch(`http://localhost:8088/feedingSchedules/${id}`).then((res) =>
    res.json()
  );
};

export const updateReminder = (reminderObj) => {
  return fetch(`http://localhost:8088/feedingSchedules/${reminderObj.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reminderObj),
  });
};
