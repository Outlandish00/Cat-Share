import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import { HomePage } from "../components/home-page/HomePage";
import { AddCatProfile } from "../components/cat-profiles/AddCatProfile";
import { CatDetails } from "../components/cat-profiles/CatDetails";
import { EditCatProfile } from "../components/cat-profiles/EditCatProfile";
import { UserProfile } from "../components/user-profiles/UserProfile";
import { EditUserProfile } from "../components/user-profiles/EditUserProfile";
import { FeedingSchedules } from "../components/feeding-reminders/FeedingSchedules";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

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
            <NavBar setSearchTerm={setSearchTerm} currentUser={currentUser} />
            <Outlet />
          </>
        }
      >
        <Route path="home-page">
          <Route index element={<HomePage searchTerm={searchTerm} />} />
          <Route
            path=":catProfileId"
            element={<CatDetails currentUser={currentUser} />}
          />
          <Route
            path="/home-page/:catProfileId/edit"
            element={<EditCatProfile />}
          />
        </Route>

        <Route
          path="add-catprofile"
          element={<AddCatProfile currentUser={currentUser} />}
        />
        <Route path="profile">
          <Route index element={<UserProfile currentUser={currentUser} />} />
          <Route
            path="edit"
            element={<EditUserProfile currentUser={currentUser} />}
          />
        </Route>
        <Route
          path="reminders"
          element={
            <FeedingSchedules
              currentUser={currentUser}
              key={location.pathname}
            />
          }
        />
      </Route>
    </Routes>
  );
};
