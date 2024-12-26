// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './components/ShopPage';
import ProductPage from './components/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
