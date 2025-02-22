import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary dark:text-green-400">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="btn-primary flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};