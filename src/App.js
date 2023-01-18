import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/login/Register";
import { useSelector } from "react-redux";

const App = () => {
  // read state from redux store
  const showSearchBar = useSelector((state) => state.header.showSearchBar);

  return (
    <>
      <Router>
        {showSearchBar ? <Header /> : <div></div>}
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
