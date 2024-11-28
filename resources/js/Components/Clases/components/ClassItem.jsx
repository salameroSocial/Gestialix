import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from 'lucide-react';
import StudentTable from './StudentTable';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal';
import csrfFetch from '@/utils/csrfFetch';

const ClassItem = ({ classData, isOpen, onToggle, onEdit, onDelete, toggleAssignment }) => {
    const [isAddingStudent, setIsAddingStudent] = useState(false);
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellidos: '',
        intolerancia_religion: '',
        beca: false,
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Manejar cambios en el formulario de nuevo estudiante
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Añadir un nuevo estudiante
    const handleAddStudent = async () => {
        if (!newStudent.nombre || !newStudent.apellidos) {
            console.error('El nombre y apellidos son obligatorios');
            return;
        }

        try {
            const response = await csrfFetch(`/api/classes/${classData.id}/students`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (!response.ok) {
                throw new Error('Error adding student');
            }

            const addedStudent = await response.json();

            // Actualizar estudiantes inmutablemente
            const updatedStudents = [...(classData.estudiantes || []), addedStudent];
            onToggle(classData.id); // Actualiza la clase para reflejar los cambios
            classData.estudiantes = updatedStudents;

            setIsAddingStudent(false);
            setNewStudent({ nombre: '', apellidos: '', intolerancia_religion: '', beca: false });
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };


    // Eliminar un estudiante
    const handleStudentDelete = async (studentId) => {
        try {
            const response = await csrfFetch(`/api/classes/${classData.id}/students/${studentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting student');
            }

            const updatedStudents = classData.estudiantes.filter(
                (student) => student.id !== studentId
            );
            onToggle(classData.id); // Refresca la clase
            classData.estudiantes = updatedStudents;
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    // Editar un estudiante
    const handleStudentEdit = async (studentId, updatedData) => {
        try {
            const response = await csrfFetch(`/api/students/${studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error updating student');
            }

            const updatedStudent = await response.json();

            // Actualizar estudiantes inmutablemente
            const updatedStudents = classData.estudiantes.map((student) =>
                student.id === studentId ? updatedStudent : student
            );

            // Reemplazar los estudiantes actualizados en la clase
            onToggle(classData.id);
            classData.estudiantes = updatedStudents;
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };


    return (
        <div className="mb-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between">
                {/* Información de la Clase */}
                <div onClick={onToggle} className="flex items-center relative">
                    <button className="mr-2">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                    <h3 className="text-lg text-blue-500 font-semibold ">{classData.nombre}</h3>
                    <span className="ml-2 text-sm text-orange-500 hidden sm:inline">
                        ({classData.estudiantes ? classData.estudiantes.length : 0} alumnos)
                    </span>
                    <span className="ml-2 text-sm text-green-500 hidden sm:inline">
                        ({classData.curso_academico || 'N/D'})
                    </span>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap space-x-2">
                    <button onClick={() => onEdit(classData)} className="p-1 hover:bg-gray-100 rounded-full">
                        <Edit className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        onConfirm={() => onDelete(classData.id)}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        message="¿Estás seguro de que quieres eliminar esta clase?"
                    />
                    <button
                        onClick={() => setIsAddingStudent(true)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <Plus className="w-5 h-5 text-green-500" />
                    </button>
                </div>
            </div>

            {/* Tabla de Estudiantes */}
            {isOpen && (
                <div className="overflow-x-auto">
                    <StudentTable
                        students={classData.estudiantes || []}
                        onStudentDelete={handleStudentDelete}
                        toggleAssignment={toggleAssignment}
                        onStudentEdit={handleStudentEdit}
                    />
                </div>
            )}

            {/* Modal para Añadir Estudiantes */}
            {isAddingStudent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
                >
                    {/* Fondo oscuro */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setIsAddingStudent(false)}
                    ></div>

                    {/* Modal */}
                    <motion.div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
                        <h4 className="text-lg font-semibold mb-2">Añadir Nuevo Estudiante</h4>
                        <div className="space-y-2">
                            <input
                                type="text"
                                name="nombre"
                                value={newStudent.nombre}
                                onChange={handleInputChange}
                                placeholder="Nombre"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="apellidos"
                                value={newStudent.apellidos}
                                onChange={handleInputChange}
                                placeholder="Apellidos"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="intolerancia_religion"
                                value={newStudent.intolerancia_religion}
                                onChange={handleInputChange}
                                placeholder="Intolerancia/Religión"
                                className="w-full p-2 border rounded"
                            />
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="beca"
                                    checked={newStudent.beca}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                Beca
                            </label>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleAddStudent}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setIsAddingStudent(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </div>

    );
};

export default ClassItem;
