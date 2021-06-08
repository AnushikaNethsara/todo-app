import React, { useEffect, useState } from "react";
import constants from "../../constants/constants";
import axios from "axios";

const LisItem = ({ data }) => {
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    if (data.todo_status === "active") {
      setActive(true);
    }

    if (data.todo_status === "completed") {
      setCompleted(true);
    }
  }, []);

  const handleCompleted = () => {
    let updatedStatus = {
      todo_status: "completed",
    };
    axios
      .put(constants.backend_url + "/todo/" + data._id, updatedStatus)
      .then((response) => {
        if (response.data.msg === "Todo Updated!") {
          setActive(false);
          setCompleted(true);
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleActive = () => {
    let updatedStatus = {
      todo_status: "active",
    };
    axios
      .put(constants.backend_url + "/todo/" + data._id, updatedStatus)
      .then((response) => {
        if (response.data.msg === "Todo Updated!") {
          setCompleted(false);
          setActive(true);
        } else {
          console.log(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-9">
          <h5>{data.todo}</h5>
        </div>
        <div className="col float-right">
          <div className="float-right">
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-success active">
                <input
                  type="radio"
                  name={"options" + data._id}
                  id="option1"
                  autoComplete="off"
                  checked={completed}
                  onChange={handleCompleted}
                />
                Completed
              </label>
              <label className="btn btn-success px-4">
                <input
                  type="radio"
                  name={"options" + data._id}
                  id="option2"
                  autoComplete="off"
                  checked={active}
                  onChange={handleActive}
                />
                Active
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default LisItem;
