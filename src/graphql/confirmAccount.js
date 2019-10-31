import gql from "graphql-tag";

export const CONFIRM_ACCOUNT = gql`
  mutation confirmAccount($token: String!) {
    confirmAccount(token: $token)
  }
`;
