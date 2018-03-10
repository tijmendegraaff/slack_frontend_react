import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import "normalize.css/normalize.css";

import "./styles/styles.scss";
import client from "./apollo";

const App = (
  <ApolloProvider client={client}>
    <div>hello</div>
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("app"));
