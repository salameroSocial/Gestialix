// resources/js/Pages/Clases/Show.jsx
import React, { useState } from 'react';
import { router as Inertia } from '@inertiajs/react';


export default function Show({ clase }) {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [pago, setPago] = useState(false);
    const [intoleranciaReligion, setIntoleranciaReligion] = useState('');
    const [beca, setBeca] = useState(false);

    const handleAddStudent = (e) => {
        e.preventDefault();

        Inertia.post(`/estudiantes`, {
            nombre,
            apellidos,
            clase_id: clase.id,
            pago,
            intolerancia_religion: intoleranciaReligion,
            beca,
        }, {
            onSuccess: () => {
                setNombre('');
                setApellidos('');
                setPago(false);
                setIntoleranciaReligion('');
                setBeca(false);
            }
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clase: {clase.nombre}</h1>
            <h2 className="text-xl mb-4">Curso Académico: {clase.curso_academico}</h2>

            <h3 className="text-lg font-semibold mb-2">Estudiantes</h3>
            <ul className="mb-4">
                {clase.estudiantes.map(estudiante => (
                    <li key={estudiante.id} className="mb-2">
                        {estudiante.nombre} {estudiante.apellidos}
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-semibold mb-2">Añadir Estudiante</h3>
            <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Apellidos</label>
                    <input
                        type="text"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Pago Realizado</label>
                    <input
                        type="checkbox"
                        checked={pago}
                        onChange={(e) => setPago(e.target.checked)}
                        className="border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Intolerancia/Restricción</label>
                    <input
                        type="text"
                        value={intoleranciaReligion}
                        onChange={(e) => setIntoleranciaReligion(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Beca</label>
                    <input
                        type="checkbox"
                        checked={beca}
                        onChange={(e) => setBeca(e.target.checked)}
                        className="border p-2 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Añadir Estudiante
                </button>
            </form>
        </div>
    );
}
