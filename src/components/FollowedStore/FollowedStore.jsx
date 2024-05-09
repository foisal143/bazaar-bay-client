import React, { useState } from 'react';

// Sample cart product list
const productList = [
  { id: 1, name: 'Product 1', price: 10 },
  { id: 2, name: 'Product 2', price: 20 },
  { id: 3, name: 'Product 3', price: 30 },
];

const Cart = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Function to handle "Select All" checkbox change
  const handleSelectAllChange = event => {
    if (event.target.checked) {
      setSelectedProducts(productList.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Function to handle individual product checkbox change
  const handleProductChange = (event, productId) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedProducts(prevSelected => [...prevSelected, productId]);
    } else {
      setSelectedProducts(prevSelected =>
        prevSelected.filter(id => id !== productId)
      );
    }
  };

  // Function to render selected products
  const renderSelectedProducts = () => {
    const selectedProductDetails = productList.filter(product =>
      selectedProducts.includes(product.id)
    );
    console.log('Selected Products:', selectedProductDetails);
  };

  // Rendering the component
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={handleSelectAllChange}
          checked={selectedProducts.length === productList.length}
        />
        Select All
      </label>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            <label>
              <input
                type="checkbox"
                onChange={event => handleProductChange(event, product.id)}
                checked={selectedProducts.includes(product.id)}
              />
              {product.name} - ${product.price}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={renderSelectedProducts}>Get Selected Products</button>
    </div>
  );
};

export default Cart;
