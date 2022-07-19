import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://artikletest.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client= new ApolloClient({
    // uri: "http://127.0.0.1:4000/graphql",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});



ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
