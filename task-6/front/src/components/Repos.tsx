import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const username = "harryjohnes";
const token = "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";

const Repos = () => {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}/repos?${Date.now()}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        setRepos(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.message);
      });

    return () => {
      // Cleanup logic goes here
      console.log("Component is unmounted. Cleanup here if needed.");
    };
  }, []);

  //DELETE REPO
  const deleteRepo = (repoName: any) => {
    const config = {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    };

    axios
      .delete(`https://api.github.com/repos/${username}/${repoName}`, config)
      .then(() => {
        console.log("Repository deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  if (repos.length > 0)
    return (
      <div className="container mt-5">
        <h1 className="text-center">Repos</h1>
        {repos.map((item, index) => (
          <ul
            key={item.id}
            className="list-group mb-3 list-group-item-secondary"
          >
            <li className={"list-group-item"}>
              <div className="row">
                <div className="col">
                  <b>Name: {item.name}</b>
                </div>
                <div className="col text-end">
                  <Link
                    to={"/repos/" + item.name}
                    className="btn btn-primary py-0 me-2"
                  >
                    Rename
                  </Link>
                  <Link
                    to={item.html_url}
                    className="btn btn-primary py-0 me-2"
                  >
                    Link
                  </Link>
                  <Button onClick={() => deleteRepo(item.name)}>Delete</Button>
                </div>
              </div>
            </li>
            <li className={"list-group-item"}>
              Description: {item.description}
            </li>
            <li className={"list-group-item"}>Visibility: {item.visibility}</li>
          </ul>
        ))}
      </div>
    );
  return <h1 className={"text-center mt-5"}>Loading...</h1>;
};

export default Repos;
