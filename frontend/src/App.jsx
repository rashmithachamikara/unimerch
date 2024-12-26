// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/ShopPage';
import ProductPage from './components/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AdminProductList from './components/AdminProductList';
import AdminCreateProduct from './components/AdminCreateProduct';
import AdminEditProduct from './components/AdminEditProduct';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path='/admin/products' element={<AdminProductList />} />
        <Route path='/admin/products/create' element={<AdminCreateProduct />} />
        <Route path='/admin/products/edit/:id' element={<AdminEditProduct />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
