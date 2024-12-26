import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShopPage.module.css';
import axiosInstance from '../utils/axios';
import fashionModel from '../assets/Model-PNG-Pic.png';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    axiosInstance.get('/products')
      .then((response) => {
        console.log(response.data.data);
        setProducts(response.data.data);
        setLoading(false); // Set loading to false once the products are loaded
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false); // Also stop loading if there's an error
      });
  }, []);

  const navigateTo = useNavigate();

  const heroStyles = {
    backgroundImage: `url(${fashionModel})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className="min-h-screen">
      <div style={heroStyles}>
        <div className="container mx-auto px-4">
          <div className={styles.hero}>
            <div className={`${styles.tagline} text-4xl font-bold text-gray-900 mb-4`}>
              Find Clothes That Matches Your Style
            </div>
            <div className={`${styles.subtitle} text-lg text-gray-600 max-w-2xl mb-6`}>
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense of style.
            </div>
            <button className="px-8 py-2 rounded-full bg-gray-800 hover:bg-slate-950 text-white transition duration-300">
              Shop now
            </button>
          </div>
        </div>
      </div>

      <div className={styles.partners}></div>

      <div className="py-12">
        <h2 className="text-center text-4xl font-bold mb-12">Our Products</h2>

        <div className="container mx-auto px-4">
          {/* Show loading spinner if products are still loading */}
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="cursor-pointer"
                  onClick={() => navigateTo(`/products/${product.id}`)}
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 aspect-w-1 aspect-h-1 w-full">
                    {/* Conditional rendering for product image */}
                    {product.image ? (
                      <img
                        src={`${import.meta.env.VITE_IMAGE_BASE_URL}${product.image}`}
                        alt={product.name}
                        className="w-full h-64 object-contain object-center"
                      />
                    ) : (
                      <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
