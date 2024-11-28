// AddEditClassModal.js
import React, { useState } from 'react';

export default function AddEditClassModal({ onSave, onClose, classData }) {
    const [name, setName] = useState(classData?.name || '');
    const [academicYear, setAcademicYear] = useState(classData?.academicYear || '');

    const handleSubmit = (e) => {
        console.log("Clikao")
        e.preventDefault();
        onSave({ name, academicYear });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">
                    {classData ? 'Editar Clase' : 'Añadir Nueva Clase'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Nombre de la Clase</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Año Académico</label>
                        <input
                            type="text"
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                            className="border p-2 rounded w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
