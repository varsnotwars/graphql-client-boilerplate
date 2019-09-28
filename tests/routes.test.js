import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import renderer from "react-test-renderer";
import { MockedProvider, wait } from "@apollo/react-testing";

import { PROFILE } from "../src/graphql/profile";
import { AuthProvider } from "../src/Components/AuthProvider";
import { RestrictedRoute } from "../src/Components/RestrictedRoute";
import { Profile } from "../src/Pages/Profile";

import { GraphQLError } from "graphql";

describe("routes:", () => {
  it("redirects to login page", async () => {
    const history = createMemoryHistory({ initialEntries: ["/profile"] });

    const mocks = {
      request: {
        query: PROFILE
      },
      result: {
        errors: [
          new GraphQLError("unauthed", null, null, null, null, null, {
            exception: { name: "AuthenticationRequiredError" }
          })
        ]
      }
    };

    renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <AuthProvider>
          <Router history={history}>
            <RestrictedRoute exact path="/profile" component={Profile} />
          </Router>
        </AuthProvider>
      </MockedProvider>
    );

    await renderer.act(async () => {
      // delays until the next "tick" of the event loop,
      // and allows time for that Promise returned from MockedProvider to be fulfilled
      await wait();
    });

    expect(history.location.pathname).toBe("/login");
  });
});
