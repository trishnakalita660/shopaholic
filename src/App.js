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
import { checkUserSession } from "./redux/User/user.actions";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import WithAuth from "./hoc/withAuth";
import { useDispatch } from "react-redux";
import WithAdminAuth from "./hoc/WithAdminAuth";
import AdminToolBar from "./components/AdminToolbar";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
 dispatch(checkUserSession());
  }, []);
 
  return (
    <div className="App">
    <AdminToolBar/>
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
            <DashBoardLayout>
              <Dashboard />
            </DashBoardLayout>
            </WithAuth>
          )}
        />
        <Route
        path="/admin"
        render={() => (
          <WithAdminAuth>
          <AdminLayout>
            <Admin/>
          </AdminLayout>
          </WithAdminAuth>
        )}
      />
         
      </Switch>
    </div>
  );
};
 
export default App;
