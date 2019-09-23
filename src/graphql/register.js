import gql from "graphql-tag";

export const REGISTER = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      email
    }
  }
`;
