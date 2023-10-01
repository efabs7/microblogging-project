import { useState, useEffect, useContext } from "react";
import { globalStatesContext } from "../components/globalStatesContext";
import { AuthForm } from "../components/AuthForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpView = () => {
  const [userCreate, setUserCreate] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");
  const navigate = useNavigate();
  const apiURL = `https://6446a9ff0431e885f018a981.mockapi.io/users`;
  const context = useContext(globalStatesContext);
  const { setUserLogin, setUserPassword, setIsLoggedIn, setUsername } = context;

  const [isError, setIsError] = useState(false);
  const handleInput = (e) => {
    setUserCreate(e.target.value);
  };

  const handlePass = (e) => {
    setPasswordCreate(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    let newUser = {
      login: userCreate,
      password: passwordCreate,
    };
    try {
      axios
        .post(apiURL, {
          headers: { "content-type": "application/json" },
          login: newUser.login,
          password: newUser.password,
        })
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          console.log("successfully added new user");
          window.alert("thanks for signing up!");
          setUsername(userCreate);
          setUserLogin(userCreate);
          setUserPassword(passwordCreate);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          window.alert(" error detected pushing user");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <AuthForm
        isCreating={true}
        onChangeUser={handleInput}
        onChangePass={handlePass}
        onClick={handleSignUp}
        userLogin={userCreate}
        userPassword={passwordCreate}
      ></AuthForm>
      <h3>{isError ? "sorry, not a valid username or password" : ""}</h3>
    </div>
  );
};
