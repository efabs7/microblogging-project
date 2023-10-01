import React from "react";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./Views/HomeView";
import { ProfileView } from "./Views/ProfileView";
import "./index.css";
import "./App.css";
import { globalStatesContext } from "./components/globalStatesContext";
import { NavBar } from "./components/NavBar";
import { LogInView } from "./Views/LogInView";
import { SignUpView } from "./Views/SignUpView";

function App() {
  const context = useContext(globalStatesContext);
  const { username, setUsername } = context;

  return (
    <div className="container" id="bootstrap-overrides">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<HomeView username={username} setUsername={setUsername} />}
        />
        <Route
          path="/profile"
          element={
            <ProfileView username={username} setUsername={setUsername} />
          }
        />
        <Route path="/login" element={<LogInView />} />
        <Route path="/signup" element={<SignUpView />} />
      </Routes>
    </div>
  );
}

export default App;
