import React, { useContext, Children, cloneElement } from "react";
import { AuthContext } from "./AuthContext";

export const RestrictedComponent = props => {
  const { profile } = useContext(AuthContext);

  // prettier-ignore
  return profile
    ? <React.Fragment>
        {
          Children.map(
            props.children,
            child => cloneElement(child, { className: "restricted" })
          )
        }
      </React.Fragment>
    : null;
};
