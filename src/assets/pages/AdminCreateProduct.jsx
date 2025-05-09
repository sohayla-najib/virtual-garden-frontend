import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminCreateProduct.css";

const AdminCreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    categoryId: "",
  });
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (image) {
      data.append("image", image);
    }

    try {
      await axios.post("https://virtual-garden-backend.vercel.app/api/shop/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        categoryId: "",
      });
      setImage(null);
      document.getElementById("image").value = ""; // Clear file input
    } catch (err) {
      console.error("Error adding product:", err);
      alert("❌ Failed to add product.");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://virtual-garden-backend.vercel.app/api/shop/categories",
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-content">
        <h1 className="form-heading">Add New Product</h1>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Price</label>
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Stock</label>
          <input name="stock" type="number" value={formData.stock} onChange={handleChange} required />

          <label>Category</label>
          <select name="categoryId" onChange={handleChange} value={formData.categoryId} required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <label>Image</label>
          <input id="image" type="file" onChange={handleImageChange} required />

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
