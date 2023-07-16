import logo from "./logo.svg";
import "./App.css";
import BalanceSheet from "./component/BalanceSheet";
import axios from "axios";
import TAccount from "./component/TAccount";
import Transaction from "./component/Transaction";
import ProductListing from "./component/ProductListing";
import SellInventory from "./component/SellInventory";
import ProductManagement from "./pages/ProductManagement";
import CustomerManagement from "./pages/CustomerManagement";
import IncomeStatement from "./component/IncomeStatement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoiceList from "./component/InvoiceList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./component/Navbar";
import SalesPages from "./pages/SalesPages";

function App() {
  // return <TAccount accountTypeId={1} />;
  // return <Transaction accountTypeId={1} />;
  // return <ProductListing accountTypeId={1} />;
  // return <SellInventory />;
  // return <ProductListing />;
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/sales" element={<SalesPages />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/bs" element={<BalanceSheet />} />
        <Route path="/admin" element={<ProductListing />} />
        <Route path="/inventory" element={<SellInventory />} />
        <Route path="/customer" element={<CustomerManagement />} />
        <Route path="/supplier" element={<ProductManagement />} />
        <Route path="/t-account" element={<TAccount accountTypeId={1} />} />
        <Route path="/income-statement" element={<IncomeStatement />} />
      </Routes>
    </Router>
  );
}

export default App;
