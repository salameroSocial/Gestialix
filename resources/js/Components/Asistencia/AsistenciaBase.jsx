import React, { useState, useEffect } from 'react';
import { Check, X, Search, Calendar, Users, ChevronLeft, ChevronRight, Star, Eye } from 'lucide-react';
import Spinner from '@/Components/ui/Spinner';
import DataSelector from '../Date/Picker';
import csrfFetch from '@/utils/csrfFetch';
import OccasionalStudents from './ModalOcasionales';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { StudentIntolerancesModal } from './ModalIntolerancia';

export default function Asistencia() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [currentDay, setCurrentDay] = useState(new Date().toISOString().split('T')[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOccasionalModalOpen, setIsOccasionalModalOpen] = useState(false);
    const [occasionalStudents, setOccasionalStudents] = useState([]);
    const [displayOccasionalStudents, setDisplayOccasionalStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [occasionalStudentsFromDB, setOccasionalStudentsFromDB] = useState([]);

    // Cuando cambias la clase seleccionada
    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
    };



    // useEffect(() => {
    //     const fetchInitialData = async () => {
    //         try {
    //             setLoading(true);
    //             const classResponse = await csrfFetch('/api/classes');
    //             if (!classResponse.ok) throw new Error('Error fetching classes');
    //             const classData = await classResponse.json();
    //             setClasses(classData);
    //             setSelectedClass(classData[0]?.id || null);

    //             if (classData[0]?.id) {
    //                 await fetchAttendanceData(currentDay, classData[0]?.id);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchInitialData();
    // }, []);

    // Carga inicial de clases y datos relacionados
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                setLoading(true);
                console.log('Fetching classes...');
                const classResponse = await csrfFetch('/api/classes');
                if (!classResponse.ok) throw new Error('Error fetching classes');
                const classData = await classResponse.json();
                console.log('Classes Traidas:', classData);
                setClasses(classData);
                setSelectedClass(classData[0]?.id || null); // Selecciona la primera clase por defecto

                // Si hay una clase, carga los datos iniciales de asistencia
                if (classData[0]?.id) {
                    await fetchAttendanceData(currentDay, classData[0]?.id);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [currentDay]); // `currentDay` puede cambiar si seleccionas otra fecha

    // Actualiza los estudiantes ocasionales al cambiar la clase seleccionada
    useEffect(() => {
        const fetchOccasionalStudents = async () => {
            try {
                if (!selectedClass) return; // Evita ejecutar si no hay clase seleccionada

                console.log(`Fetching occasional students for class ${selectedClass}...`);
                const occasionalResponse = await csrfFetch(`/api/ocasionales?class_id=${selectedClass}`);
                if (!occasionalResponse.ok) throw new Error('Error al obtener los estudiantes ocasionales');
                const occasionalData = await occasionalResponse.json();
                console.log('Ocassional students:', occasionalData);
                setOccasionalStudentsFromDB(occasionalData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchOccasionalStudents();
    }, [selectedClass]); // Solo se ejecuta cuando cambia `selectedClass`


    const fetchAttendanceData = async (date, classId) => {
        try {
            setLoading(true);
            const response = await csrfFetch(`/api/attendance-or-create?date=${date}&class_id=${classId}`);
            if (!response.ok) throw new Error('Error fetching attendance data');
            const data = await response.json();

            // Asegúrate de que cada registro tenga el campo `esOcasional`
            const updatedData = data.map((record) => ({
                ...record,
                asiste: record.asiste !== null ? record.asiste : 1,
                esOcasional: record.es_dia_suelto === 1, // Determina si es ocasional
            }));

            setAttendanceData(updatedData);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    const handleAttendanceChange = async (attendanceId, newStatus) => {
        try {
            const response = await csrfFetch(`/api/attendance/${attendanceId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ asiste: newStatus }),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            // Actualiza el estado local sin re-renderizar
            setAttendanceData((prevData) =>
                prevData.map((record) =>
                    record.id === attendanceId
                        ? { ...record, asiste: newStatus }
                        : record
                )
            );
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };


    const handleDayChange = async (newDate) => {
        if (!selectedClass) {
            console.warn("Selecciona una clase primero.");
            return;
        }
        setCurrentDay(newDate);
        setLoading(true);
        try {
            const response = await csrfFetch(`/api/attendance-or-create?date=${newDate}&class_id=${selectedClass}`);
            if (!response.ok) throw new Error('Error fetching attendance data');
            const data = await response.json();
            setAttendanceData(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = attendanceData.filter(
        (record) =>
            record.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const changeDate = (days) => {
        let newDate = new Date(currentDay);
        do {
            newDate.setDate(newDate.getDate() + days);
        } while (newDate.getDay() === 0 || newDate.getDay() === 6); // 0 = Domingo, 6 = Sábado

        handleDayChange(newDate.toISOString().split('T')[0]);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };


    if (loading) return (
        <Spinner
            color="green"
            size="lg"
        />
    );

    if (error) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        </div>
    );


    const handleClassChange = async (classId) => {
        try {
            setSelectedClass(classId); // Actualiza el estado de la clase seleccionada
            await fetchAttendanceData(currentDay, classId); // Carga los datos de asistencia para la nueva clase
        } catch (err) {
            console.error('Error al cambiar de clase:', err);
        }
    };

    // Abrir modal
    const openOccasionalModal = () => {
        if (!selectedClass) {
            alert('Por favor, selecciona una clase primero.');
            return;
        }

        const classData = classes.find((cls) => cls.id === selectedClass);
        if (classData) {
            const assignedIds = new Set(occasionalStudentsFromDB.map((oc) => oc.estudiante_id));
            const notAssignedStudents = classData.estudiantes.filter(
                (student) => !student.asignado_comedor && !assignedIds.has(student.id)
            );
            setOccasionalStudents(notAssignedStudents);
        }
        setIsOccasionalModalOpen(true);
    };

    const addOccasionalStudents = async (occasionalStudents, classId) => {
        if (!classId) {
            alert('Por favor, selecciona una clase primero.');
            return;
        }

        try {
            console.log('Estudiantes ocasionales a guardar:', occasionalStudents);
            const promises = occasionalStudents.map(async (student) => {
                const response = await csrfFetch('/api/ocasionales', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        estudiante_id: student.id,
                        clase_id: classId,
                        fecha: new Date().toISOString().split('T')[0],
                    }),
                });

                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`Error en la solicitud: ${text}`);
                }

                return response.json();
            });

            const results = await Promise.all(promises);

            // Agrega los ocasionales al estado de display
            setDisplayOccasionalStudents((prev) => [...prev, ...occasionalStudents]);

            console.log('Ocasionales guardados:', results);
            alert('Estudiantes ocasionales guardados correctamente.');
        } catch (error) {
            console.error('Error al guardar los estudiantes ocasionales:', error);
            alert('Hubo un problema al guardar los estudiantes ocasionales.');
        }
    };

    // Cerrar modal
    const closeOccasionalModal = () => {
        setIsOccasionalModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200">
                    Asistencia al Comedor
                </h1>

                {/* Controles */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0">
                        {/* Selección de Clase */}
                        <div className="flex items-center space-x-4">
                            <Users className="text-blue-500 dark:text-blue-400" />
                            <select
                                value={selectedClass || ''}
                                onChange={(e) => handleClassChange(e.target.value)}
                                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                            >
                                <option value="" disabled>Selecciona una clase</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>{cls.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Fecha */}
                        <DataSelector
                            currentDay={currentDay}
                            changeDate={changeDate}
                            handleDayChange={handleDayChange}
                        />
                        {/* Búsqueda */}
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Buscar estudiante..."
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>

                    {/* Tabla de Asistencia */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Alumno
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Intolerancia / Alergia
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Asistencia
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredStudents.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                            <span className="block sm:hidden">
                                                {truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 16)}
                                            </span>
                                            <span className="hidden sm:block">
                                                {truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 40)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                            <button
                                                onClick={() => handleOpenModal(record.estudiante)} // Pasa el estudiante completo al modal
                                                className={`p-2 rounded-full transition-colors ${record.estudiante.intolerancia_religion &&
                                                    JSON.parse(record.estudiante.intolerancia_religion).length > 0
                                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700'
                                                    }`}
                                                disabled={
                                                    !record.estudiante.intolerancia_religion ||
                                                    JSON.parse(record.estudiante.intolerancia_religion).length === 0
                                                }
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleAttendanceChange(record.id, 1)}
                                                    className={`p-2 rounded-full transition-colors ${record.asiste === 1
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-green-600'
                                                        }`}
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleAttendanceChange(record.id, 0)}
                                                    className={`p-2 rounded-full transition-colors ${record.asiste === 0
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-200 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-600'
                                                        }`}
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex items-center space-x-4">

                            {/* Botón para abrir el modal */}
                            <button
                                onClick={openOccasionalModal}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                Seleccionar Alumno Ocasional
                            </button>
                        </div>
                        {/* Tabla para mostrar ocasionales */}
                        {occasionalStudentsFromDB.length > 0 && (
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
                                        {occasionalStudentsFromDB.map((student) => (
                                            <tr key={student.estudiante_id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                                                    {student.estudiante.nombre} {student.estudiante.apellidos}
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

                    </div>
                </div>

                {/* Resumen de Asistencia */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Resumen de Asistencia
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-lg">
                            <p className="text-green-800 dark:text-green-300 font-medium">Presentes</p>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {attendanceData.filter((record) => record.asiste === 1).length}
                            </p>
                        </div>
                        <div className="bg-red-100 dark:bg-red-800 p-4 rounded-lg">
                            <p className="text-red-800 dark:text-red-300 font-medium">Ausentes</p>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {attendanceData.filter((record) => record.asiste === 0).length}
                            </p>
                        </div>
                        <div className="bg-yellow-100 dark:bg-yellow-800 p-4 rounded-lg">
                            <p className="text-yellow-800 dark:text-yellow-300 font-medium">Ocasional</p>
                            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">

                                {attendanceData.filter((record) => record.es_dia_suelto === 0).length}
                                {/* {
                                    attendanceData.filter(
                                        (record) => record.esOcasional === true // Verifica si es ocasional
                                    ).length
                                } */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para mostrar intolerancias */}
            {selectedStudent && (
                <StudentIntolerancesModal
                    isOpen={isModalOpen} // Aquí debe ir el estado booleano
                    onClose={handleCloseModal}
                    student={selectedStudent}
                />
            )}


            {/* Modal de Estudiantes Ocasionales */}
            {isOccasionalModalOpen && (
                <OccasionalStudents
                    occasionalStudents={occasionalStudents} // Lista de estudiantes
                    closeModal={closeOccasionalModal} // Función para cerrar el modal
                    addStudents={(students) => addOccasionalStudents(students, selectedClass)} // Asegúrate de pasar la clase seleccionada
                />

            )}
        </div >

    );
}