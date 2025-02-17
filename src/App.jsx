import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./components/sign-in/SignIn";
import { Register } from "./components/sign-in/Register";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { ReminderProvider } from "./components/feeding-reminders/ReminderProvider";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ReminderProvider>
              <ApplicationViews></ApplicationViews>
            </ReminderProvider>
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
