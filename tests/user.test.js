import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import renderer from "react-test-renderer";

import { PROFILE } from "../src/graphql/profile";
import { Profile } from "../src/Pages/Profile";
import { RestrictedRoute } from "../src/Components/RestrictedRoute";
import { RestrictedComponent } from "../src/Components/RestrictedComponent";
import { AuthProvider } from "../src/Components/AuthProvider";

describe("user", () => {
  it("renders profile without error", () => {
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
    renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <RestrictedRoute>
          <Profile />
        </RestrictedRoute>
      </MockedProvider>
    );
  });

  it("does not render restricted component", () => {
    const mocks = {
      request: {
        query: PROFILE
      },
      result: {
        data: {
          profile: null
        }
      }
    };
    renderer.create(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <AuthProvider>
          <RestrictedComponent>
            <Profile />
          </RestrictedComponent>
        </AuthProvider>
      </MockedProvider>
    );
  });
});
