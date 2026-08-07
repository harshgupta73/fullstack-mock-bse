import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <NavLink className="navbar-brand fw-bold" to="/">
          Mock BSE
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/employees">
                Employees
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/clients">
                Clients
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/trades">
                Trades
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/my-clients">
                My Clients
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/my-trades">
                My Trades
              </NavLink>
            </li>
            

            <li className="nav-item">
              <NavLink className="nav-link" to="/incentives">
                Incentives
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/bse/clients">
                  BSE Clients
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/bse/trades">
                  BSE Trades
              </NavLink>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;