import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Button, Form, FormGroup, Input } from "reactstrap";

import { LOGIN } from "../graphql/login";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          <h1 className="display-4">Login</h1>
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await login({ variables: { email, password } });
              console.log(res);
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
                Submit
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};
