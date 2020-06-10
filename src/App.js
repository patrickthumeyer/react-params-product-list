import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/products";

import "./App.css";
import DetailsPage from "./pages/detailsPage/detailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path="https://patrickthumeyer.github.io/react-params-product-list/products/:slug"
            component={DetailsPage}
          ></Route>
          <Route
            path="https://patrickthumeyer.github.io/react-params-product-list/products"
            component={Products}
          ></Route>
          <Route
            exact
            path="https://patrickthumeyer.github.io/react-params-product-list/"
            component={Home}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
