import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Edit, Trash, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import ConfirmModal from './ConfirmModal';
import csrfFetch from '@/utils/csrfFetch';
import StudentTable from './StudentTable';
import { toast } from 'react-toastify';

const ClassItem = ({
    classData,
    isOpen,
    onToggle,
    onEdit,
    onDelete,
    toggleAssignment,
}) => {
    const [isAddingStudent, setIsAddingStudent] = useState(false);
    const [newStudent, setNewStudent] = useState({
        nombre: '',
        apellidos: '',
        intolerancia_religion: '',
        beca: false,
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewStudent({
            ...newStudent,
            [name]: type === 'checkbox' ? checked : value,
        });
    };




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


    // const handleStudentEdit = async (studentId, updatedData) => {
    //     try {
    //         const response = await csrfFetch(`/api/students/${studentId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedData),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Error updating student');
    //         }

    //         const updatedStudent = await response.json();

    //         // Actualizar estudiantes inmutablemente
    //         const updatedStudents = classData.estudiantes.map((student) =>
    //             student.id === studentId ? updatedStudent : student
    //         );

    //         // Reemplazar los estudiantes actualizados en la clase
    //         onToggle(classData.id);
    //         classData.estudiantes = updatedStudents;
    //     } catch (error) {
    //         console.error('Error updating student:', error);
    //     }
    // };
    const handleEditSave = async (updatedStudent) => {
        console.log("Datos enviados al backend:", updatedStudent); // Verifica los datos enviados

        try {
            const response = await csrfFetch(`/api/students/${updatedStudent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedStudent), // O usar directamente updatedStudent si el backend acepta arrays
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estudiante');
            }

            const updatedData = await response.json();

            // Actualizar el estado global (asumiendo setStudents está definido en el componente padre)
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === updatedData.id ? updatedData : student
                )
            );

            toast.success('Estudiante actualizado correctamente');
        } catch (error) {
            console.error('Error al guardar:', error);
            toast.error('No se pudo guardar el estudiante');
        }
    };


    // Añadir estudiante
    const handleAddStudent = async () => {
        if (!newStudent.nombre || !newStudent.apellidos) {
            console.error('El nombre y apellidos son obligatorios');
            return;
        }

        try {
            const response = await csrfFetch(`/api/classes/${classData.id}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStudent),
            });

            if (!response.ok) throw new Error('Error al añadir estudiante');

            const addedStudent = await response.json();
            classData.estudiantes = [...(classData.estudiantes || []), addedStudent];
            setIsAddingStudent(false);
            setNewStudent({ nombre: '', apellidos: '', intolerancia_religion: '', beca: false });
        } catch (error) {
            console.error('Error al añadir estudiante:', error);
        }
    };

    return (
        <div className="mb-4">
            {/* Header */}
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex items-center">
                    <button className="mr-2">
                        {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                    </button>
                    <h3 className="text-lg text-blue-500 font-semibold">{classData.nombre}</h3>
                    <span className="ml-2 text-sm text-orange-500 hidden sm:inline">
                        ({classData.estudiantes ? classData.estudiantes.length : 0} alumnos)
                    </span>
                    <span className="ml-2 text-sm text-green-500 hidden sm:inline">
                        ({classData.curso_academico || 'N/D'})
                    </span>
                </div>

                {/* Botones */}
                <div className="flex flex-wrap space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(classData);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <Edit className="w-5 h-5 text-blue-500" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDeleteModalOpen(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <Trash className="w-5 h-5 text-red-500" />
                    </button>
                    <ConfirmModal
                        isOpen={isDeleteModalOpen}
                        onConfirm={() => onDelete(classData.id)}
                        onCancel={() => setIsDeleteModalOpen(false)}
                        message="¿Estás seguro de que quieres eliminar esta clase?"
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsAddingStudent(true);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                        <Plus className="w-5 h-5 text-green-500" />
                    </button>
                </div>
            </div>

            {/* Estudiantes */}
            {/* {isOpen && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Estudiantes:</h3>
                    {classData.estudiantes?.length > 0 ? (
                        <ul>
                            {classData.estudiantes.map((student) => (
                                <li
                                    key={student.id}
                                    className="flex justify-between items-center py-2 border-b last:border-b-0 dark:border-gray-700"
                                >
                                    <span className="text-gray-800 dark:text-gray-200">
                                        {student.apellidos}, {student.nombre}
                                    </span>
                                    <button
                                        onClick={() => toggleAssignment(student.id)}
                                        className={`px-3 py-1 rounded ${student.asignado
                                            ? 'bg-green-500 hover:bg-green-600'
                                            : 'bg-red-500 hover:bg-red-600'
                                            } text-white`}
                                    >
                                        {student.asignado ? 'Asignado' : 'No Asignado'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No hay estudiantes en esta clase.</p>
                    )}
                </div>
            )} */}
            {isOpen && (
                <div className="overflow-x-auto">
                    <StudentTable
                        students={classData.estudiantes || []} // Aseguramos que siempre sea un array
                        onStudentDelete={handleStudentDelete}
                        toggleAssignment={toggleAssignment}
                        onEditSave={handleEditSave}
                    />
                </div>
            )}

            {/* Modal Añadir Estudiantes */}
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
                    <motion.div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg">
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

                            {/* Checkbox de Intolerancias */}
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Intolerancias:
                            </label>
                            <div className="space-y-1">
                                {[
                                    { value: "no_carne", label: "No Carne" },
                                    { value: "no_credo", label: "No Credo" },
                                    { value: "celiaco", label: "Celiaco" },
                                    { value: "lactosa", label: "Lactosa" },
                                    { value: "otros", label: "Otros (Especificar abajo)" },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={option.value}
                                            checked={newStudent.intolerancia_religion?.includes(option.value)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                const currentSelections = newStudent.intolerancia_religion || [];
                                                setNewStudent({
                                                    ...newStudent,
                                                    intolerancia_religion: isChecked
                                                        ? [...currentSelections, option.value]
                                                        : currentSelections.filter((item) => item !== option.value),
                                                });
                                            }}
                                            className="form-checkbox"
                                        />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Campo para Especificar "Otros" */}
                            {newStudent.intolerancia_religion?.includes("otros") && (
                                <input
                                    type="text"
                                    name="otros"
                                    placeholder="Especificar otras intolerancias"
                                    className="w-full p-2 border rounded mt-2"
                                    onChange={(e) => {
                                        const otrosValue = e.target.value;
                                        e.preventDefault();
                                        setNewStudent({
                                            ...newStudent,
                                            intolerancia_religion: [
                                                ...newStudent.intolerancia_religion.filter(
                                                    (item) => item !== "otros"
                                                ),
                                                otrosValue,
                                            ],
                                        });
                                    }}
                                />
                            )}

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
                                    className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
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
