import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { REGISTER } from "../graphql/register";
import { Container } from "../Components/Container";
import { useForm } from "../hooks/useForm";

export const Register = () => {
  const [{ email, password }, handleOnChange] = useForm({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [register] = useMutation(REGISTER);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <h1 className="display-4">Register</h1>

      {/* prettier-ignore */
      error
        ? <Alert color="danger">{error}</Alert>
        : null}

      <Form
        onSubmit={async e => {
          e.preventDefault();
          try {
            const { data } = await register({
              variables: { email, password }
            });

            if (data.register) {
              setRedirect(true);
            }
          } catch (error) {
            if (error.graphQLErrors) {
              setError(error.graphQLErrors[0].message);
            }
          }
        }}
      >
        <FormGroup>
          <Input
            data-testid="register-email"
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleOnChange}
          />
        </FormGroup>

        <FormGroup>
          <Input
            data-testid="register-password"
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleOnChange}
          />
        </FormGroup>

        <FormGroup>
          <Button data-testid="register-submit" size="lg" outline type="submit">
            Register
          </Button>
        </FormGroup>

        <FormGroup>
          <Button
            size="sm"
            color="link"
            onClick={() => {
              setRedirect(true);
            }}
          >
            Already registered? Login here
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};
