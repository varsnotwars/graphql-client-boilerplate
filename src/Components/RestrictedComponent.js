import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RestrictedComponent = ({ children }) => {
  const { profile } = useContext(AuthContext);

  return profile && <React.Fragment>{children}</React.Fragment>;
};
