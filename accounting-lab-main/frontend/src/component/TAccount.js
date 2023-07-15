import axios from "axios";
import React, { useEffect, useState } from "react";
import { client } from "../api/client";

function getAccountName(accountType) {
  // Create a map of account type IDs and their corresponding names
  const accountTypes = {
    1: "Assets",
    2: "Liabilities",
    3: "Revenue",
    4: "Expense",
    5: "Owner Equity",
    // Add more account types as needed
  };

  // Check if the account type exists in the map
  if (accountTypes.hasOwnProperty(accountType)) {
    // Return the account name
    return accountTypes[accountType];
  }

  // Return a default value or an error message if the account type is not found
  return "Unknown Account";
}

const TAccount = () => {
  const [accountTypeId, setAccountTypeId] = useState(1); // Initial account type is set to 1 (Assets)
  const [debitTransactions, setDebitTransactions] = useState([]);
  const [creditTransactions, setCreditTransactions] = useState([]);

  useEffect(() => {
    fetchData(accountTypeId);
  }, [accountTypeId]);

  const fetchData = async (typeId) => {
    try {
      const response = await client.get(`t-accounts/${typeId}`); // Replace with your Node backend API endpoint for fetching data
      console.log(response.data);
      setDebitTransactions(response.data.debitTransactions);
      setCreditTransactions(response.data.creditTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccountTypeChange = (e) => {
    const selectedTypeId = parseInt(e.target.value);
    setAccountTypeId(selectedTypeId);
  };

  return (
    <React.Fragment>
      <div className="account-type-select">
        <label htmlFor="account-type">Select Account Type: </label>
        <select
          id="account-type"
          value={accountTypeId}
          onChange={handleAccountTypeChange}
        >
          <option value={1}>Assets</option>
          <option value={2}>Liabilities</option>
          <option value={3}>Revenue</option>
          <option value={4}>Expense</option>
          <option value={5}>Owner Equity</option>
        </select>
      </div>
      <h2 className="text-center">
        Account Type: {getAccountName(accountTypeId)}
      </h2>
      <div className="t-account-div">
        <div>
          <h3>Debit Transactions</h3>
          {debitTransactions.map((transaction) => (
            <div className="span-div" key={transaction.id}>
              <span>{new Date(transaction.date).toLocaleDateString()} </span>
              <span>{transaction.description + " "} </span>
              <p style={{ textAlign: "right" }}> {transaction.amount}</p>
            </div>
          ))}

          <h4 style={{ textAlign: "right" }}>
            Total:
            {debitTransactions.reduce((total, transaction) => {
              if (transaction.transaction_type_id === 1) {
                return total + parseFloat(transaction.amount);
              }
              return total;
            }, 0)}
          </h4>
        </div>

        <div>
          <h3>Credit Transactions</h3>
          {creditTransactions.map((transaction) => (
            <div className="span-div" key={transaction.id}>
              <span>{new Date(transaction.date).toLocaleDateString()} </span>
              <span>{transaction.description + " "} </span>
              <p style={{ textAlign: "right" }}>{transaction.amount}</p>
            </div>
          ))}

          <h4 style={{ textAlign: "right" }}>
            Total:{" "}
            {creditTransactions.reduce((total, transaction) => {
              if (transaction.transaction_type_id === 2) {
                return total + parseFloat(transaction.amount);
              }
              return total;
            }, 0)}
          </h4>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TAccount;
