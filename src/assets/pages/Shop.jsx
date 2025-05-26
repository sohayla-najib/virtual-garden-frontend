import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import ContactFooter from "../components/ContactFooter";
import Loader from "../components/Loader"; // import loader

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shop/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false); // done loading
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false); // hide loader on error too
      });
  }, []);

  const handleBuyNow = (productId) => {
    const token = Cookies.get("token");

    if (!token) {
      navigate("/account");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/shop/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Product added to cart!");
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        alert("Something went wrong.");
      });
  };

  return (
    <div className="shop-page">
      <Navbar />
      <div className="shop-content">
        <h2>Shop Our Plants</h2>
        {loading ? (
          <Loader />  // show loader while loading
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-container">
                  <img
                    src={product.imageUrl ? product.imageUrl : "/fallback.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/fallback.png";
                    }}
                    alt={product.name}
                    className="product-img"
                  />
                </div>
                <h3 className="product-title">{product.name}</h3>
                <div className="price-buy">
                  <span className="price">${product.price}</span>
                  <button
                    className="buy-btn"
                    onClick={() => handleBuyNow(product.id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ContactFooter />
    </div>
  );
};

export default Shop;
