import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { MockedProvider, wait } from "@apollo/react-testing";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { FORGOT_PASSWORD } from "../src/graphql/forgotPassword";
import { ForgotPassword } from "../src/Pages/ForgotPassword";

describe("info:", () => {
  it("forgot password successfully displays response ", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/forgot_password"]
    });
    expect(history.location.pathname).toBe("/forgot_password");

    const successMessage =
      "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.";

    const mocks = {
      request: {
        query: FORGOT_PASSWORD,
        variables: {
          email: "forgot@password.com"
        }
      },
      result: {
        data: { forgotPassword: true }
      }
    };

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <Router history={history}>
          <ForgotPassword />
        </Router>
      </MockedProvider>
    );

    fireEvent.change(getByTestId("forgot-password-email"), {
      target: { value: "forgot@password.com" }
    });

    fireEvent.click(getByTestId("forgot-password-submit"));

    await act(async () => {
      await wait(0);
    });

    expect(getByText(successMessage)).toBeTruthy();

    expect(history.location.pathname).toBe("/forgot_password");
  });
});
