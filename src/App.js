import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/login/Register";
import { useSelector } from "react-redux";

const App = () => {
  const showTextBar = useSelector((state) => state.header.showTextBar);

  return (
    <>
      <Router>
        {showTextBar ? <Header /> : <div></div>}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </>
  );
};
export default App;
