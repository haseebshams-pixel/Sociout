import React from "react";
import { createBrowserHistory } from "history";
import NotFound from "../../pages/notFound";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./layout";
import { allPublicRoute, logedInRoute } from "./allRoute";
import { Route } from "react-router-dom";

const history = createBrowserHistory();

function AuthRoute() {
  const { user } = useSelector((state) => state.root);
  return (
    <Router history={history}>
      {user.isLoggedIn ? (
        <Switch>
          {logedInRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })}
          <Route
            exact
            path="/"
            render={() => {
              return user.isLoggedIn && <Redirect to="/feed" />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          {allPublicRoute.map((route, inx) => {
            return (
              <Route
                key={inx}
                path={route.path}
                exact={true}
                render={(props) => {
                  return <Layout {...props} {...route} />;
                }}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      )}
    </Router>
  );
}

export default AuthRoute;
