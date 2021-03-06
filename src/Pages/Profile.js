import React, { useState } from "react";
import { useMutation } from "react-apollo";

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
import { Container } from "../Components/Container";

export const Profile = ({ profile, history }) => {
  const [fromAll, setFromAll] = useState(false);

  const [logout, { client }] = useMutation(LOGOUT);

  return (
    <Container>
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
                    history.push("/");
                    await client.resetStore();
                  }
                }}
              >
                Logout
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};
