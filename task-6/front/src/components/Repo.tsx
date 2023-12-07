import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const token = "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";
const username = "harryjohnes";
const config = {
  headers: {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  },
};

const Student = () => {
  const { id } = useParams();

  const [repo, setRepo] = useState();

  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/${username}/${id}`, config)
      .then((response) => {
        // Handle the response data
        console.log("Repository information:", response.data);
        setNewName(response.data["name"]);
        setNewDescription(response.data["description"]);
        setRepo(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.message);
      });
  }, []);

  const editRepo = () => {
    const data = {
      name: newName,
      description: newDescription,
    };

    axios
      .patch(`https://api.github.com/repos/${username}/${id}`, data, config)
      .then((response) => {
        // Handle the response data
        console.log("Repository updated:", response.data);
        window.location.replace("/repos");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.message);
      });
  };

  if (repo) {
    return (
      <>
        <div className="container mt-5">
          <h1 className="text-center">Edit {repo["name"]}</h1>

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

          <button className="btn btn-primary" onClick={editRepo}>
            Apply changes
          </button>
        </div>
      </>
    );
  }
  return <h1 className="container text-center mt-5">Loading...</h1>;
};

export default Student;
