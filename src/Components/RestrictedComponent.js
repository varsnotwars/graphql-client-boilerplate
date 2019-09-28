import React, { useContext, Children, cloneElement } from "react";
import { AuthContext } from "./AuthContext";

export const RestrictedComponent = props => {
  const { profile } = useContext(AuthContext);

  // TODO: added this class for testing, but could just add directly in test
  // need to reassess whether this should be removed
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
