import React, { useState } from 'react';

const ProductCalculator = () => {
  const [boxCount, setBoxCount] = useState(0); // Quti soni
  const [productCount, setProductCount] = useState(0); // Mahsulot soni

  const productsPerBox = 20; // Har bir qutidagi mahsulotlar soni

  const handleBoxCountChange = (e:any) => {
    const count = e.target.value;
    setBoxCount(count);
    setProductCount(count * productsPerBox); // Mahsulot sonini hisoblash
  };

  return (
    <div>
      <label>
        Quti soni:
        <input
          type="number"
          value={boxCount}
          onChange={handleBoxCountChange}
        />
      </label>
      <br />
      <label>
        Mahsulot soni:
        <input type="number" value={productCount} readOnly />
      </label>
    </div>
  );
};

export default ProductCalculator;
