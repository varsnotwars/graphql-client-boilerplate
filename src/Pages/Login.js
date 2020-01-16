import React, { useState } from "react";
import { useMutation } from "react-apollo";
import { Redirect } from "react-router-dom";

import { Button, Form, FormGroup, Input, Alert } from "reactstrap";

import { LOGIN } from "../graphql/login";
import { Container } from "../Components/Container";
import { useForm } from "../hooks/useForm";

export const Login = ({ location }) => {
  const [{ email, password }, handleOnChange] = useForm({
    email: "",
    password: ""
  });

  const [redirect, setRedirect] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [unconfirmedError, setUnconfirmedError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [login] = useMutation(LOGIN);

  const { from, error, message } = location.state || {
    from: {
      pathname: forgotPassword ? "/forgot_password" : "/profile"
    },
    error: null,
    message: null
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

      {/* prettier-ignore */
      message
        ? <Alert color="success">{message}</Alert>
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
            data-testid="login-email"
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
            data-testid="login-password"
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleOnChange}
          />
        </FormGroup>

        <FormGroup>
          <Button data-testid="login-submit" size="lg" outline type="submit">
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
