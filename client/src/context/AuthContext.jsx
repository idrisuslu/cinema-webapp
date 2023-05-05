import React, { createContext, useEffect, useState } from "react";
import { fetchMe, fetchAccessTokenByRefreshToken } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

//React Spinners
import SyncLoader from "react-spinners/SyncLoader";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const prevLocation = useLocation();

  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();

        setLoggedIn(true);
        setUser(me);

        console.log("me " + JSON.stringify(me));
        setLoading(false);
      } catch (err) {
        //Kullanıcı eğer giriş yapmamışsa veya giriş yapılmış fakat access token kullanım süresi...
        //....bitmişse aşağıdaki kodlar çalışacaktır.
        //------------------------------------------------
        try {
          const data = await fetchAccessTokenByRefreshToken();
          login(data);
          setLoading(false);
          // navigate("/");
          // navigate(prevLocation.pathname);
          return;
        } catch (err) {
          setLoading(false);
        }
        //-----------------------------------------------

        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        setLoading(false);
      }
    })();
  }, []);

  function login(data) {
    setLoggedIn(true);
    setUser(data.user);
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);

    navigate("/profile");
  }

  async function logout() {
    setLoggedIn(false);
    setUser(null);

    // await fetchLogout();

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

    navigate("/");
  }

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  if (loading) {
    return (
      <div className="d-flex position-absolute h-100 w-100 justify-content-center align-items-center top0">
        <SyncLoader size={35} />
      </div>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContext;
