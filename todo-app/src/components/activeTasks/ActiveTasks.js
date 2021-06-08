import React from "react";
import { Link, useLocation } from "react-router-dom";
import constants from "../../constants/constants";
import axios from "axios";

const ActiveTasks = (props) => {
  const location = useLocation();
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-7">
          <h4 className="text-right mt-2">
            {props.title}:{props.numbeOfToDos}
          </h4>
        </div>
        <div className="col">
          <div className="row">
            <div className="col mt-2">
              <Link to="/home">
                <button
                  type="button"
                  className={"btn btn-link btn-outline-info px-4"}
                >
                  All Todos
                </button>
              </Link>
            </div>
            <div className="col mt-2">
              <Link to="/completed">
                <button type="button" className="btn btn-link btn-outline-info">
                  Completed Todos
                </button>
              </Link>
            </div>
            <div className="col mt-2">
              <Link to="/active">
                <button
                  type="button"
                  className="btn btn-link btn-outline-info px-4"
                >
                  Active Todos
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTasks;
