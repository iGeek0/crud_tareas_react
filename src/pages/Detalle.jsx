import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { usuario } from "../data/info";

function Detalle() {

    const [formData, setFormData] = useState({
        tarea: '',
        usuario: usuario,
    });

    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones con los datos del formulario
        if (formData.tarea === '' || formData.usuario === '') {
            alert('Faltan datos por llenar');
            return;
        }
        try {
            const response = await axios.post('https://dev4humans.com.mx/api/Clases/tareas', formData);
            console.log('Respuesta de la API:', response.data);
            // limpiar formulario
            setFormData({
                tarea: '',
                usuario: usuario,
            });
            alert('Tarea guardada correctamente');
        } catch (error) {
            // Manejar errores
            console.error('Error al enviar la solicitud:', error);
        }
        console.log('Datos del formulario:', formData);
    };

    useEffect(() => {
        if (id) {
            const getTarea = async () => {
                try {
                    const response = await axios.get(`https://dev4humans.com.mx/api/clases/tareas?usuario=${usuario}&id=${id}`);
                    console.log('Respuesta de la API:', response.data);
                    setFormData(response.data.data);
                } catch (error) {
                    console.error('Error al obtener la tarea:', error);
                }
            }
            getTarea();
        }
    }, [id]);
    return (
        <>
            <div className="vh-100 bg-danger">
                <form className="p-2" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Tarea</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tarea"
                            value={formData.tarea}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange} disabled />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>

        </>
    );
}

export default Detalle;