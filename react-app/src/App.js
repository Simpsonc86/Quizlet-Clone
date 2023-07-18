import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreateFolder from "./components/CreateFolder";
import CreateSet from "./components/CreateSet";
import Library from "./components/Library";
import EditFolder from "./components/EditFolder"
import RecentFolders from "./components/RecentFolders";
import FolderPage from "./components/FolderPage";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={["/folders/recent"]} >
            <RecentFolders />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/edit-folder/:folder_id">
            <EditFolder />
          </Route>
          <Route exact path="/folders/:folder_id">
            <FolderPage/>
          </Route>
          <Route path="/folders">
            <Library />
          </Route>
          <Route path="/new-folder">
            <CreateFolder />
          </Route>
          <Route path="/new-set">
            <CreateSet />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
