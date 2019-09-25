import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { Button, Form, FormGroup, Input } from "reactstrap";
import { REGISTER } from "../graphql/register";
import { Container } from "../Components/Container";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useMutation(REGISTER);
  return (
    <Container>
      <h1 className="display-4">Register</h1>
      <Form
        onSubmit={async e => {
          e.preventDefault();
          await register({ variables: { email, password } });
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
