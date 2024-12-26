import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Adding to cart:', {
      productId: product.id,
      quantity,
      size: selectedSize
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              {product.image ? (
                <img
                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <nav className="mb-4">
              <ol className="flex text-sm text-gray-500">
                <li>Shop</li>
                <li className="mx-2">/</li>
                <li className="text-gray-900">{product.name}</li>
              </ol>
            </nav>

            {/* Product Info */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-900 mb-6">${product.price}</p>
            
            <div className="prose prose-sm text-gray-500 mb-6">
              <p>{product.description}</p>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Select Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`py-2 text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center border rounded-md w-32">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center focus:outline-none"
                />
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              {selectedSize ? 'Add to Cart' : 'Select a Size'}
            </button>

            {/* Additional Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
                Free shipping on orders over $100
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                30-day return policy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
