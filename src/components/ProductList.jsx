import React from "react";
import ProductItem from "./ProductItem";

function ProductList({
  products = [],
  onDeleteProduct = () => {},
  onEditProduct = () => {},
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <ul className="space-y-3">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onDelete={() => onDeleteProduct(product.id)}
              onEdit={() => onEditProduct(product.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;


