import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import userContext from "../../context/userContext";

export default function AuthOptions() {
  const { userData, setUserData } = useContext(userContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/");
  const example = () => history.push("/example");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user_id", "");
    history.push("/");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <>
          <button
            class="btn btn-outline-secondary mx-2"
            onClick={logout}
            style={{ borderRadius: "4rem" }}
          >
            Log out
          </button>
        </>
      ) : (
        <>
          <button
            class="btn btn-outline-secondary mx-2"
            onClick={register}
            style={{ borderRadius: "4rem" }}
          >
            Sign Up
          </button>
          <button
            class="btn btn-outline-secondary mx-2"
            onClick={login}
            style={{ borderRadius: "4rem" }}
          >
            Login
          </button>
        </>
      )}
    </nav>
  );
}
