import React from "react";

import { Navbar, Footer, AllGlasses } from "./components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Route exact path="/login" component={Routes} />
        <Switch>
          <Route exact path="/all" component={AllGlasses} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
