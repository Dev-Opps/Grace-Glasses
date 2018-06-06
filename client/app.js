import React from "react";

import { Navbar, Footer, AllGlasses } from "./components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
