export const getFeedingSchedulesWithCatEntries = () => {
  return fetch("http://localhost:8088/feedingSchedules?_embed=catEntries").then(
    (res) => res.json()
  );
};
