import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/navbar/NavBar";
import { HomePage } from "../components/home-page/HomePage";

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
        <Route path="home-page" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
