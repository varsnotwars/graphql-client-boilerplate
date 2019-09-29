import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Input, Alert } from "reactstrap";

import { LOGIN } from "../graphql/login";
import { Container } from "../Components/Container";

export const Login = ({ location }) => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [unconfirmedError, setUnconfirmedError] = useState("");
  const [loginError, setLoginError] = useState("");

  const [login] = useMutation(LOGIN);

  const { from, error } = location.state || {
    from: {
      pathname: forgotPassword ? "/forgot_password" : "/profile"
    },
    error: null
  };

  if (redirect) {
    return <Redirect to={from} />;
  }
  return (
    <Container>
      {/* prettier-ignore */
      error
        ? <Alert color="danger">{location.state.error}</Alert>
        : null}

      <h1 className="display-4">Login</h1>

      {/* prettier-ignore */
      unconfirmedError
        ? <Alert color="warning">{unconfirmedError}</Alert>
        : null}

      {/* prettier-ignore */
      loginError
        ? <Alert color="danger">{loginError}</Alert>
        : null}

      <Form
        onSubmit={async e => {
          e.preventDefault();

          try {
            const { data } = await login({
              variables: { email, password }
            });

            if (data && data.login) {
              setRedirect(true);
            }
          } catch (error) {
            if (error.graphQLErrors) {
              const unconfirmedUserError = error.graphQLErrors.find(
                ge => ge.extensions.exception.name === "UnconfirmedUserError"
              );

              if (unconfirmedUserError) {
                setUnconfirmedError(unconfirmedUserError.message);
              } else {
                setLoginError(error.graphQLErrors[0].message);
              }
            } else {
              throw error;
            }
          }
        }}
      >
        <FormGroup>
          <Input
            data-testid="email"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            data-testid="password"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Button data-testid="submit" size="lg" outline type="submit">
            Login
          </Button>
        </FormGroup>

        <FormGroup>
          <Button
            size="sm"
            color="link"
            onClick={() => {
              setForgotPassword(true);
              setRedirect(true);
            }}
          >
            Forgot Password?
          </Button>
        </FormGroup>
      </Form>
    </Container>
  );
};
