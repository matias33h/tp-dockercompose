import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/productos');
        setProductos(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchProductos();
  }, []);

  const handleInputChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = async () => {
    try {
      await axios.post('http://localhost:4000/productos', nuevoProducto);
      const response = await axios.get('http://localhost:4000/productos');
      setProductos(response.data);
      setNuevoProducto({ nombre: '', precio: '' });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://financialfood.es/wp-content/uploads/2019/11/Compras-en-supermercado.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h2 style={{ color: '#fff', marginBottom: '20px' }}>Listado de Productos</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {productos.map((producto) => (
            <div key={producto.id} style={{ backgroundColor: '#F2BC5A', borderRadius: '4px', padding: '10px', margin: '10px', width: '300px' }}>
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
            </div>
          ))}
        </div>
        <h3 style={{ color: '#fff', marginTop: '20px', marginBottom: '10px' }}>Agregar Nuevo Producto</h3>
        <input
          type="text"
          name="nombre"
          value={nuevoProducto.nombre}
          placeholder="Nombre del producto"
          onChange={handleInputChange}
          style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
        />
        <input
          type="text"
          name="precio"
          value={nuevoProducto.precio}
          placeholder="Precio"
          onChange={handleInputChange}
          style={{ padding: '10px', marginBottom: '10px', width: '300px' }}
        />
        <button
          onClick={agregarProducto}
          style={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '16px',
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Productos;
