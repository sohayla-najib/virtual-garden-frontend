import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./OneSingleBlog.css";

const OneSingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [authorName, setAuthorName] = useState("Anonymous");

  useEffect(() => {
    axios
      .get(`https://virtual-garden-backend.vercel.app/api/blog/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="single-blog-page">
      <div className="single-blog-container">
        <h1>{blog.title}</h1>
        <span className="author">
          by {blog.author?.username || "Anonymous"}
        </span>
        <img
          src={
            blog.imageUrl
              ? `https://virtual-garden-backend.vercel.app/uploads/${blog.imageUrl}`
              : "/fallback.png"
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.png";
          }}
          alt={blog.title}
          className="single-blog-img"
        />
        <p className="content">{blog.content}</p>
      </div>
    </div>
  );
};

export default OneSingleBlog;
