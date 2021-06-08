import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./components/css/style.css";
import UserContext from "./context/userContext";
import Navbar from "./components/layout/Navbar";
import constants from "./constants/constants";
import Completed from "./components/pages/Completed";
import Active from "./components/pages/Active";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        constants.backend_url + "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      console.log(tokenRes.data);
      if (tokenRes.data) {
        const userRes = await Axios.get(constants.backend_url + "/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/home" component={Home} />
              <Route path="/active" component={Active} />
              <Route path="/completed" component={Completed} />
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
