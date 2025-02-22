import React, { useState } from 'react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(50);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price <= priceRange;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Categorías</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('')}
                className={`block w-full text-left px-3 py-2 rounded ${
                  selectedCategory === ''
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Precio máximo: ${priceRange}</h3>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Buscar</h3>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No se encontraron productos que coincidan con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};