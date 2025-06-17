import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import '../../styles/index.css';

const user = 'Miguelarea';
const ListaDeTareas = () => {
  const [listaDeTareas, setListaDeTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  // Cargar tareas al montar
  useEffect(() => {
    getTareas();
  }, []);

  // GET
  const getTareas = () => {
    fetch(`https://playground.4geeks.com/todo/users/${user}`)
      .then(res => res.json())
      .then(data => setListaDeTareas(Array.isArray(data.todos) ? data.todos : []))
      .catch(err => console.error('❌ Error al obtener tareas:', err));
  };

  // POST (crear una)
  const agregarTarea = (e) => {
    if (e.key === 'Enter' && nuevaTarea.trim()) {
      const tarea = { label: nuevaTarea.trim(), is_done: false };
      fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarea)
      })
        .then(res => {
          if (!res.ok) throw new Error('❌ Error al crear tarea');
          return res.json();
        })
        .then(() => {
          setNuevaTarea('');
          getTareas();
        })
        .catch(err => console.error(err));
    }
  };

  // DELETE individual
  const eliminarTarea = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('❌ Error al eliminar tarea');
        getTareas();
      })
      .catch(err => console.error(err));
  };

  // DELETE todas
  const eliminarTodas = () => {
    fetch(`https://playground.4geeks.com/todo/users/${user}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('❌ Error al eliminar todas las tareas');
        setListaDeTareas([]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Tareas de {user}</h2>

      <div className="tarjeta">
        <input
          className="entrada"
          placeholder="¿Qué hay que hacer?"
          value={nuevaTarea}
          onChange={e => setNuevaTarea(e.target.value)}
          onKeyDown={agregarTarea}
        />

        <ul className="lista">
          {listaDeTareas.length === 0 ? (
            <li className="mensaje-vacio">No hay tareas, añade una</li>
          ) : (
            listaDeTareas.map(t => (
              <li key={t.id} className="tarea">
                <span>{t.label}</span>
                <button className="borrar" onClick={() => eliminarTarea(t.id)}>
                  <Trash2 size={16} />
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="contador">
          {listaDeTareas.length} tareas pendientes
        </div>

        <button className="borrar-todo" onClick={eliminarTodas}>
          Limpiar todas las tareas
        </button>
      </div>
    </div>
  );
};

export default ListaDeTareas;

