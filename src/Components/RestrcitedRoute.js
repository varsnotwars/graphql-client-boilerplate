import React from "react";
import { Route } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { PROFILE } from "../graphql/profile";

export const RestrictedRoute = ({ component: Component, ...rest }) => {
  const profile = useQuery(PROFILE);
  const { loading, data, error } = profile;

  if (loading) return "loading...";

  if (error) {
    const notAuthenticated = error.graphQLErrors.some(
      ge => ge.extensions.exception.name === "AuthenticationRequiredError"
    );

    if (notAuthenticated) {
      // TODO: redirect to login
      return <div>Not authenticated</div>;
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
