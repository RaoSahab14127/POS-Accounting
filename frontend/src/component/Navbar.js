import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/" className="navbar__link">
            Home
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/invoices" className="navbar__link">
            Invoices
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/sales" className="navbar__link">
            Sales
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/transactions" className="navbar__link">
            Transactions
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/bs" className="navbar__link">
            BalanceSheet
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/admin" className="navbar__link">
            Product Managemnt
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/inventory" className="navbar__link">
            Inventory Managemnt
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/customer" className="navbar__link">
            CustomerManagement
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/supplier" className="navbar__link">
            Supplier
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/t-account" className="navbar__link">
            T Accounts
          </Link>
        </li>

        <li className="navbar__item">
          <Link to="/income-statement" className="navbar__link">
            Income statement
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
