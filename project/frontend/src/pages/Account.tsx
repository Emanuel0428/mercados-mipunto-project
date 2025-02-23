import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export const Account = () => {
  const { user, setUser, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      logout();
      navigate('/login');
      return;
    }

    // Verificar el token con el backend
    fetch('http://localhost:5000/api/account', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('No autorizado');
        return res.json();
      })
      .then((data) => {
        // Si el usuario en el store no coincide con el del token, actualizamos
        if (!user || user.email !== data.email) {
          setUser({ email: data.email, role: data.role });
        }
      })
      .catch(() => {
        logout();
        localStorage.removeItem('token'); // Limpiar token inválido
        navigate('/login');
      });
  }, [user, setUser, logout, navigate]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-600 dark:text-gray-300">Por favor, inicia sesión para ver tu cuenta.</p>
        <Link to="/login" className="mt-4 inline-block btn-primary">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token'); // Limpiar token al cerrar sesión
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 mb-6"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver
        </button>

        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Mi Cuenta</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Bienvenido, {user.email}</p>

        {user.role === 'admin' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Panel de Administrador</h2>
            <p className="text-gray-600 dark:text-gray-300">Aquí puedes gestionar productos, usuarios, etc.</p>
            {/* Placeholder para futuras funcionalidades */}
            <button className="mt-4 btn-primary">Gestionar productos</button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Panel de Usuario</h2>
            <p className="text-gray-600 dark:text-gray-300">Aquí puedes ver tus pedidos y datos personales.</p>
            {/* Placeholder para historial de compras */}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 flex items-center gap-2"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </motion.div>
    </div>
  );
};