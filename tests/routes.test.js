import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { MockedProvider, wait } from "@apollo/react-testing";
import { render, fireEvent } from "@testing-library/react";

import { PROFILE } from "../src/graphql/profile";
import { RestrictedRoute } from "../src/Components/RestrictedRoute";
import { Profile } from "../src/Pages/Profile";
import { Register } from "../src/Pages/Register";

import { GraphQLError } from "graphql";
import { REGISTER } from "../src/graphql/register";
import { act } from "react-dom/test-utils";
import { LOGIN } from "../src/graphql/login";
import { Login } from "../src/Pages/Login";
import { ConfirmAccount } from "../src/Pages/ConfirmAccount";
import { CONFIRM_ACCOUNT } from "../src/graphql/confirmAccount";

describe("routes:", () => {
  it("unauthenticated profile redirects to login page", async () => {
    const history = createMemoryHistory({ initialEntries: ["/profile"] });
    expect(history.location.pathname).toBe("/profile");

    const mocks = {
      request: {
        query: PROFILE
      },
      result: {
        errors: [
          new GraphQLError("_", null, null, null, null, null, {
            exception: { name: "AuthenticationRequiredError" }
          })
        ]
      }
    };

    renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <RestrictedRoute exact path="/profile" component={Profile} />
        </Router>
      </MockedProvider>
    );

    await renderer.act(async () => {
      // delays until the next "tick" of the event loop,
      // and allows time for that Promise returned from MockedProvider to be fulfilled
      await wait();
    });

    expect(history.location.pathname).toBe("/login");
  });

  it("successful register form redirects to login", async () => {
    const history = createMemoryHistory({ initialEntries: ["/register"] });
    expect(history.location.pathname).toBe("/register");

    const testEmail = "email@email.com";

    const mocks = {
      request: {
        query: REGISTER,
        variables: {
          email: testEmail,
          password: "password"
        }
      },
      result: {
        data: {
          register: {
            id: "1",
            email: testEmail
          }
        }
      }
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <Register />
        </Router>
      </MockedProvider>
    );

    fireEvent.change(getByTestId("register-email"), {
      target: { value: testEmail }
    });
    fireEvent.change(getByTestId("register-password"), {
      target: { value: "password" }
    });

    fireEvent.click(getByTestId("register-submit"));

    await act(async () => {
      await wait(0);
    });

    expect(history.location.pathname).toBe("/login");
  });

  it("successful login form redirects to profile", async () => {
    const history = createMemoryHistory({ initialEntries: ["/login"] });
    expect(history.location.pathname).toBe("/login");

    const testEmail = "email@email.com";

    const mocks = {
      request: {
        query: LOGIN,
        variables: {
          email: testEmail,
          password: "password"
        }
      },
      result: {
        data: {
          login: {
            id: "2",
            email: testEmail
          }
        }
      }
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <Login location={{ from: "/", error: null }} />
        </Router>
      </MockedProvider>
    );

    fireEvent.change(getByTestId("login-email"), {
      target: { value: testEmail }
    });
    fireEvent.change(getByTestId("login-password"), {
      target: { value: "password" }
    });

    fireEvent.click(getByTestId("login-submit"));

    await act(async () => {
      await wait(0);
    });

    expect(history.location.pathname).toBe("/profile");
  });

  it("successful account confirmation redirects to login", async () => {
    const validToken = "valid-token";

    const history = createMemoryHistory({
      initialEntries: [`/confirm/${validToken}`]
    });
    expect(history.location.pathname).toBe(`/confirm/${validToken}`);

    const mocks = {
      request: {
        query: CONFIRM_ACCOUNT,
        variables: {
          token: validToken
        }
      },
      result: {
        data: {
          confirmAccount: true
        }
      }
    };

    const res = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <ConfirmAccount />
        </Router>
      </MockedProvider>
    );

    await act(async () => {
      await wait(0);
    });

    expect(history.location.pathname).toBe("/login");
  });
});
