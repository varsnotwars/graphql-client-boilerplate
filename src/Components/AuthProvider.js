import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { PROFILE } from "../graphql/profile";
import { AuthContext } from "./AuthContext";

export const AuthProvider = props => {
  const { data } = useQuery(PROFILE, { errorPolicy: "all" });

  const profile = data && data.profile ? data.profile : null;

  return (
    <AuthContext.Provider value={{ profile }}>
      {props.children}
    </AuthContext.Provider>
  );
};
