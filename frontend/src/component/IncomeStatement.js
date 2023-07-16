import React, { useEffect, useState } from "react";
import "../styles/IncomeStatement.css";
import { client } from "../api/client";

const IncomeStatement = () => {
  const [date, setDate] = useState("");
  const [sums, setSums] = useState({
    revenue: 0,
    expense: 0,
  });
  const [incomeStatement, setIncomeStatement] = useState(null);
  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleGenerateStatement = async () => {
    try {
      const response = await client.get("income-statement", {
        params: { date },
      });
      console.log(response.data);
      setIncomeStatement(response.data);
      const revenueSums = response.data.revenueTransactions.reduce(
        (total, item) => {
          const currentAmount = parseFloat(item.amount);
          return total + currentAmount;
        },
        0
      );
      const expenseSums = response.data.expenseTransactions.reduce(
        (total, item) => {
          const currentAmount = parseFloat(item.amount);
          return total + currentAmount;
        },
        0
      );
      setSums({
        revenue: revenueSums,
        expense: expenseSums,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    handleGenerateStatement();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!incomeStatement) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="income-statement">
      <div className="income-statement__controls">
        <label htmlFor="dateInput" className="income-statement__label">
          Date:
        </label>
        <input
          type="date"
          id="dateInput"
          className="income-statement__input"
          value={date}
          onChange={handleDateChange}
        />
        <button
          className="income-statement__button"
          onClick={handleGenerateStatement}
        >
          Generate Statement
        </button>
      </div>
      <h2 className="income-statement__title">Income Statement</h2>
      <p className="income-statement__info">Company Name: Your Company Name</p>

      <div className="income-statement__details">
        <div className="income-statement__row">
          <span className="income-statement__label">Revenue Transactions:</span>
          <ul className="income-statement__transactions">
            {incomeStatement.revenueTransactions?.map((transaction) => (
              <li key={transaction.id}>
                <span>{transaction.description}</span>
                <span>{transaction.amount}</span>
              </li>
            ))}
            <h1>{sums.revenue}</h1>
          </ul>
        </div>
        <div className="income-statement__row">
          <span className="income-statement__label">Expense Transactions:</span>
          <ul className="income-statement__transactions">
            {incomeStatement.expenseTransactions?.map((transaction) => (
              <li key={transaction.id}>
                <span>{transaction.description}</span>
                <span>{transaction.amount}</span>
              </li>
            ))}
            <h1>{sums.expense}</h1>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;
