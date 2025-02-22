import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-green-600 to-green-400">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
            alt="Fresh produce"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-5xl font-bold mb-6">
              Productos frescos directo a tu hogar
            </h1>
            <p className="text-xl mb-8">
              Descubre nuestra selección de productos frescos y de alta calidad.
              Entrega el mismo día en tu zona.
            </p>
            <Link
              to="/categories"
              className="inline-flex items-center btn-secondary text-lg"
            >
              Ver ofertas
              <ChevronRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/categories" className="btn-primary">
            Ver todos los productos
          </Link>
        </div>
      </section>

      {/* Promotions */}
      <section className="bg-secondary/10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Ofertas Especiales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1609842947419-ba4f04d5f36f?auto=format&fit=crop&q=80&w=500"
                alt="Frutas frescas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">2x1 en Frutas</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Lleva dos kilos de frutas seleccionadas por el precio de uno.
                </p>
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=500"
                alt="Verduras orgánicas"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  30% en Verduras Orgánicas
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Descuento especial en toda nuestra línea de verduras orgánicas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};