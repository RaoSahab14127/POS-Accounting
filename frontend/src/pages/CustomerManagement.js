import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    password: "",

    phone: "",
    email: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/v1/users"; // Replace with your API endpoint URL

      const response = await axios.get(apiUrl);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddCustomer = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/v1/users/sign-up"; // Replace with your API endpoint URL

      // Make the API call to add the new customer
      console.log(newCustomer);
      const response = await axios.post(apiUrl, newCustomer);
      console.log(response.data);

      // Update the local state with the new customer
      setCustomers((prevCustomers) => [...prevCustomers, response.data]);

      setNewCustomer({
        username: "",
        password: "",
        role: "manager",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="customer-management">
      <h2>Customer Management</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={newCustomer.username}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={newCustomer.password}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            className="input-field"
          />
        </div>
        <button type="button" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </form>

      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>

            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.username}</td>

              <td>{customer.phone}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;
