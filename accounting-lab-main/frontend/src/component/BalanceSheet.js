import axios from "axios";
import React, { useEffect, useState } from "react";

const BalanceSheet = () => {
  const [date, setDate] = useState("1989-12-28");
  // const [financialElementType, setFinancialElementType] = useState([]);
  // const [transactionType, setTransactionType] = useState([]);
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [equity, setEquity] = useState([]);
  const [sums, setSums] = useState({
    assets: 0,
    equity: 0,
    liabilities: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/balance-sheet"
        ); // Replace with your Node backend API endpoint for fetching data
        console.log(response.data);
        setAssets(response.data.assets);
        setLiabilities(response.data.liabilities);
        setEquity(response.data.equity);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(date);

    try {
      const response = await axios.get(
        "http://localhost:3000/api/balance-sheet",
        {
          params: { date },
        }
      ); // Replace with your Node backend API endpoint for fetching data
      console.log(response.data);
      setAssets(response.data.assets);
      setLiabilities(response.data.liabilities);
      setEquity(response.data.equity);
      // const sumAssets = response.data.assets.assets(
      //   (total, item) => total + item.amount,
      //   0
      // );
      // const sumEquity = equity.reduce((total, item) => total + item.amount, 0);

      // setSums({
      //   assets: sumAssets,
      //   equity: sumEquity,
      //   liabilities: sumLiabilities,
      // });
      const sumAssets = response.data.assets.reduce((total, item) => {
        const currentAmount = parseFloat(item.amount);
        // console.log(`Current item amount: ${currentAmount}`);
        return total + currentAmount;
      }, 0);
      const sumEquity = response.data.equity.reduce((total, item) => {
        const currentAmount = parseFloat(item.amount);
        // console.log(`Current item amount: ${currentAmount}`);
        return total + currentAmount;
      }, 0);
      const sumLiabilities = response.data.liabilities.reduce((total, item) => {
        const currentAmount = parseFloat(item.amount);
        // console.log(`Current item amount: ${currentAmount}`);
        return total + currentAmount;
      }, 0);
      setSums({
        assets: sumAssets,
        equity: sumEquity,
        liabilities: sumLiabilities,
      });
      console.log("Sum of assets:", sumAssets);
      // console.log("Sum of equity:", sumEquity);
      // console.log("Sum of liabilities:", sumLiabilities);
    } catch (error) {
      console.error(error);
    }

    // Implement the logic for submitting the form and generating the balance sheet
  };

  const renderBalanceSheet = () => {
    let assetSum = 0;
    let liabilitySum = 0;

    return (
      <div className="card">
        <div className="card-body">
          <h5
            id="ContentPlaceHolder_companyName"
            className="card-title text-center"
          >
            Company name Here
          </h5>
          <h5 className="card-title text-center">Balance Sheet</h5>

          <h5
            id="ContentPlaceHolder_generatedDate"
            className="card-title text-center"
          >
            AS of Data Here
            {/* As at {journalEntries[0].TransactionDate.toDateString()} */}
          </h5>

          <div className="row border-0">
            <div className="col-6">
              <div className="row border">
                <div className="col-9 border">
                  <strong>Assets</strong>
                </div>
                <div className="col-3 border text-right">
                  <strong> $</strong>
                </div>

                {assets.map((entry) => {
                  // if (entry.ElementTypeId === 1) {
                  assetSum += entry.amount;
                  return (
                    <React.Fragment key={entry.id}>
                      <div className="col-9 border">{entry.description}</div>
                      <div className="col-3 border text-right">
                        {entry.amount}
                      </div>
                    </React.Fragment>
                  );
                  // }
                  return null;
                })}
              </div>
            </div>

            <div className="col-6">
              <div className="row border">
                <div className="col-9 border">
                  <strong>Liabilitiesssssss</strong>
                </div>
                <div className="col-3 border text-right">
                  <strong> $</strong>
                </div>

                {liabilities.map((entry) => {
                  // if (entry.ElementTypeId === 3) {
                  liabilitySum += entry.amount;
                  return (
                    <React.Fragment key={entry.id}>
                      <div className="col-9 border">{entry.description}</div>
                      <div className="col-3 border text-right">
                        {entry.amount}
                      </div>
                    </React.Fragment>
                  );
                  // }
                  // return null;
                })}

                {equity.map((entry) => {
                  return (
                    <React.Fragment key={entry.id}>
                      <div className="col-9 border">{entry.description}</div>
                      <h1 className="col-3 border text-right">
                        {entry.amount}
                      </h1>
                    </React.Fragment>
                  );
                })}

                <div className="col-9 border">
                  <strong>Net Worth</strong>
                </div>
                {/* <div className="col-3 border text-right">{equity}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-center">
      <p className="display-4">Balance Sheet</p>
      {/* FORM FOR GETTING BALANCE SHEET ON SPECIFIC DATA  */}
      <form onSubmit={handleSubmit}>
        <div className="card mb-2">
          <div className="card-body">
            <h5 className="card-title"></h5>
            <div className="row g-3">
              <div className="col-5">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    Select Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>

                <input
                  type="submit"
                  name="btnSubmit"
                  value="Generate"
                  id="ContentPlaceHolder_btnSubmit"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* RENDERING BALANCE SHEET  */}
      {assets.length > 0 ? (
        <React.Fragment>
          <div className="card">
            <div className="card-body">
              <h5
                id="ContentPlaceHolder_companyName"
                className="card-title text-center"
              >
                Company name Here
              </h5>
              <h5 className="card-title text-center">Balance Sheet</h5>
              <h5
                id="ContentPlaceHolder_generatedDate"
                className="card-title text-center"
              >
                AS of Data Here
                {/* As at {journalEntries[0].TransactionDate.toDateString()} */}
              </h5>

              <div className="row border-0">
                <div className="col-6">
                  <div className="row border">
                    <div className="col-9 border">
                      <strong>Assets</strong>
                    </div>
                    <div className="col-3 border text-right">
                      <strong> $</strong>
                    </div>

                    {assets.map((entry) => {
                      // if (entry.ElementTypeId === 1) {
                      // assetSum += entry.amount;
                      return (
                        <React.Fragment key={entry.id}>
                          <div className="col-9 border">
                            {entry.description}
                          </div>
                          <div className="col-3 border text-right">
                            {entry.amount}
                          </div>
                        </React.Fragment>
                      );
                      // }
                      return null;
                    })}
                  </div>
                  <h2>Sum of Assets: {sums.assets}</h2>
                </div>

                <div className="col-6">
                  <div className="row border">
                    <div className="col-9 border">
                      <strong>Liabilities</strong>
                    </div>
                    <div className="col-3 border text-right">
                      <strong> $</strong>
                    </div>

                    {liabilities.map((entry) => {
                      // if (entry.ElementTypeId === 3) {
                      // liabilitySum += entry.amount;
                      return (
                        <React.Fragment key={entry.id}>
                          <div className="col-9 border">
                            {entry.description}
                          </div>
                          <div className="col-3 border text-right">
                            {entry.amount}
                          </div>
                        </React.Fragment>
                      );
                      // }
                      // return null;
                    })}

                    {equity.map((entry) => {
                      // if (entry.ElementTypeId === 3) {
                      // liabilitySum += entry.amount;
                      return (
                        <React.Fragment key={entry.id}>
                          <div className="col-9 border">
                            {entry.description}
                          </div>
                          <div className="col-3 border text-right">
                            {entry.amount}
                          </div>
                        </React.Fragment>
                      );
                      // }
                      // return null;
                    })}
                    <h1>
                      <div>
                        <h2>
                          Equity+Liability: {sums.equity + sums.liabilities}
                        </h2>
                        <h2></h2>
                      </div>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <h4 className=" text-center">No Transaction Found</h4>
      )}
    </div>
  );
};

export default BalanceSheet;
