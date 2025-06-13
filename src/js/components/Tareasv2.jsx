import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const tareasv2 = () => {
    const [tareasv2, settareasv2] = useState ([]);
    const [nuevastareasv2, setnuevastareasv2] = useState ('');

    const addtarea = (e) => {
        if (e.key === 'Enter' && nuevastareasv2.trim()){
            settareasv2([...tareasv2, nuevastareasv2.trim()]);
            setnuevastareasv2('');
        }
    }

    const quitartarea = (indice) => {
        setnuevastareasv2(nuevastareasv2.filter((_,i)=> i !=indice))
    }

    return (
        <div className="contenedor">
            <h1 className ="titulo">tareas</h1>

            <div className="tarjeta">
                <input
                    className="entrada"
                    type="text"
                    placeholder="añadir tareas"
                    value={nuevastareasv2}
                    onchange={(e)=> setnuevastareasv2(e.target.value)}
                    onKeyDown={addtarea}
                />
                
                <ul className="lista">
                    {tareasv2.length === 0 ?(
                        <li className = "mensaje-vacio">no hay tareas pendientes, agrega tarea</li>
                    ) : (
                        tareasv2.map((tarea, i) => (
                            <li key={i} className = "tarea">
                                <span>{tarea}</span>
                                <button className="borrar" onclick={() => quitartarea(I)}>
                                    <Trash2 size=(16)/>
                                </button>
                            </li>
                        ))
                    )}
                </ul>

                <div className="contador">
                    {tareasv2.lenght === 1
                    ? '1 tarea pendiente'
                    : `${tareasv2.lenght} tareas pendientes`}
                </div>
            </div>




        </div>
    )

}

export default tareasv2