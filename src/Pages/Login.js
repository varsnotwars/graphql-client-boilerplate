import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Input, Alert } from "reactstrap";

import { LOGIN } from "../graphql/login";

export const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN);

  const { from, error } = location.state || {
    from: { pathname: "/profile" },
    error: null
  };

  if (redirect) {
    return <Redirect to={from} />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          {error && <Alert color="danger">{location.state.error}</Alert>}
          <h1 className="display-4">Login</h1>
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await login({ variables: { email, password } });

              if (res.data && res.data.login) {
                setRedirect(true);
              }
            }}
          >
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Button size="lg" outline type="submit">
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};
