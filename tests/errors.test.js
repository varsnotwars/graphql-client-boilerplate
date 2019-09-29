import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { MockedProvider, wait } from "@apollo/react-testing";
import { render, fireEvent } from "@testing-library/react";

import { GraphQLError } from "graphql";
import { act } from "react-dom/test-utils";
import { LOGIN } from "../src/graphql/login";
import { Login } from "../src/Pages/Login";

describe("errors:", () => {
  it("unconfirmed login catches and displays error", async () => {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    expect(history.location.pathname).toBe("/login");

    const unconfirmedError = "must confirm account";

    const mocks = {
      request: {
        query: LOGIN,
        variables: {
          email: "email@email.com",
          password: "password"
        }
      },
      result: {
        errors: [
          new GraphQLError(unconfirmedError, null, null, null, null, null, {
            exception: { name: "UnconfirmedUserError" }
          })
        ]
      }
    };

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <Login location={{ state: { from: "/", error: null } }} />
        </Router>
      </MockedProvider>
    );

    fireEvent.change(getByTestId("login-email"), {
      target: { value: "email@email.com" }
    });
    fireEvent.change(getByTestId("login-password"), {
      target: { value: "password" }
    });

    fireEvent.click(getByTestId("login-submit"));

    await act(async () => {
      await wait(0);
    });

    expect(getByText(unconfirmedError)).toBeTruthy();

    expect(history.location.pathname).toBe("/login");
  });
});
