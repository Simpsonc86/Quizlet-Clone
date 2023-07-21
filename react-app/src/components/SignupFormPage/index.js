import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import validator from 'validator'

function SignupFormPage() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);



  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validations
    let err = [];
    if (firstName.length < 2) {
      err.push("First name must be longer than 2 characters")
    }
    if (firstName.length > 50) {
      err.push("First name must be shorter than 50 characters")
    }
    if (lastName.length < 3) {
      err.push("Last name must be longer than 3 characters")
    }
    if (lastName.length > 50) {
      err.push("Last name must be shorter than 50 characters")
    }
    if (dateOfBirth.substring(-4) > "2016") {
      err.push("Must be born before 2016 to register")
    }
    if (username.length < 3) {
      err.push("Username must be longer than 3 characters")
    }
    if (username.length > 40) {
      err.push("Username must be shorter than 40 characters")
    }
    if (!validator.isEmail(email)) {
      err.push("Email must be valid!")
    }
    if (password.length < 8) {
      err.push("Password must be longer than 8 characters")
    }
    if (password !== confirmPassword) {
      err.push("Passwords do not match!")
    }
    if (password === confirmPassword&& !err.length) {
      const data = await dispatch(signUp(firstName, lastName, dateOfBirth, username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(err);
    }

    // setErrors(["Passwords do not match!",])

    // history.push("/dashboard")
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Date of Birth
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" >Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
