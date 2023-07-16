import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    supplier: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/products"; // Replace with your API endpoint URL

      const response = await axios.get(apiUrl);
      console.log("------->", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const apiUrl = "http://localhost:3000/api/suppliers"; // Replace with your API endpoint URL

      const response = await axios.get(apiUrl);
      console.log("------->", response.data);
      setSuppliers(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    const productToAdd = {
      ...newProduct,
      supplier_id: newProduct.supplier, // Use the selected supplier ID
    };

    setProducts((prevProducts) => [...prevProducts, productToAdd]);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      supplier_id: "",
    });

    try {
      const apiUrl = "http://localhost:3000/api/products"; // Replace with your API endpoint URL

      // Make the API call to add the new product
      const response = await axios.post(apiUrl, productToAdd);
      console.log(response.data);

      // Reset the form
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        supplier: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management for Supplier</h2>
      <form>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="supplier">Supplier:</label>
          <select
            id="supplier"
            name="supplier"
            value={newProduct.supplier}
            onChange={handleInputChange}
          >
            <option value="">Select Supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>

      <h3>Product List</h3>
      <table>
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.supplier_name}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductManagement;
