import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddToList, RemoveFromList } from "../../api";

//Stylesheet
import styles from "./newlist.module.css";
import ListCard from "../ListCard/ListCard";
import ListContext from "../../context/ListContext";

function NewList({ lists, movie }) {
  // const { lists } = useContext(ListContext);
  const [isInList, setIsInList] = useState([]);

  async function addToList(list_id, movie) {
    await AddToList(list_id, movie);
  }

  async function removeFromList(list_id, movie) {
    await RemoveFromList(list_id, movie);
  }
  return (
    <div
      className="modal fade"
      id="newListModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered w-25" role="document">
        <div className={"modal-content rounded-0 " + styles.container}>
          <div class="modal-header justify-content-center">
            <p className="">Add to List</p>
          </div>
          <div className="modal-body p-0">
            <div className="row no-gutters">
              <div className="col-12">
                <Link
                  className=""
                  reloadDocument
                  style={{ textDecoration: "none", color: "inherit" }}
                  to="/list/create"
                >
                  <button
                    className={
                      "w-100 p-3 d-flex justify-content-start " + styles.button
                    }
                  >
                    Create new List
                  </button>
                </Link>
              </div>

              {lists &&
                lists
                  .slice(2)
                  .map((list, index) => (
                    <ListCard
                      list={list}
                      index={index}
                      isInList={isInList}
                      setIsInList={setIsInList}
                      movie={movie}
                      addToList={addToList}
                      removeFromList={removeFromList}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewList;