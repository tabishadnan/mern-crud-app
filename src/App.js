import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Users from "./Components/Users";
import AddUser from "./Components/AddUser";
import DeleteUser from "./Components/DeleteUser";
import EditUser from "./Components/EditUser";
import NotFound from "./Components/NotFound";

const App = () => {
  return (
    <Router>
      <div id="wrapper">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/add" component={AddUser} />
          <Route exact path="/edit/:id" component={EditUser} />
          <Route exact path="/delete" component={DeleteUser} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;