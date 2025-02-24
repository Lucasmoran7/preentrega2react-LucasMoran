
import React, { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAdd = () => {
    onAdd(count); // Llama a la función onAdd pasando la cantidad
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <button onClick={handleDecrement} className="btn btn-secondary">-</button>
        <span>{count}</span>
        <button onClick={handleIncrement} className="btn btn-secondary">+</button>
      </div>
      <button onClick={handleAdd} className="btn btn-primary">
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
