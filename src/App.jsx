import React, { useState, useCallback, useMemo } from "react";
import ProductForm from "./components/ProductForm.jsx";
import ProductList from "./components/ProductList.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

function App() {
  const [products, setProducts] = useLocalStorage("products", []);
  const [editingId, setEditingId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Generate unique ID
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const onAddProduct = useCallback((product) => {
    setProducts((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      { ...product, id: generateId() },
    ]);
    setEditingId(null);
    setEditingProduct(null);
  }, [setProducts]);

  // Update product

  const onUpdateProduct = useCallback((id, updatedData) => {
    setProducts((prev) =>
      Array.isArray(prev)
        ? prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
        : prev
    );
    setEditingId(null);
    setEditingProduct(null);
  }, [setProducts]);

  // Delete product with confirmation
  const deleteProduct = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this product?")) {
        setProducts((prev) =>
          Array.isArray(prev) ? prev.filter((p) => p.id !== id) : prev
        );
      }
    },
    [setProducts]
  );

  // Open edit form
  const handleEditProduct = useCallback(
    (id) => {
      const productToEdit = Array.isArray(products)
        ? products.find((p) => p.id === id)
        : null;
      if (productToEdit) {
        setEditingProduct({ ...productToEdit });
        setEditingId(id);
      }
    },
    [products]
  );

  
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditingProduct(null);
  }, []);


  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      const matchesSearch = (product?.productName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !filterCategory || product?.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, filterCategory]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Product Management Dashboard</h1>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  
          className="flex-1 input"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <ProductForm
            onAddProduct={onAddProduct}
            onUpdateProduct={onUpdateProduct}
            editingProduct={editingProduct}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <ProductList
            products={filteredProducts}
            onDeleteProduct={deleteProduct}
            onEditProduct={handleEditProduct}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
