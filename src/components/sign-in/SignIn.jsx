import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { getUserByEmail } from "../../services/userServices";
import CatShareLogo from "../../assets/CatShareLogoNoBackground.png";

export const SignIn = () => {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("totallysafepassword");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "catShare_user",
          JSON.stringify({
            id: user.id,
            password: user.password,
          })
        );

        navigate("/home-page");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <div className="log-in-header">
            <h1>Welcome to</h1>
            <img
              className="cat-share-logo"
              src={CatShareLogo}
              alt="Welcome to Cat Share!"
            />
          </div>
          <div className="bottom-half-form">
            <h2 className="sign-in-text"> Please sign in</h2>
            <fieldset>
              <div className="form-group">
                <h3 className="email-input">Email:</h3>
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => setEmail(evt.target.value)}
                  className="form-control"
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
              <div className="form-group">
                <h3 className="password-input">Password:</h3>
                <input
                  type="password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                  className="form-control"
                  placeholder="Password"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <button className="login-btn btn-info" type="submit">
                  Sign in
                </button>
              </div>
            </fieldset>
          </div>
        </form>
        <Link className="register-link" to="/register">
          Not a member yet?
        </Link>
      </section>
    </main>
  );
};
