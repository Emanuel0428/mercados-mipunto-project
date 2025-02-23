import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Checkout = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  const handleCheckout = () => {
    // Simulación de procesar el pago
    alert('¡Compra procesada con éxito! Gracias por tu pedido.');
    // Limpiar el carrito después de la compra (opcional)
    cart.forEach((item) => removeFromCart(item.id));
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Finalizar Compra</h1>
        <p className="text-gray-600 dark:text-gray-300">El carrito está vacío.</p>
        <Link to="/categories" className="mt-4 inline-block btn-primary">
          Volver a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Finalizar Compra</h1>

        {/* Resumen del carrito */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tu Carrito</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen y formulario */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Resumen</h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">Subtotal: ${total}</p>
                <p className="text-gray-600 dark:text-gray-300">Envío: $5.00 (fijo por ahora)</p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  Total: ${(parseFloat(total) + 5).toFixed(2)}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-6 mb-2">Datos de envío</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Ciudad"
                  className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-green-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Confirmar compra
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};