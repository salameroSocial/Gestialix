import React, { useState } from 'react';
import OccasionalStudents from './OccasionalStudents';

export default function ParentComponent() {
    const [classes, setClasses] = useState([
        {
            id: 1,
            nombre: 'Clase A',
            estudiantes: [
                { id: 1, nombre: 'Juan', apellidos: 'Pérez', asignado_comedor: false },
                { id: 2, nombre: 'María', apellidos: 'Gómez', asignado_comedor: true },
            ],
        },
        {
            id: 2,
            nombre: 'Clase B',
            estudiantes: [
                { id: 3, nombre: 'Luis', apellidos: 'Martínez', asignado_comedor: false },
            ],
        },
    ]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [isOccasionalModalOpen, setIsOccasionalModalOpen] = useState(false);
    const [occasionalStudents, setOccasionalStudents] = useState([]);
    const [displayOccasionalStudents, setDisplayOccasionalStudents] = useState([]);

    // Manejar cambio de clase seleccionada
    const handleClassChange = (classId) => {
        setSelectedClass(classId);
    };

    // Abrir modal
    const openOccasionalModal = () => {
        if (!selectedClass) {
            alert('Por favor, selecciona una clase primero.');
            return;
        }

        // Filtrar estudiantes no asignados al comedor
        const classData = classes.find((cls) => cls.id === selectedClass);
        if (classData) {
            const notAssignedStudents = classData.estudiantes.filter(
                (student) => !student.asignado_comedor &&
                    !displayOccasionalStudents.some((oc) => oc.id === student.id)
            );
            setOccasionalStudents(notAssignedStudents);
        }
        setIsOccasionalModalOpen(true);
    };

    // Cerrar modal
    const closeOccasionalModal = () => {
        setIsOccasionalModalOpen(false);
    };

    // Agregar estudiantes seleccionados a la tabla
    const addOccasionalStudents = (students) => {
        setDisplayOccasionalStudents((prev) => [...prev, ...students]);
    };

    return (
        <div>
            {/* Selector de Clases */}
            <div className="flex items-center space-x-4 mb-4">
                <select
                    value={selectedClass || ''}
                    onChange={(e) => handleClassChange(Number(e.target.value))}
                    className="border rounded-lg p-2"
                >
                    <option value="" disabled>
                        Selecciona una clase
                    </option>
                    {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.nombre}
                        </option>
                    ))}
                </select>

                {/* Botón para abrir el modal */}
                <button
                    onClick={openOccasionalModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Seleccionar Alumno Ocasional
                </button>
            </div>

            {/* Tabla para mostrar ocasionales */}
            {displayOccasionalStudents.length > 0 && (
                <div className="overflow-x-auto mt-6">
                    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Alumno
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    Tipo
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {displayOccasionalStudents.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                        {student.nombre} {student.apellidos}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-500" />
                                            <span>Ocasional</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de Estudiantes Ocasionales */}
            {isOccasionalModalOpen && (
                <OccasionalStudents
                    occasionalStudents={occasionalStudents}
                    closeModal={closeOccasionalModal}
                    addStudents={addOccasionalStudents}
                />
            )}
        </div>
    );
}


