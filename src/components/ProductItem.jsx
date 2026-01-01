import React, { memo } from 'react'

const ProductItem = memo(({ product, onDelete, onEdit }) => {
  return (
    <li className="flex justify-between items-center border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <div className="flex-1">
        <p className="font-bold text-lg">{product.productName}</p>
        <p className="text-gray-600">${parseFloat(product.price).toFixed(2)} USD</p>
        <div className="flex gap-3 text-sm mt-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {product.category}
          </span>
          <span
            className={`px-2 py-1 rounded ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={onEdit}
          className="btn bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
