import gql from "graphql-tag";

export const LOGOUT = gql`
  mutation logout($fromAll: Boolean) {
    logout(fromAll: $fromAll)
  }
`;
