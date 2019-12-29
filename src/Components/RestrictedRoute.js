import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const { profile } = useContext(AuthContext);

  if (!profile) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            // TODO: need to sync error messages between client/server
            error: "You must be logged in to do this",
            from: rest.location
          }
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={routeProps => <Component {...routeProps} profile={profile} />}
    />
  );
};
