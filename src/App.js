import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Products from "./pages/products/products";

import "./App.css";
import DetailsPage from "./pages/detailsPage/detailsPage";

function App() {
  return (
    <div className="App">
      <Router basename="/react-params-product-list">
        <Switch>
          <Route path="/products/:slug" component={DetailsPage}></Route>
          <Route path="/products" component={Products}></Route>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
