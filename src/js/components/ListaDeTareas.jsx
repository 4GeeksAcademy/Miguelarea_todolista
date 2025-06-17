import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import '../../styles/index.css';

const user = 'Miguelarea';

const ListaDeTareas = () => {
  const [listaDeTareas, setListaDeTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Crear usuario al iniciar (solo si no existe)
  useEffect(() => {
    crearUsuario().then(getTareas);
  }, []);

  const crearUsuario = async () => {
    try {
      const res = await fetch(`https://playground.4geeks.com/todo/users/${user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([])
      });

      if (res.status === 400) {
        console.log('✅ Usuario ya existe.');
      } else if (!res.ok) {
        const text = await res.text();
        console.error('🚫 Error creando usuario:', res.status, text);
      } else {
        console.log('✅ Usuario creado correctamente.');
      }
    } catch (error) {
      console.error('❌ Error en crearUsuario:', error);
    }
  };

  const getTareas = () => {
    fetch(`https://playground.4geeks.com/todo/users/${user}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.todos)) {
          setListaDeTareas(data.todos);
        } else {
          console.warn('⚠ No hay tareas o formato incorrecto:', data);
          setListaDeTareas([]);
        }
      })
      .catch(err => console.error('❌ Error al obtener tareas:', err));
  };

  const agregarTarea = (e) => {
    if (e.key === 'Enter' && nuevaTarea.trim()) {
      const tarea = {
        label: nuevaTarea.trim(),
        is_done: false
      };

      fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarea)
      })
        .then(res => {
          if (!res.ok) throw new Error('❌ Error al crear tarea');
          return res.json();
        })
        .then(() => {
          console.log('✅ Tarea agregada');
          setNuevaTarea('');
          getTareas();
        })
        .catch(err => console.error(err));
    }
  };

  const eliminarTarea = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => getTareas())
      .catch(err => console.error('❌ Error al eliminar tarea:', err));
  };

  const eliminarTodas = () => {
    Promise.all(
      listaDeTareas.map((tarea) =>
        fetch(`https://playground.4geeks.com/todo/todos/${tarea.id}`, {
          method: 'DELETE'
        })
      )
    )
      .then(() => getTareas())
      .catch(err => console.error('❌ Error al eliminar todas:', err));
  };

  return (
  <div className="contenedor">
    <h2 className="titulo">Tareas de {user}</h2>

    <div className="tarjeta">
      <input
        className="entrada"
        type="text"
        placeholder="¿Qué hay que hacer?"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        onKeyDown={agregarTarea}
      />

      <ul className="lista">
        {listaDeTareas.length === 0 ? (
          <li className="mensaje-vacio">No hay tareas, añade una</li>
        ) : (
          listaDeTareas.map((tarea) => (
            <li key={tarea.id} className="tarea">
              <span>{tarea.label}</span>
              <button className="borrar" onClick={() => eliminarTarea(tarea.id)}>
                <Trash2 size={16} />
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="contador">
        {listaDeTareas.length} tareas pendientes
      </div>
    </div>

    <div className="boton-limpiar-wrapper">
      <button className="borrar-todo" onClick={eliminarTodas}>
        Limpiar todas las tareas
      </button>
    </div>
    <div className="hoja-extra"></div>
  </div>
 );
};

export default ListaDeTareas;
