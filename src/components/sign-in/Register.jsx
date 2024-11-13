import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { createUser, getUserByEmail } from "../../services/userServices";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    userName: "",
    profilePic: "https://imgur.com/a/g8SCPmS",
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "catShare_user",
          JSON.stringify({
            id: createdUser.id,
            userName: createdUser.userName,
            password: createdUser.password,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <div className=".container-login">
      <main style={{ textAlign: "center" }}>
        <form className="form-login" onSubmit={handleRegister}>
          <h1>CatShare</h1>
          <h2>Please Register</h2>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="text"
                id="userName"
                className="form-control"
                placeholder="Enter a UserName"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <input
                onChange={updateCustomer}
                type="password"
                id="password"
                className="form-control"
                placeholder="Create Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
        <p>
          Already a user? <Link to="/login">Sign in here</Link>
        </p>
      </main>
    </div>
  );
};
