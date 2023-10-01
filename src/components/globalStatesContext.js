import { createContext } from "react";
import { useState, React } from "react";

export const globalStatesContext = createContext({});

const Provider = globalStatesContext.Provider;

export const GlobalStatesProvider = ({ children }) => {
  const [postList, setPostList] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [fullList, setFullList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userServerId, setUserServerId] = useState("");
  const [username, setUsername] = useState(() => {
    const savedUser = localStorage.getItem("userInput");
    const parsedUser = JSON.parse(savedUser);
    if (parsedUser) return parsedUser || "";
  });

  const runningCount = responseData.length;

  const value = {
    runningCount,
    postList,
    setPostList,
    responseData,
    setResponseData,
    fullList,
    setFullList,
    isLoggedIn,
    setIsLoggedIn,
    userLogin,
    setUserLogin,
    userPassword,
    setUserPassword,
    userServerId,
    setUserServerId,
    username,
    setUsername,
  };
  return <Provider value={value}>{children}</Provider>;
};
