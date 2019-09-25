import React from "react";

export const Container = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-6 offset-sm-3 text-center">{props.children}</div>
    </div>
  </div>
);
