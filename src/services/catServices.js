export const getCatEntriesIfPublic = () => {
  return fetch("http://localhost:8088/catEntries?isPublic=true").then((res) =>
    res.json()
  );
};

export const getCatSexes = () => {
  return fetch("http://localhost:8088/catSexes").then((res) => res.json());
};

export const getCatBreeds = () => {
  return fetch("http://localhost:8088/catBreeds").then((res) => res.json());
};

export const addCatProfile = (catProfile) => {
  return fetch(`http://localhost:8088/catEntries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catProfile),
  });
};
