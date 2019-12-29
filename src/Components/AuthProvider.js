import React from "react";
import { useQuery } from "react-apollo";

import { PROFILE } from "../graphql/profile";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const { data } = useQuery(PROFILE, { errorPolicy: "all" });

  const profile = data && data.profile ? data.profile : null;

  return (
    <AuthContext.Provider value={{ profile }}>{children}</AuthContext.Provider>
  );
};
