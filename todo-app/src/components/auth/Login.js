import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import Cal from "../../images/todo1.png";
import constants from "../../constants/constants"

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        constants.backend_url + "/users/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      localStorage.setItem("user_id", loginRes.data.user.id);
      history.push("/home");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <div class="p-3 mb-2 text-white ">
        <div
          class="container-lg  shadow p-3 mb-5  text-dark  "
          style={{ marginTop: "4%", backgroundColor: "white" }}
        >
          <div class="row row-cols-2" style={{ marginTop: "1%" }}>
            <div class="col  ">
              <img src={Cal} className="img-fluid" alt="Responsive image" />
            </div>
            <div class="col ">
              <div class="container-sm   p-3 mb-5 bg-body rounded bg-light text-dark ">
                <div>
                  <div class="mx-auto">
                    <h2>Login</h2>
                  </div>
                  <p>Please Login to your Acount</p>
                  {error && (
                    <ErrorNotice
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )}
                  <div>
                    <form onSubmit={submit}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="login-email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="login-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-dark px-4"
                        value="Log in"
                      >
                        Sign In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
