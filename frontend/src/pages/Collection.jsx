import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { assets } from "../assets/assets"; // Fix: Correct import path

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    types: [],
  });
  const [sortBy, setSortBy] = useState("relevant");

  // Initialize filtered products when component mounts
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  // Handle category filter changes
  const handleCategoryFilter = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    setFilters({ ...filters, categories: updatedCategories });
  };

  // Handle type filter changes
  const handleTypeFilter = (type) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    setFilters({ ...filters, types: updatedTypes });
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filters
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply type filters
    if (filters.types.length > 0) {
      result = result.filter((product) =>
        filters.types.includes(product.subCategory)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [filters, sortBy, products]);

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and sort section */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filters */}
        <div className="sm:w-64">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-lg font-medium mb-4 sm:hidden"
          >
            Filters
            <img
              src={assets.dropdown_icon}
              alt="toggle"
              className={`w-4 h-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`space-y-6 ${showFilters ? "block" : "hidden sm:block"}`}
          >
            {/* Category filters */}
            <div className="border rounded p-4">
              <h3 className="font-medium mb-3">Categories</h3>
              {["Men", "Women", "Kids"].map((category) => (
                <label key={category} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryFilter(category)}
                    className="rounded"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>

            {/* Type filters */}
            <div className="border rounded p-4">
              <h3 className="font-medium mb-3">Types</h3>
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={filters.types.includes(type)}
                    onChange={() => handleTypeFilter(type)}
                    className="rounded"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Title text1="Our" text2="Collection" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-1"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No products match your selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
