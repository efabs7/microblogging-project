import { Form } from "../components/Form";
import { useState, useContext } from "react";
import { globalStatesContext } from "../components/globalStatesContext";
import { LogInView } from "./LogInView";
export const ProfileView = () => {
  const [isError, setIsError] = useState(false);
  const context = useContext(globalStatesContext);
  const { isLoggedIn, setUsername, username } = context;

  const handleInput = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      setIsError(true);
      return;
    }
    setUsername(e.target.value);
    window.alert("username updated! :) your login info remains the same");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Form
            label="Profile"
            onClick={handleSubmit}
            onChange={handleInput}
            userInput={username}
          />
          <p>{isError ? "Please enter a username" : ""}</p>
        </div>
      ) : (
        <LogInView />
      )}
    </div>
  );
};
