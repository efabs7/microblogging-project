import { NavLink } from "react-router-dom";
import { globalStatesContext } from "./globalStatesContext";
import { useContext } from "react";
import "../App.css";

export const NavBar = () => {
  const context = useContext(globalStatesContext);
  const {
    runningCount,
    fullList,
    isLoggedIn,
    setIsLoggedIn,
    setUserLogin,
    setUserPassword,

    setUsername,
  } = context;
  const navStyle = {
    height: "58px",
    width: "1076px",
    background: "var(--background-text)",
    borderRadius: "var(--border-radius-m)",
    color: "var(--header-text)",
    marginBottom: "40px",
    paddingLeft: "30px",
    marginTop: "0px",
  };

  const signOutUser = () => {
    localStorage.setItem("userServerId", "");
    setIsLoggedIn(false);
    setUserLogin("");
    setUsername("");
    setUserPassword("");
  };
  return (
    <nav className="navbar " style={navStyle}>
      <div className="d-flex justify-content-start">
        <NavLink className="p-2 nav-item active" to="/">
          Home
        </NavLink>
        <NavLink className="p-2 nav-item" to="/profile">
          Profile
        </NavLink>

        <p className="p-2 nav-item running-count">
          {runningCount === 0
            ? "(Loading posts...)"
            : `(showing ${runningCount} posts of: ${
                fullList < runningCount ? "total unavailable)" : `${fullList})`
              }`}
        </p>
      </div>
      <div className="d-flex justify-content-end">
        <NavLink className="p-2 nav-item" to="/signup">
          {isLoggedIn ? "" : "Sign Up"}
        </NavLink>
        <NavLink className="p-2 nav-item" to={"/login"}>
          {isLoggedIn ? "Edit Login" : "Log In"}
        </NavLink>
        <NavLink className="p-2 nav-item" to="/signup" onClick={signOutUser}>
          {isLoggedIn ? "Sign Out" : ""}
        </NavLink>
      </div>
    </nav>
  );
};
