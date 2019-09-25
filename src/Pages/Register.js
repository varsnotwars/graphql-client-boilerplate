import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Input } from "reactstrap";
import { REGISTER } from "../graphql/register";
import { Container } from "../Components/Container";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);

  const [register] = useMutation(REGISTER);

  if (registered) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <h1 className="display-4">Register</h1>
      <Form
        onSubmit={async e => {
          e.preventDefault();

          try {
            const { data } = await register({
              variables: { email, password }
            });

            if (data.register) {
              setRegistered(true);
            }
          } catch (error) {
            console.error(error);
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
            Register
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};
