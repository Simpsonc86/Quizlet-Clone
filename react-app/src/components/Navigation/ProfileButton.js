import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!ulRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>

      {user ? (
        <>
          
          <button id="user-btn"onClick={openMenu}>
            {/* <i className="fas fa-user-circle" /> */}
            <div className="user-logo">
              {user.first_name.toUpperCase().slice(0,1)}
            </div>
          </button>
          <div className={ulClassName} ref={ulRef}>
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>
              <button className="nav-button log_out_button" onClick={handleLogout}>Log Out</button>
            </p>
          </div>
        </>
      ) : (
        <>
          {/* <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            /> */}

          <div className="right-nav-buttons">
            <button className="nav-button create_button" onClick={() => history.push('/login')}>+</button>
            <button className="nav-button log_in_button" onClick={() => history.push('/login')}>LOG IN</button>
            <button className="nav-button sign_in_button" onClick={() => history.push('/signup')}>SIGN UP</button>
          </div>
        </>
      )}

    </>
  );
}

export default ProfileButton;
