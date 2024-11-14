import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import { HomePage } from "../components/home-page/HomePage";
import { AddCatProfile } from "../components/cat-profiles/AddCatProfile";
import { CatDetails } from "../components/cat-profiles/CatDetails";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localCatShareUser = localStorage.getItem("catShare_user");
    const catShareUserObj = JSON.parse(localCatShareUser);

    setCurrentUser(catShareUserObj);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route path="home-page">
          <Route index element={<HomePage />} />
          <Route
            path=":catProfileId"
            element={<CatDetails currentUser={currentUser} />}
          />
        </Route>

        <Route
          path="add-catprofile"
          element={<AddCatProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
