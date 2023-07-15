import React from "react";
import IncomeStatement from "../component/IncomeStatement";
import CustomerManagement from "./CustomerManagement";
import ProductManagement from "./ProductManagement";
import "../styles/HomePage.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">Accounting LAB</h1>
        <p className="home-page__description">
          Sir Farhan Accounting LAB! So far Features included
        </p>
        <p className="home-page__description2">
          create and manage invoices, track sales and transactions, generate
          balance sheets, manage products, handle inventory, manage customers
          and suppliers, analyze T accounts, and generate income statements
        </p>
        <p className="home-page__author">
          Created by Muhammad Usama Having SEAT NO EB20103100
        </p>
      </div>
    </div>
  );
}

export default Home;
