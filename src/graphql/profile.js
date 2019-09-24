import gql from "graphql-tag";

export const PROFILE = gql`
  query profile {
    profile {
      id
      email
    }
  }
`;
