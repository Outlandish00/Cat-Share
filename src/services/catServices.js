export const getCatEntriesIfPublic = () => {
  return fetch("http://localhost:8088/catEntries?isPublic=true").then((res) =>
    res.json()
  );
};
