import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './LoginForm.css';


function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else{
      history.push("/")

    }
  };

  const loginDemoUser = async (e) => {
    e.preventDefault();
    const email = "demo@aa.io";
    const password = "password";
    const data = await dispatch(login(email, password))
    if (data) {
      setErrors(data);
    } else {
      history.push("/")
    }
  }
  return (
    <div className="login-page-container">
      <img className="login-img" src="close-up-hand-taking-notes_23-2148888827.png" alt=""></img>
      <div className="landing-page-info log">
        <h3 className="set-text">Need to Study?</h3>
        <p className="set-text-small">Log back in  <br/> Pick up where you left off <br/> Or explore some of the Recent Folders and Sets</p>
      </div>
      <div className="login-form-div">

        <h1>Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li className="validation-error" key={idx}>{error}</li>
            ))}
          </ul>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>
            Email
          </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          <label>
          Password
          </label>
          <button className="login-buttons" type="submit">Log In</button>
          <button className="login-buttons" onClick={loginDemoUser}>Demo User</button>
          <button className="login-buttons" id="redirect" onClick={()=>history.push('/signup')}>Need to Register?</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
