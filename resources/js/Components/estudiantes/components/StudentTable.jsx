import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const StudentTable = ({ students, onStudentDelete, toggleAssignment }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

    const handleDeleteClick = (studentId) => {
        setSelectedStudentId(studentId); // Guardamos el ID del estudiante a eliminar
        setIsDeleteModalOpen(true); // Abrimos el modal
    };

    const handleConfirmDelete = () => {
        if (selectedStudentId) {
            onStudentDelete(selectedStudentId); // Llamamos a la función para eliminar
            setSelectedStudentId(null); // Limpiamos el estado
            setIsDeleteModalOpen(false); // Cerramos el modal
        }
    };

    return (
        <div className="mt-2 bg-gray-50 rounded-lg p-4">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-600">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Asignado al Comedor</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-t border-gray-200">
                            <td className="py-2">{student.nombre} {student.apellidos}</td>
                            <td className="py-2">
                                <button
                                    onClick={() => toggleAssignment(student.id)} // Llama a la función al hacer clic
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${student.asignado_comedor ? 'bg-green-100 text-green-800' : 'bg-red-200 text-gray-800'
                                        }`}
                                    disabled={student.loading} // Desactiva el botón mientras se carga
                                >
                                    {student.loading ? 'Cargando...' : student.asignado_comedor ? 'Asignado' : 'No asignado'}
                                </button>
                            </td>
                            <td className="py-2">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(student.id)}
                                        className="p-1 hover:bg-gray-200 rounded-full">
                                        <Edit className="w-4 h-4 text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(student.id)}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmación de Eliminación */}
            {isDeleteModalOpen && (
                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    message="¿Estás seguro de que quieres eliminar este estudiante?"
                />
            )}
        </div>
    );
};

export default StudentTable;
