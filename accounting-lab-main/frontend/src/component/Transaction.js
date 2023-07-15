import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Transaction() {
  const [accountTypeId1, setAccountTypeId1] = useState(5);
  const [transactionTypeId1, setTransactionTypeId1] = useState(2);
  const [date1, setDate1] = useState("1989-12-28");
  const [amount1, setAmount1] = useState(27000);
  const [description1, setDescription1] = useState("Glene Reed Drawing");
  const [accountTypeId2, setAccountTypeId2] = useState(4);
  const [transactionTypeId2, setTransactionTypeId2] = useState(1);
  const [date2, setDate2] = useState("1989-12-28");
  const [amount2, setAmount2] = useState(27000);
  const [description2, setDescription2] = useState("Glene Reed take money");
  const [transactions, setTransactions] = useState([]);

  const handleAccountTypeId1Change = (event) => {
    setAccountTypeId1(event.target.value);
  };

  const handleTransactionTypeId1Change = (event) => {
    setTransactionTypeId1(event.target.value);
  };

  const handleDate1Change = (event) => {
    setDate1(event.target.value);
  };

  const handleAmount1Change = (event) => {
    setAmount1(event.target.value);
  };

  const handleDescription1Change = (event) => {
    setDescription1(event.target.value);
  };

  const handleAccountTypeId2Change = (event) => {
    setAccountTypeId2(event.target.value);
  };

  const handleTransactionTypeId2Change = (event) => {
    setTransactionTypeId2(event.target.value);
  };

  const handleDate2Change = (event) => {
    setDate2(event.target.value);
  };

  const handleAmount2Change = (event) => {
    setAmount2(event.target.value);
  };

  const handleDescription2Change = (event) => {
    setDescription2(event.target.value);
  };

  const handleSubmit = async () => {
    const url = "http://localhost:3000/api/general-journal"; // Replace with your API endpoint URL

    const requestBody = {
      accountTypeId1: parseInt(accountTypeId1),
      transactionTypeId1: parseInt(transactionTypeId1),
      date1: date1,
      amount1: parseFloat(amount1),
      description1: description1,
      accountTypeId2: parseInt(accountTypeId2),
      transactionTypeId2: parseInt(transactionTypeId2),
      date2: date2,
      amount2: parseFloat(amount2),
      description2: description2,
    };

    try {
      const response = await axios.post(url, requestBody);
      console.log("Double-entry transaction successful", response.data);
      toast.success("Double-entry transaction successful");
    } catch (error) {
      console.error("Double-entry transaction failed", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const url = "http://localhost:3000/api/general-journal";

        const response = await axios.get(url);
        const transactionsData = response.data;
        console.log(response.data);

        setTransactions(transactionsData);
      } catch (error) {
        console.error("Error retrieving transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-container">
      <div className="type-ac">
        {/* Account Type 1, Transaction Type 1, Date 1, Amount 1, Description 1 */}
      </div>

      <div className="type-ac">
        {/* Account Type 2, Transaction Type 2, Date 2, Amount 2, Description 2 */}
      </div>
      <div className="transaction-container">
        <h1>Double-entry Transaction</h1>
        <div className="type-ac">
          <div>
            <label>Account Type 1:</label>
            <select
              value={accountTypeId1}
              onChange={handleAccountTypeId1Change}
            >
              <option value="1">Assets</option>
              <option value="2">Liability</option>
              <option value="3">Revenue</option>
              <option value="4">Expense</option>
              <option value="5">Owner Equity</option>
            </select>
          </div>
          <div>
            <label>Transaction Type 1:</label>
            <select
              value={transactionTypeId1}
              onChange={handleTransactionTypeId1Change}
            >
              <option value="1">Debit</option>
              <option value="2">Credit</option>
            </select>
          </div>
          <div>
            <label>Date 1:</label>
            <input type="date" value={date1} onChange={handleDate1Change} />
          </div>
          <div>
            <label>Amount 1:</label>
            <input
              type="number"
              value={amount1}
              onChange={handleAmount1Change}
            />
          </div>
          <div>
            <label>Description 1:</label>
            <input
              type="text"
              value={description1}
              onChange={handleDescription1Change}
            />
          </div>
        </div>

        <div className="type-ac">
          <div>
            <label>Account Type 2:</label>
            <select
              value={accountTypeId2}
              onChange={handleAccountTypeId2Change}
            >
              <option value="1">Assets</option>
              <option value="2">Liability</option>
              <option value="3">Revenue</option>
              <option value="4">Expense</option>
              <option value="5">Owner Equity</option>
            </select>
          </div>
          <div>
            <label>Transaction Type 2:</label>
            <select
              value={transactionTypeId2}
              onChange={handleTransactionTypeId2Change}
            >
              <option value="1">Debit</option>
              <option value="2">Credit</option>
            </select>
          </div>
          <div>
            <label>Date 2:</label>
            <input type="date" value={date2} onChange={handleDate2Change} />
          </div>
          <div>
            <label>Amount 2:</label>
            <input
              type="number"
              value={amount2}
              onChange={handleAmount2Change}
            />
          </div>
          <div>
            <label>Description 2:</label>
            <input
              type="text"
              value={description2}
              onChange={handleDescription2Change}
            />
          </div>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="transaction-list">
        <h2>Transactions List</h2>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Transaction Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                {/* <td>{transaction.date}</td> */}
                <td>
                  {new Date(transaction.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>

                <td>
                  {transaction.transaction_type_id == 1 ? "Debit" : "Credit"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transaction;
