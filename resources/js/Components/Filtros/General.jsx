import React, { useState } from 'react';

const Filtros = ({ onFiltrar }) => {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleFiltrar = () => {
        onFiltrar({
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        });
    };

    return (
        <div className="flex space-x-4 mb-4">
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha Inicio:</label>
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="border rounded p-2"
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Fecha Fin:</label>
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="border rounded p-2"
                />
            </div>
            <button
                onClick={handleFiltrar}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
                Filtrar
            </button>
        </div>
    );
};

export default Filtros;
