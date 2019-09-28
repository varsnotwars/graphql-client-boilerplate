import React from "react";
import { MockedProvider, wait } from "@apollo/react-testing";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { PROFILE } from "../src/graphql/profile";
import { Profile } from "../src/Pages/Profile";
import { RestrictedRoute } from "../src/Components/RestrictedRoute";
import { RestrictedComponent } from "../src/Components/RestrictedComponent";
import { AuthProvider } from "../src/Components/AuthProvider";

describe("components:", () => {
  it("renders restricted profile for authenticated user", async () => {
    const mocks = {
      request: {
        query: PROFILE
      },
      result: {
        data: {
          profile: {
            id: "1",
            email: "test_user@test.com"
          }
        }
      }
    };

    const div = document.createElement("div");

    ReactDOM.render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <AuthProvider>
          <RestrictedComponent>
            {/* could add the "restricted" class to this element and remove logic from RestrictedComponent */}
            <div>Restricted content</div>
          </RestrictedComponent>
        </AuthProvider>
      </MockedProvider>,
      div
    );

    await act(async () => {
      // delays until the next "tick" of the event loop,
      // and allows time for that Promise returned from MockedProvider to be fulfilled
      await wait();
    });

    expect(div.getElementsByClassName("restricted").length).not.toBe(0);
  });

  it("does not render restricted component for unauthenticated user", async () => {
    const mocks = {
      request: {
        query: PROFILE
      },
      result: {
        data: null
      }
    };

    const div = document.createElement("div");

    ReactDOM.render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <AuthProvider>
          <RestrictedComponent>
            {/* could add the "restricted" class to this element and remove logic from RestrictedComponent */}
            <div>Restricted content</div>
          </RestrictedComponent>
        </AuthProvider>
      </MockedProvider>,
      div
    );

    await act(async () => {
      // delays until the next "tick" of the event loop,
      // and allows time for that Promise returned from MockedProvider to be fulfilled
      await wait();
    });
    expect(div.getElementsByClassName("restricted").length).toBe(0);
  });
});
