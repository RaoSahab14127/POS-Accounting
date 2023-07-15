import React, { useEffect, useState } from "react";
import { client } from "../api/client";
// import "../styles/SalesPage.css";

function SalesPages() {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await client.get("sales"); // Replace "/api/sales" with your API endpoint
        setSales(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSales();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sales-page">
      <h2>Sales</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.invoice_id}</td>
              <td>{sale.product_id}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesPages;
