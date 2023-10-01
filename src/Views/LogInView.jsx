import { useState, useContext, useEffect } from "react";
import { globalStatesContext } from "../components/globalStatesContext";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import axios from "axios";
export const LogInView = () => {
  const navigate = useNavigate();
  const apiURL = `https://6446a9ff0431e885f018a981.mockapi.io/users`;
  const context = useContext(globalStatesContext);
  const {
    setIsLoggedIn,
    userLogin,
    isLoggedIn,
    setUserLogin,
    userPassword,
    setUserPassword,
    userServerId,
    setUsername,
  } = context;

  const [isError, setIsError] = useState(false);

  const handleInput = (e) => {
    setUserLogin(e.target.value);
  };

  const handlePass = (e) => {
    setUserPassword(e.target.value);
  };

  const editLogin = (e) => {
    e.preventDefault();
    setUserLogin(userLogin);
    setUsername(userLogin);
    setUserPassword(setUserPassword);
    try {
      axios.put(`${apiURL}/${userServerId}`, {
        headers: { "content-type": "application/json" },
        login: userLogin,
        password: userPassword,
      });

      window.alert("your login info has been updated :)");
    } catch (err) {
      console.log(err, "error in trying to update user");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("clicked");
    const filterURL = new URL(apiURL);
    filterURL.searchParams.append("login", userLogin);
    filterURL.searchParams.append("password", userPassword);
    try {
      axios.get(filterURL).then((resp) => {
        console.log(resp);
        const user = resp.data;
        console.log(user);
        if (user[0].login == userLogin && user[0].password == userPassword) {
          setUsername(userLogin);
          setIsLoggedIn(true);
          navigate("/");
        } else {
          window.alert("hmmm, try entering your username and password again");
        }
      });
    } catch (err) {
      console.log(err);
      window.alert("something went wrong with your username.. try again?");
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <AuthForm
        isCreating={false}
        onChangeUser={handleInput}
        onChangePass={handlePass}
        onClick={isLoggedIn ? editLogin : handleLogin}
        userLogin={userLogin}
        userPassword={userPassword}
      ></AuthForm>
      <h3>{isError ? "Sorry, your username or password didn't match" : ""}</h3>
    </div>
  );
};
