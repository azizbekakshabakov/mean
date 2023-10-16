import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Student = () => {
  const { id } = useParams();

  const [student, setStudent] = useState();

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newBirthDay, setNewBirthDay] = useState("");
  const [newGender, setNewGender] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorBirthDay, setErrorBirthDay] = useState(false);
  const [errorGender, setErrorGender] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/students/" + id)
      .then((response) => response.json())
      .then((json) => {
        setNewName(json["name"]);
        setNewEmail(json["email"]);
        setNewPassword(json["password"]);
        setNewBirthDay(json["birthDay"]);
        setNewGender(json["gender"]);
        setStudent(json);
      });
  }, []);

  const editStudent = () => {
    const name = newName;
    const email = newEmail;
    const password = newPassword;
    const birthDay = newBirthDay;
    const gender = newGender;

    if (validate() == true && student) {
      fetch("http://localhost:5000/api/students", {
        method: "PUT",
        body: JSON.stringify({
          id: student["_id"],
          name: name,
          email: email,
          password: password,
          birthDay: birthDay,
          gender: gender,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          setNewName("");
          setNewEmail("");
          setNewPassword("");
          setNewBirthDay("");
          setNewGender("");
          window.location.replace("/students");
        });
    }
  };

  const validate = () => {
    let isValid = true;

    if (newName.length < 3) {
      setErrorName(true);
      isValid = false;
    } else setErrorName(false);

    let format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!newEmail.match(format)) {
      setErrorEmail(true);
      isValid = false;
    } else setErrorEmail(false);

    if (newPassword.length < 6) {
      setErrorPassword(true);
      isValid = false;
    } else setErrorPassword(false);

    if (newBirthDay == "") {
      setErrorBirthDay(true);
      isValid = false;
    } else setErrorBirthDay(false);

    if (newGender == "") {
      setErrorGender(true);
      isValid = false;
    } else setErrorGender(false);

    return isValid;
  };
  //   console.log(newName);
  if (student) {
    return (
      <>
        <div className="container mt-5">
          <h1 className="text-center">Edit {student["name"]}</h1>

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
            {errorName == true ? (
              <div className="alert alert-danger" role="alert">
                Name must not be less than 3 letters
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            {errorEmail == true ? (
              <div className="alert alert-danger" role="alert">
                Email is not valid
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="emailHelp"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errorPassword == true ? (
              <div className="alert alert-danger" role="alert">
                Password must not be less than 6 symbols
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputBirthDay" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputBirthDay"
              aria-describedby="emailHelp"
              value={newBirthDay}
              onChange={(e) => setNewBirthDay(e.target.value)}
            />
            {errorBirthDay == true ? (
              <div className="alert alert-danger" role="alert">
                Choose the date
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputGender" className="form-label me-3">
              Gender
            </label>
            Male
            <input
              type="radio"
              className="form-radio mx-2"
              id="exampleInputGender"
              aria-describedby="emailHelp"
              name="gender"
              value="Male"
              onChange={(e) => setNewGender(e.target.value)}
              checked={newGender === "Male"}
            />
            Female
            <input
              type="radio"
              className="form-radio mx-2"
              id="exampleInputGender"
              aria-describedby="emailHelp"
              name="gender"
              value="Female"
              onChange={(e) => setNewGender(e.target.value)}
              checked={newGender === "Female"}
            />
            {errorGender == true ? (
              <div className="alert alert-danger" role="alert">
                You should select the gender
              </div>
            ) : (
              ""
            )}
          </div>

          <button className="btn btn-primary" onClick={editStudent}>
            Add student
          </button>
        </div>
      </>
    );
  }
  return <h1 className="container text-center">loading...</h1>;
};

export default Student;
