import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ConfirmModal from './ConfirmModal';
import EditModal from './EditStudentModal';
import { toast } from 'react-toastify';

const StudentTable = ({ students, onStudentDelete, toggleAssignment, onStudentEdit }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState({ deleting: null, editing: false });

    // Abrir modal de confirmación para eliminar
    const handleDeleteClick = (studentId) => {
        setSelectedStudentId(studentId);
        setIsDeleteModalOpen(true);
    };

    // Confirmar eliminación
    const handleConfirmDelete = async () => {
        setLoading({ ...loading, deleting: selectedStudentId });
        try {
            if (selectedStudentId) {
                await onStudentDelete(selectedStudentId); // Llama al padre para eliminar
            }
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
        } finally {
            setLoading({ ...loading, deleting: null });
            setSelectedStudentId(null);
            setIsDeleteModalOpen(false);
        }
    };

    // Abrir modal de edición
    const handleEditClick = (student) => {
        setSelectedStudent(student); // Guarda el estudiante seleccionado
        setIsEditModalOpen(true);
    };

    // Guardar cambios del estudiante
    const handleEditSave = async (updatedStudent) => {
        setLoading({ ...loading, editing: true });
        try {
            await onStudentEdit(selectedStudent.id, updatedStudent); // Espera la respuesta del padre
            toast.success('Estudiante actualizado correctamente'); // Notificación de éxito
        } catch (error) {
            toast.error(`Error al editar estudiante: ${error.message}`); // Notificación de error
        } finally {
            setLoading({ ...loading, editing: false });
            setIsEditModalOpen(false);
            setSelectedStudent(null);
        }
    };

    return (
        <div className="mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <table className="w-full">
                <thead>
                    <tr className="text-left text-gray-600 dark:text-gray-200">
                        <th className="py-2">Nombre</th>
                        <th className="py-2">Asignado al Comedor</th>
                        <th className="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id} className="border-t border-gray-200 text-gray-600 dark:text-gray-200">
                            <td className="py-2">
                                {student.nombre} {student.apellidos}
                            </td>
                            <td className="py-2">
                                <button
                                    onClick={() => toggleAssignment(student.id)}
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${student.asignado_comedor
                                        ? 'bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-800'
                                        : 'bg-red-200 text-gray-800 dark:bg-red-600 dark:text-gray-200'
                                        }`}
                                    disabled={student.loading}
                                >
                                    {student.loading
                                        ? 'Cargando...'
                                        : student.asignado_comedor
                                            ? 'Asignado'
                                            : 'No asignado'}
                                </button>
                            </td>
                            <td className="py-2">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditClick(student)}
                                        className="p-1 hover:bg-gray-200 rounded-full"
                                    >
                                        <Edit className="w-4 h-4 text-blue-500" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(student.id)}
                                        className={`p-1 hover:bg-gray-200 rounded-full ${loading.deleting === student.id ? 'opacity-50' : ''
                                            }`}
                                        disabled={loading.deleting === student.id}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal de Confirmación de Eliminación */}
            {isDeleteModalOpen && (
                <ConfirmModal
                    isOpen={isDeleteModalOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setIsDeleteModalOpen(false)}
                    message="¿Estás seguro de que quieres eliminar este estudiante?"
                />
            )}
            {/* Modal de Edición */}
            {isEditModalOpen && selectedStudent && (
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleEditSave}
                    title="Editar Estudiante"
                    initialData={{
                        id: selectedStudent.id, // Asegúrate de pasar el ID
                        nombre: selectedStudent.nombre,
                        apellidos: selectedStudent.apellidos,
                        intolerancia_religion: selectedStudent.intolerancia_religion,
                        beca: selectedStudent.beca,
                    }}
                    fields={[
                        { name: 'nombre', label: 'Nombre', type: 'text', required: true },
                        { name: 'apellidos', label: 'Apellidos', type: 'text', required: true },
                        {
                            name: 'intolerancia_religion',
                            label: 'Intolerancia/Religión',
                            type: 'text',
                        },
                        { name: 'beca', label: 'Beca', type: 'checkbox' },
                    ]}
                />
            )}
        </div>
    );
};

export default StudentTable;
