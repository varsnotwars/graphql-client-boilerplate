import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { Redirect } from "react-router-dom";

import { FORGOT_PASSWORD } from "../graphql/forgotPassword";
import { Container } from "../Components/Container";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }
  return (
    <Container>
      <h1 className="display-4">Forgot Password</h1>

      {/* prettier-ignore */
      submitted
        ? <Alert color="info">
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
            </Alert>
        : null}

      <Form
        onSubmit={async e => {
          e.preventDefault();
          await forgotPassword({ variables: { email } });
          setSubmitted(true);
        }}
      >
        {/* prettier-ignore */
        submitted
            ? <FormGroup>
                <Button size="lg" outline onClick={() => setRedirectToLogin(true)}>
                    Return to login
                </Button>
              </FormGroup>
            : <React.Fragment>
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
                    <Button size="lg" outline type="submit">
                        Send password reset email
                    </Button>
                </FormGroup>
              </React.Fragment>}
      </Form>
    </Container>
  );
};
