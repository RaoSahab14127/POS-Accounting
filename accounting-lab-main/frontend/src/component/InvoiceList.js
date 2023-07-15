import React, { useEffect, useState } from "react";
import axios from "axios";
import { client } from "../api/client";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await client.get("invoices"); // Replace "/api/invoices" with your API endpoint
        setInvoices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchInvoices();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="invoice-list">
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              {invoice.supplier_id ? (
                <td> Supplier </td>
              ) : (
                <td style={{ color: "green" }}> Walk-in Customer</td>
              )}
              {/* <td style={{ color: "green" }}>
                {invoice.supplier_id ? "Supplier" : "Walk-in Customer"}
              </td> */}

              {invoice.supplier_id ? (
                <td> {invoice.total_amount} </td>
              ) : (
                <td style={{ color: "green" }}> {invoice.total_amount} </td>
              )}
              {/* <td>{invoice.total_amount}</td> */}
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
