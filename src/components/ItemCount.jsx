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
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-between mb-3" style={{ maxWidth: '150px', width: '100%' }}>
        <button
          onClick={handleDecrement}
          className="btn btn-danger"
          disabled={count <= 1}
          aria-label="Decrementar cantidad"
          style={{ width: '40px' }} // Ajustamos el ancho de los botones
        >
          -
        </button>
        <span style={{ width: '50px', textAlign: 'center' }}>{count}</span>
        <button
          onClick={handleIncrement}
          className="btn btn-success"
          disabled={count >= stock}
          aria-label="Incrementar cantidad"
          style={{ width: '40px' }} // Ajustamos el ancho de los botones
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="btn btn-primary"
        disabled={count === 0 || stock === 0}
        aria-label="Agregar al carrito"
      >
        Agregar al carrito
      </button>
      {stock === 0 && (
        <p className="text-danger mt-2">Lo siento, este producto está agotado.</p>
      )}
    </div>
  );
};

export default ItemCount;
