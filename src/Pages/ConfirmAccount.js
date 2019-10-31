import React, { useEffect, useState } from "react";
import { Container } from "../Components/Container";
import { useParams, Redirect } from "react-router-dom";
import { useMutation } from "react-apollo";
import { Spinner } from "reactstrap";

import { CONFIRM_ACCOUNT } from "../graphql/confirmAccount";

export const ConfirmAccount = () => {
  const { token } = useParams();
  const [confirmAccount, { loading }] = useMutation(CONFIRM_ACCOUNT);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await confirmAccount({ variables: { token } });
        if (data.confirmAccount) {
          setMessage("account confirmed, please login");
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
      <h1 className="display-4">Confirming Account</h1>
      {loading && <Spinner size="lg" type="grow" color="primary" />}
    </Container>
  );
};
