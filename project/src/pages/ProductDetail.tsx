import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../store/useStore';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p>Producto no encontrado</p>
        <button onClick={() => navigate(-1)} className="btn-primary mt-4">
          Volver
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary mb-8"
      >
        <ArrowLeft className="mr-2" size={20} />
        Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            {product.name}
          </h1>
          <p className="text-xl text-primary dark:text-green-400 font-bold">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {product.description}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              Disponibles: {product.stock}
            </span>
            <span className="text-gray-600 dark:text-gray-300">|</span>
            <span className="text-gray-600 dark:text-gray-300 capitalize">
              Categoría: {product.category}
            </span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <ShoppingCart size={20} />
            Agregar al carrito
          </button>
        </motion.div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                  <p className="text-primary dark:text-green-400 font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    className="btn-primary w-full mt-4"
                  >
                    Ver detalles
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};