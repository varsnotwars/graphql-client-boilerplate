import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RestrictedComponent = props => {
  const { profile } = useContext(AuthContext);
  return profile ? props.children : null;
};
