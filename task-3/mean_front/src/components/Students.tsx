import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((json) => setStudents(json));
  }, []);
  // console.log(students);
  if (students.length > 0)
    return (
      <div className="container mt-5">
        <h1 className="text-center">Students</h1>
        {students.map((item, index) => (
          <ul
            key={item._id}
            className="list-group mb-3 list-group-item-secondary"
          >
            <li className={"list-group-item"}>
              <div className="row">
                <div className="col">
                  <b>Name: {item.name}</b>
                </div>
                <div className="col text-end">
                  <Link
                    to={"/students/" + item._id}
                    className="btn btn-primary py-0"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </li>
            <li className={"list-group-item"}>Email: {item.email}</li>
            <li className={"list-group-item"}>
              Date of birth: {item.birthDay}
            </li>
            <li className={"list-group-item"}>Gender: {item.gender}</li>
          </ul>
        ))}
      </div>
    );
  return <></>;
};

export default Students;
