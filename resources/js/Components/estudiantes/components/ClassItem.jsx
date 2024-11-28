import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2, Plus } from 'lucide-react';
import StudentTable from '../StudentTable';
import { motion } from 'framer-motion';
import ConfirmModal from '../ConfirmModal';
import csrfFetch from '@/utils/csrfFetch';

const ClassItem = ({ classData, isOpen, onToggle, onEdit, onDelete, toggleAssignment }) => {
    const [isAddingStudent, setIsAddingStudent] = useState(false);
    const [newStudent, setNewStudent] = useState({ nombre: '', apellidos: '', intolerancia_religion: '', beca: false });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleAddStudent = async () => {
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

            // Actualizamos los estudiantes sin mutar directamente `classData`
            const updatedStudents = [...(classData.estudiantes || []), addedStudent];
            classData.estudiantes = updatedStudents;

            setIsAddingStudent(false); // Cerrar modal
            setNewStudent({ nombre: '', apellidos: '', intolerancia_religion: '', beca: false }); // Resetear formulario
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const handleStudentDelete = async (studentId) => {
        try {
            const response = await csrfFetch(`/api/classes/${classData.id}/students/${studentId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error deleting student');
            }
            // Filtramos el estudiante eliminado
            classData.estudiantes = classData.estudiantes?.filter((est) => est.id !== studentId);
            onToggle(classData.id); // Actualizamos la vista
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleStudentEdit = (studentId, updatedData) => {
        csrfFetch(`/api/students/${studentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then((updatedStudent) => {
                setClasses((prevClasses) =>
                    prevClasses.map((cls) => ({
                        ...cls,
                        estudiantes: cls.estudiantes.map((student) =>
                            student.id === studentId ? updatedStudent : student
                        ),
                    }))
                );
            })
            .catch((error) => console.error("Error updating student:", error));
    };

    return (
        <div className="mb-4">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onToggle} className="mr-2">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                    <h3 className="text-lg text-blue-500 font-semibold">{classData.nombre}</h3>
                    <span className="ml-2 text-sm text-orange-500">
                        {`(${classData.estudiantes ? classData.estudiantes.length : 0} alumnos)`}
                    </span>
                    <span className="ml-2 text-sm text-green-500">
                        {`(${classData.curso_academico ? classData.curso_academico : 'N/D'})`}
                    </span>
                </div>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(classData)} className="p-1 hover:bg-gray-100 rounded-full">
                        <Edit className="w-5 h-5 text-blue-500" />
                    </button>
                    <button onClick={() => setIsDeleteModalOpen(true)} className="p-1 hover:bg-gray-100 rounded-full">
                        <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        onConfirm={() => onDelete(classData.id)}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        message="¿Estás seguro de que quieres eliminar esta clase?"
                    />
                    <button onClick={() => setIsAddingStudent(true)} className="p-1 hover:bg-gray-100 rounded-full">
                        <Plus className="w-5 h-5 text-green-500" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <StudentTable
                    students={classData.estudiantes || []}
                    onStudentDelete={handleStudentDelete}
                    toggleAssignment={toggleAssignment}
                />
            )}

            {isAddingStudent && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                >
                    {/* Fondo oscuro semitransparente */}
                    <div
                        className="fixed inset-0 bg-black opacity-50"
                        onClick={() => setIsAddingStudent(false)}
                    ></div>

                    {/* Contenido del modal */}
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
                                <button onClick={handleAddStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Guardar
                                </button>
                                <button onClick={() => setIsAddingStudent(false)} className="bg-gray-300 px-4 py-2 rounded">
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
