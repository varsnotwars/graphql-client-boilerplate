import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import { Header } from "./Components/Header";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const App = () => (
  <ApolloProvider client={client}>
    <Header />
  </ApolloProvider>
);

export default App;
