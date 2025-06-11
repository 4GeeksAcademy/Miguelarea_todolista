import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const ListaDeTareas = () => {
  const [listaDeTareas, establecerListaDeTareas] = useState([]);
  const [textoNuevaTarea, establecerTextoNuevaTarea] = useState('');

  const agregarTarea = (evento) => {
    if (evento.key === 'Enter' && textoNuevaTarea.trim()) {
      establecerListaDeTareas([...listaDeTareas, textoNuevaTarea.trim()]);
      establecerTextoNuevaTarea('');
    }
  };

  const eliminarTarea = (indiceAEliminar) => {
    establecerListaDeTareas(listaDeTareas.filter((_, indice) => indice !== indiceAEliminar));
  };

  return (
    <div className="container py-5">
      <h1 className="display-3 text-center text-muted mb-4">tareas</h1>
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <input
            className="form-control form-control-lg mb-3"
            placeholder="¿Qué hay que hacer?"
            value={textoNuevaTarea}
            onChange={(evento) => establecerTextoNuevaTarea(evento.target.value)}
            onKeyDown={agregarTarea}
          />
          <ul className="list-group">
            {listaDeTareas.length === 0 ? (
              <li className="list-group-item text-center text-muted">
                No hay tareas, añadir tareas
              </li>
            ) : (
              listaDeTareas.map((tarea, indice) => (
                <li
                  key={indice}
                  className="list-group-item d-flex justify-content-between align-items-center position-relative"
                  onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                  onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                >
                  <span>{tarea}</span>
                  <button
                    onClick={() => eliminarTarea(indice)}
                    className="btn btn-sm btn-outline-danger d-none position-absolute end-0 me-3 delete-btn"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))
            )}
          </ul>
          <div className="text-muted mt-3">
            {listaDeTareas.length === 1 ? '1 tarea pendiente' : `${listaDeTareas.length} tareas pendientes`}
          </div>
        </div>
      </div>

      <style>{`
        .list-group-item.hovered .delete-btn {
          display: inline-block !important;
        }
      `}</style>
    </div>
  );
};

export default ListaDeTareas;
