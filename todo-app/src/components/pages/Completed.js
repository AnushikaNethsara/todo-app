import React, { useEffect, useState } from "react";
import ActiveTasks from "../activeTasks/ActiveTasks";
import constants from "../../constants/constants";
import axios from "axios";
import LisItem from "../listItem/ListItem";
import { useHistory } from "react-router-dom";

const Completed = () => {
  const [values, setValues] = useState([]);
  const history = useHistory();
  const getToDos = () => {
    var id = localStorage.getItem("user_id");

    axios
      .get(constants.backend_url + "/todo/completed/" + id)
      .then((response) => {
        setValues(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
    useState(() => {
      if (localStorage.getItem("user_id") === "") {
        history.push("/");
      } else {
        getToDos();
      }
    });


  return (
    <div className="container mt-5">
      <div className="container">
        <h2>Completed To-Do s</h2>
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
      <ActiveTasks title="Completed tasks" numbeOfToDos={values.length} />
    </div>
  );
};

export default Completed;
