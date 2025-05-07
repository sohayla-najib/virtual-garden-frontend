import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import About from './assets/pages/About';
import Community from './assets/pages/Community';
import Shop from './assets/pages/Shop';
import Account from './assets/pages/Account';
import Dashboard from './assets/pages/Dashboard'; 
import Navbar from './assets/components/Navbar';
import OneSingleBlog from './assets/pages/OneSingleBlog';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Register from './assets/pages/Register';
import Cart from './assets/pages/Cart';
import Checkout from './assets/pages/Checkout';
import Orders from './assets/pages/Orders';
import AdminDashboard from './assets/pages/AdminDashboard';
import AdminOrdersPage from './assets/pages/AdminOrdersPage';
import AdminCreateBlog from './assets/pages/AdminCreateBlog';
import AdminCreateProduct from './assets/pages/AdminCreateProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/account" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<OneSingleBlog />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrdersPage />} />
        <Route path="/admin/create-blog" element={<AdminCreateBlog />} />
        <Route path="/admin/create-product" element={<AdminCreateProduct />} />

      </Routes>
    </Router>
  );
}

export default App;
