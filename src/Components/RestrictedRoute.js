import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useQuery } from "react-apollo";
import { PROFILE } from "../graphql/profile";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const profile = useQuery(PROFILE, { errorPolicy: "all" });
  const { loading, data, error } = profile;

  if (loading) return "loading...";

  if (error) {
    const authenticationRequiredError = error.graphQLErrors.find(
      ge => ge.extensions.exception.name === "AuthenticationRequiredError"
    );
    if (authenticationRequiredError) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              error: authenticationRequiredError.message,
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
