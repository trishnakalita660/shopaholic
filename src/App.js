import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./default.scss";
import HomepageLayout from "./layouts/HomepageLayout";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Registration from "./pages/Registration";
import { auth, handleUserProfile } from "./firebase/utils";
import { setCurrentUser } from "./redux/User/user.actions";
 
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth";
import { useDispatch } from "react-redux";

const App = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
     dispatch(setCurrentUser(userAuth));
    });
    return () => {
      authListener();
    };
  }, []);
 
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
             (
              <MainLayout>
                <Registration />
              </MainLayout>
            )
          }
        />

        <Route
          exact
          path="/login"
          render={() =>
            (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />

        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />

        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
            </WithAuth>
          )}
        />
      </Switch>
    </div>
  );
};
 
export default App;
