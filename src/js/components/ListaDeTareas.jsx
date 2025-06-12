import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import '../../styles/index.css';

const ListaDeTareas = () => {
  const [listaDeTareas, setListaDeTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = (e) => {
    if (e.key === 'Enter' && nuevaTarea.trim()) {
      setListaDeTareas([...listaDeTareas, nuevaTarea.trim()]);
      setNuevaTarea('');
    }
  };

  const eliminarTarea = (indice) => {
    setListaDeTareas(listaDeTareas.filter((_, i) => i !== indice));
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">tareas</h1>

      {/* Tarjeta principal */}
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
            <li className="mensaje-vacio">No hay tareas, añadir tareas</li>
          ) : (
            listaDeTareas.map((tarea, i) => (
              <li key={i} className="tarea">
                <span>{tarea}</span>
                <button className="borrar" onClick={() => eliminarTarea(i)}>
                  <Trash2 size={16} />
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="contador">
          {listaDeTareas.length === 1
            ? '1 tarea pendiente'
            : `${listaDeTareas.length} tareas pendientes`}
        </div>
      </div>

      {/* Hoja extra debajo de la tarjeta */}
      <div className="hoja-extra"></div>
    </div>
  );
};

export default ListaDeTareas;
