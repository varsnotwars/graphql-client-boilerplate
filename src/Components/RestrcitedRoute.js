import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { PROFILE } from "../graphql/profile";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const profile = useQuery(PROFILE);
  const { loading, data, error } = profile;

  if (loading) return "loading...";

  if (error) {
    const AuthenticationRequiredError = error.graphQLErrors.find(
      ge => ge.extensions.exception.name === "AuthenticationRequiredError"
    );

    if (AuthenticationRequiredError) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              error: AuthenticationRequiredError.message,
              from: rest.location
            }
          }}
        />
      );
    } else {
      throw new Error(error);
    }
  }

  return (
    <Route
      {...rest}
      render={routeProps => (
        <Component {...routeProps} profile={data.profile} />
      )}
    />
  );
};