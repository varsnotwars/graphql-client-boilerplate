import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";

import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  CustomInput
} from "reactstrap";

import { LOGOUT } from "../graphql/logout";

export const Profile = ({ profile }) => {
  const [fromAll, setFromAll] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const [logout] = useMutation(LOGOUT);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          <h1 className="display-4">Profile</h1>
          <Card>
            <CardImg
              style={{ height: "260", width: "260" }}
              top
              width="100%"
              src="https://avatars1.githubusercontent.com/u/20197359?s=460&v=4"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{profile.email}</CardTitle>
              <Form>
                <FormGroup>
                  <div>
                    <CustomInput
                      type="checkbox"
                      id="fromAll"
                      label="Logout from all devices"
                      checked={fromAll}
                      onChange={() => setFromAll(!fromAll)}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button
                    size="lg"
                    outline
                    onClick={async () => {
                      const res = await logout({ variables: { fromAll } });
                      if (res.data && res.data.logout) {
                        // TODO: profile will be cached, need to reload this or something
                        setRedirect(true);
                      }
                    }}
                  >
                    Logout
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
