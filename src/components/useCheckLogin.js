import { useEffect } from "react";

export const useCheckLogin = (setUserServerId, setIsLoggedIn) => {
  useEffect(() => {
    let timerId = setTimeout(() => {
      const userServerID = localStorage.getItem("userServerId");

      if (userServerID) {
        setIsLoggedIn(true);
        setUserServerId(userServerID);
      } else {
        setIsLoggedIn(false);
      }
      timerId = null;
    }, 6000);
    return () => clearTimeout(timerId);
  }, []);
};
