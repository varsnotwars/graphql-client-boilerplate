import React, { useEffect, useState } from "react";
import { Container } from "../Components/Container";

import { useParams, Redirect } from "react-router-dom";
import { useMutation } from "react-apollo";
import { VERIFY_TOKEN } from "../graphql/verifyToken";

export const ConfirmAccount = () => {
  const { token } = useParams();
  const [verifyToken] = useMutation(VERIFY_TOKEN);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const valid = await verifyToken({ variables: { token } });
        if (valid) {
          setMessage("account confirmed");
        } else {
          setError("token not valid");
        }

        setRedirect(true);
      } catch (error) {
        setError("something went wrong");
        setRedirect(true);
      }
    };

    verify();
  }, []);

  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { message, error }
        }}
      />
    );
  }

  return (
    <Container>
      <h1 className="display-4">Confirm account</h1>
      <h1>{token}</h1>
    </Container>
  );
};
