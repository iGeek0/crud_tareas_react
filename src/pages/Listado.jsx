import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

import { usuario } from '../data/info';

function Listado() {

    const [tareas, setTareas] = useState([]);
    const [loading, setLoading] = useState(true);



    const getTareas = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://dev4humans.com.mx/api/clases/tareas?usuario=${usuario}`);
            setTareas(response.data.data);
        } catch (error) {
            setTareas([]);
            console.error('Error al obtener las tareas:', error);
        }
        setLoading(false);

    }
    useEffect(() => {
        console.log('Obteniendo tareas...');
        getTareas();
    }, []);

    const eliminarTarea = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://dev4humans.com.mx/api//clases/tareas?id=${id}&usuario=${usuario}`);
            console.log('Respuesta de la API:', response.data);
            // const newTareas = tareas.filter(tarea => tarea.id !== id);
            // setTareas(newTareas);
            await getTareas();
            alert('Tarea eliminada correctamente');
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <>
            <div className="vh-100 bg-primary">
                <div className='table-responsive p-2'>
                    <table className="table table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Tarea</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tareas.map((tarea, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{tarea.fecha_registros}</td>
                                    <td>{tarea.tarea}</td>
                                    <td className='text-center'>
                                        <Link className="btn btn-primary me-2" to={`/editar/${tarea.id}`}>Editar</Link>
                                        <button className="btn btn-danger" onClick={() => { eliminarTarea(tarea.id) }}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                            {tareas.length === 0 && (
                                <tr>
                                    <td colSpan="3" className='text-center'>No hay tareas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default Listado;