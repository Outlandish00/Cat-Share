export const getCatEntriesIfPublicWithBreedAndSex = () => {
  return fetch(
    "http://localhost:8088/catEntries?isPublic=true&_expand=catBreed&_expand=catSex"
  ).then((res) => res.json());
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

export const getCatProfileByIdWithBreedandSex = (catId) => {
  return fetch(
    `http://localhost:8088/catEntries/${catId}?_expand=catBreed&_expand=catSex`
  ).then((res) => res.json());
};

export const deleteCatProfile = (catId) => {
  return fetch(`http://localhost:8088/catEntries/${catId}`, {
    method: "DELETE",
  });
};

export const updateCatProfile = (catProfile) => {
  return fetch(`http://localhost:8088/catEntries/${catProfile.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(catProfile),
  });
};

export const getCatProfileWithAMatchingUserId = (userId) => {
  return fetch(`http://localhost:8088/catEntries?userId=${userId}`).then(
    (res) => res.json()
  );
};
