import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { Header } from "./Components/Header";
import { AuthProvider } from "./Components/AuthProvider";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const App = () => (
  <ApolloProvider client={client}>
    <AuthProvider>
      <Header />
    </AuthProvider>
  </ApolloProvider>
);

export default App;
