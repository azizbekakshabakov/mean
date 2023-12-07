import { useState } from "react";
import axios from "axios";

const token = "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";

const RegistrationForm = () => {
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addRepo = () => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    };

    const data = {
      name: newName,
      description: newDescription,
    };

    axios
      .post(`https://api.github.com/user/repos`, data, config)
      .then((response) => {
        console.log("Repository created:", response.data);
        window.location.replace("/repos");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Registration</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputName1" className="form-label">
          Name
        </label>
        <input
          type="name"
          className="form-control"
          id="exampleInputName1"
          aria-describedby="emailHelp"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Description
        </label>
        <input
          type="name"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" onClick={addRepo}>
        Add repository
      </button>
    </div>
  );
};

export default RegistrationForm;
