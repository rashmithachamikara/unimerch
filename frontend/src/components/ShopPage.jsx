// src/components/ShopPage.js
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <div className='container'>
        <h1>Shop</h1>
      </div>
      <div className="product-list container">
        {products.map(product => (
          <div key={product.id} className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
