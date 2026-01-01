import { useState, useEffect } from "react";

const ProductForm = ({
  onAddProduct,
  onUpdateProduct,
  editingProduct,
  onCancelEdit,
}) => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingProduct) {
      setProductName(editingProduct.productName);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setInStock(editingProduct.inStock);
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!productName || price <= 0 || !category) {
      setError("Please fill all fields correctly.");
      return;
    }

    const newProduct = { productName, price: parseFloat(price), category, inStock };

    if (editingProduct) {
      onUpdateProduct(editingProduct.id, newProduct);
    } else {
      onAddProduct(newProduct);
    }

    // Reset form
    setProductName("");
    setPrice("");
    setCategory("");
    setInStock(false);
    setError("");
  };

  const handleCancel = () => {
    setProductName("");
    setPrice("");
    setCategory("");
    setInStock(false);
    setError("");
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>}
        <input
          className="input w-full border p-2 rounded"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="input w-full border p-2 rounded"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <select
          className="input w-full border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
          />
          <span>In Stock</span>
        </label>
        <div className="flex gap-2">
          <button type="submit" className="btn bg-blue-500 text-white p-2 rounded flex-1">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-gray-400 text-white p-2 rounded flex-1"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;