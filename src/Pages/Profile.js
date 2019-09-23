import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  CustomInput
} from "reactstrap";

import { ME } from "../graphql/me";
import { LOGOUT } from "../graphql/logout";

export const Profile = () => {
  const [fromAll, setFromAll] = useState(false);
  const { loading, data } = useQuery(ME);
  const [logout] = useMutation(LOGOUT);

  if (loading) return "loading...";
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-sm-3 text-center">
          <h1 className="display-4">Profile</h1>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://avatars1.githubusercontent.com/u/20197359?s=460&v=4"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle></CardTitle>
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
                    onClick={async () =>
                      await logout({ variables: { fromAll } })
                    }
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
