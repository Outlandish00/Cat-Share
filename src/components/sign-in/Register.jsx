import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { createUser, getUserByEmail } from "../../services/userServices";
import CatShareLogo from "../../assets/CatShareLogoNoBackground.png";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    userName: "",
    profilePic: "https://i.imgur.com/zgGNjmG.png",
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

        navigate("/home-page");
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
    <div className="container-register">
      <div className="register-header">
        <h1>Welcome to</h1>
        <img
          className="cat-share-logo"
          src={CatShareLogo}
          alt="Welcome to Cat Share!"
        />
      </div>
      <main style={{ textAlign: "center" }}>
        <form className="form-register" onSubmit={handleRegister}>
          <h2>Please Register</h2>
          <fieldset>
            <div className="register-form-group">
              <h3>Username:</h3>
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
            <div className="register-form-group">
              <h3>Email:</h3>
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
            <div className="register-form-group">
              <h3>Password:</h3>
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
            <div className="register-form-group">
              <button className="login-btn btn-info" type="submit">
                Register
              </button>
            </div>
          </fieldset>
        </form>
      </main>
      <p>
        Already a user? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};
