import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import LisItem from "../listItem/ListItem";
import ActiveTasks from "../activeTasks/ActiveTasks";
import constants from "../../constants/constants";
import axios from "axios";
export default function Home() {
  const history = useHistory();
  const { userData } = useContext(UserContext);
  const [values, setValues] = useState([]);
  const [todo, setToDo] = useState("");
  const getToDos = () => {
    var id = localStorage.getItem("user_id");

    axios
      .get(constants.backend_url + "/todo/" + id)
      .then((response) => {
        setValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const addTodo = (e) => {
    e.preventDefault();
    var id = localStorage.getItem("user_id");
    let data = {
      todo: todo,
      todo_status: "active",
      user_id: id,
    };
    axios
      .post(constants.backend_url + "/todo/add", data)
      .then((response) => {
        if (response.data.msg === "Successfully added") {
          setToDo("");
          getToDos();
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const markAsCompleted = (e) => {
    e.preventDefault();
    var id = localStorage.getItem("user_id");
    axios
      .post(constants.backend_url + "/todo/completed-all/" + id)
      .then((response) => {
        if (response.data.msg === "Todos Updated!") {
          getToDos();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location = "/home";
  };

  const markAsActive = (e) => {
    e.preventDefault();
    var id = localStorage.getItem("user_id");
    axios
      .post(constants.backend_url + "/todo/active-all/" + id)
      .then((response) => {
        if (response.data.msg === "Todos Updated!") {
          getToDos();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      window.location = "/home";
  };

  useState(() => {
    if (localStorage.getItem("user_id") === "") {
      history.push("/");
    } else {
      getToDos();
    }
  });

  return (
    <div>
      <div class="p-3 text-white ">
        <div
          class="container-lg  shadow p-3 mb-5  text-dark  "
          style={{ marginTop: "4%", backgroundColor: "white" }}
        >
          <div className="container">
            <form onSubmit={addTodo}>
              <div className="row" style={{ margin: "auto" }}>
                <div className="col-9 text-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Todo"
                    value={todo}
                    onChange={(e) => {
                      setToDo(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className="col text-center">
                  <div className="float-right">
                    <button type="submit" className="btn btn-primary px-3">
                      Add Todo
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ************ */}
      <div className="container">
        <div className="col float-right">
          <div className="float-right">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active">
                <input
                  type="radio"
                  name="options11"
                  id="option1"
                  autoComplete="off"
                  onChange={markAsCompleted}
                />
                Mark all completed
              </label>
              <label className="btn btn-secondary px-4">
                <input
                  type="radio"
                  name="options12"
                  id="option2"
                  autoComplete="off"
                  onChange={markAsActive}
                />{" "}
                Mark all active
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="p-3 my-2 text-white ">
        <div
          class="container-lg  shadow p-3 mb-5  text-dark  "
          style={{ backgroundColor: "white" }}
        >
          {values.length != 0 ? (
            values.map((item, index) => {
              return <LisItem key={index} data={item} />;
            })
          ) : (
            <h5 className="my-5 text-center">Empty List</h5>
          )}
        </div>
      </div>
      <ActiveTasks title="All tasks" numbeOfToDos={values.length} />
    </div>
  );
}
