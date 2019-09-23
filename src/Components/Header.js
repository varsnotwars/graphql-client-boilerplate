import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from "reactstrap";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Graphql Client Boilerplate</NavbarBrand>
          <NavbarToggler onClick={() => setOpen(!open)} />
          <Collapse isOpen={open} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
