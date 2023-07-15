import React, { useState, useEffect } from "react";
import axios from "axios";
import { client } from "../api/client";
import { toast } from "react-toastify";

function SellInventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/inventory"; // Replace with your API endpoint URL

        const response = await axios.get(apiUrl);
        const inventoryData = response.data;
        console.log(inventoryData);
        setInventoryItems(inventoryData);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleItemSelect = (itemId, quantity) => {
    const selectedItem = selectedItems.find((item) => item.id === itemId);

    if (selectedItem) {
      const updatedItems = selectedItems.filter((item) => item.id !== itemId);
      setSelectedItems(updatedItems);
    } else {
      const item = inventoryItems.find((item) => item.id === itemId);
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { ...item, quantity },
      ]);
    }
  };

  const handleQuantityChange = (event, itemId) => {
    const quantity = parseInt(event.target.value);
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleSell = async () => {
    if (selectedItems.length === 0) {
      console.log("No items selected for sell");
      return;
    }
    // console.log(selectedItems);

    try {
      const url = "http://localhost:3000/api/general-journal"; // Replace with your API endpoint URL
      const username = prompt("Enter your username:"); // Prompt the user for the username
      if (!username) {
        console.log("Username is required");
        return;
      }

      //  Create a new user
      // console.log(selectedItems);
      for (const item of selectedItems) {
        // console.log(item.price);
        const requestBody = {
          accountTypeId1: 3,
          transactionTypeId1: 2,
          date1: new Date().toISOString().split("T")[0],
          amount1: item.selling_price * item.quantity,
          description1: "sales",
          accountTypeId2: 4,
          transactionTypeId2: 1,
          date2: new Date().toISOString().split("T")[0],
          amount2: item.price * item.quantity,
          description2: "cost of good sold",
        };
        console.log(requestBody);
        const response = await axios.post(url, requestBody);
        console.log("Double-entry transaction successful", response.data);
      }

      const responseUser = await axios.post(
        "http://localhost:3000/api/v1/users/sign-up",
        {
          username: username,
          password: "password123",
          phone: "1234567890",
          email: `${username}@example.com`,
        }
      );
      // Make the API call to sell the selected items
      const apiUrl = "http://localhost:3000/api/sell-product"; // Replace with your API endpoint URL
      const sellData = {
        items: selectedItems.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        })),
      };
      console.log(sellData);
      const response = await axios.post(apiUrl, {
        ...sellData,
        userId: responseUser.data.id,
      });
      toast.success("Sell inventory success");

      console.log("Sell successful", response.data);
      // Do something with the response if needed

      // Reset the selected items
      setSelectedItems([]);
    } catch (error) {
      console.error("Error selling items:", error);
      // Handle the error condition
    }
  };

  return (
    <div className="sell-inventory">
      <h2>Sell Inventory</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>in Inventory</th>
            <th>Select</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.selling_price}</td>
              <td>{item.total_quantity}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                  onChange={() => handleItemSelect(item.id, item.quantity || 1)}
                />
              </td>
              <td>
                {selectedItems.some(
                  (selectedItem) => selectedItem.id === item.id
                ) && (
                  <input
                    type="number"
                    value={
                      selectedItems.find(
                        (selectedItem) => selectedItem.id === item.id
                      )?.quantity || 1
                    }
                    onChange={(event) => handleQuantityChange(event, item.id)}
                    min="1"
                    max={item.stock}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSell}>Sell</button>
    </div>
  );
}

export default SellInventory;
