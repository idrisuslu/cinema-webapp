import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { postList } from "../../api";

function CreateNewList() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState();

  async function handleSubmit() {
    await postList({
      name: title,
      user: user._id,
    });
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="container">
      <div className="row no-gutters justify-content-center align-items-center">
        <div className="col-auto w-75">
          <p className="h3">Create New List</p>
          <form action="http://localhost:3000/profile" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">List Title</label>
              <input type="text" class="form-control" onChange={handleChange} />
            </div>
            <button type="submit" class="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewList;