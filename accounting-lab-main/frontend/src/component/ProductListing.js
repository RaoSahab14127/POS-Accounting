import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/products"; // Replace with your API endpoint URL

        // Fetch product data from the API
        const response = await axios.get(apiUrl);
        const productsData = response.data;

        // Set the product data in the state
        setProducts(productsData);
      } catch (error) {
        console.error("Error retrieving product listing:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    const isSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (isSelected) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter(
          (selectedProduct) => selectedProduct.id !== product.id
        )
      );
    } else {
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        { ...product, quantity: 1 }, // Add quantity property with initial value
      ]);
    }
  };

  const handleQuantityChange = (event, product) => {
    const { value } = event.target;
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((selectedProduct) =>
        selectedProduct.id === product.id
          ? { ...selectedProduct, quantity: parseInt(value) }
          : selectedProduct
      )
    );
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePurchase = async () => {
    try {
      if (selectedProducts.length === 0) {
        console.log("No products selected");
        return;
      }

      const purchaseData = {
        products: selectedProducts.map((product) => ({
          productId: product.id,
          quantity: product.quantity, // Use the selected quantity
          supplier_id: product.supplier_id,
        })),
        // paymentMethod: paymentMethod,
      };

      const apiUrl = "http://localhost:3000/api/purchase-product"; // Replace with your API endpoint URL

      // Send the purchase request to the API
      console.log(purchaseData);
      const response = await axios.post(apiUrl, purchaseData);

      console.log("Purchase successful", response.data);
      // Do something with the response if needed

      // Create general journal entry
      const generalJournalData = {
        accountTypeId1: paymentMethod === "cash" ? 1 : 2,
        transactionTypeId1: 2,
        date1: "2023-06-20",
        amount1: response.data.totalCost,
        description1: "Purchase product ",
        accountTypeId2: "1",
        transactionTypeId2: 1,
        date2: "2023-06-20",
        amount2: response.data.totalCost,
        description2: "Get inventory from supplier",
      };

      const generalJournalApiUrl = "http://localhost:3000/api/general-journal"; // Replace with your API endpoint URL

      // Send the general journal entry request to the API
      const generalJournalResponse = await axios.post(
        generalJournalApiUrl,
        generalJournalData
      );

      console.log("General journal entry created", generalJournalResponse.data);

      // Clear the selected products
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error purchasing products:", error);
      // Handle the error condition
    }
  };

  return (
    <div className="product-listing">
      <h2>Product Listing</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Select</th>
            <th>Quantity</th> {/* Add quantity column header */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.some(
                    (selectedProduct) => selectedProduct.id === product.id
                  )}
                  onChange={() => handleProductSelect(product)}
                />
              </td>
              <td>
                {selectedProducts.some(
                  (selectedProduct) => selectedProduct.id === product.id
                ) && (
                  <input
                    type="number"
                    min="1"
                    value={
                      selectedProducts.find(
                        (selectedProduct) => selectedProduct.id === product.id
                      ).quantity
                    }
                    onChange={(event) => handleQuantityChange(event, product)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="payment-method">
        <h3>Select Payment Method:</h3>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
            />
            Cash
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="accounts-payable"
              checked={paymentMethod === "accounts-payable"}
              onChange={handlePaymentMethodChange}
            />
            Accounts Payable
          </label>
        </div>
      </div>
      <div className="selected-products">
        <h3>Selected Products</h3>
        {selectedProducts.length > 0 ? (
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}>
                {product.name} (Quantity: {product.quantity})
              </li>
            ))}
          </ul>
        ) : (
          <p>No products selected</p>
        )}
        <button onClick={handlePurchase}>Purchase</button>
      </div>
    </div>
  );
}

export default ProductListing;
