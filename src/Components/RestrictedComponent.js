import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const RestrictedComponent = props => {
  const { profile } = useContext(AuthContext);

  // prettier-ignore
  return profile
    ? <React.Fragment>{props.children}</React.Fragment>
    : null;
};
