import React, { useState, useEffect } from "react";
import { Check, X, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import csrfFetch from "@/utils/csrfFetch";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function ComedorAttendance({ initialData }) {
    const [currentDay, setCurrentDay] = useState(days[0]); // Día actual
    const [attendanceData, setAttendanceData] = useState(initialData); // Datos iniciales desde el servidor
    const [searchTerm, setSearchTerm] = useState(""); // Filtro de búsqueda

    useEffect(() => {
        // Llamada opcional para recargar datos al cambiar de día
        const fetchAttendanceForDay = async (day) => {
            try {
                const response = await csrfFetch(`/api/attendance?day=${day}`);
                const data = await response.json();
                setAttendanceData((prevData) => ({
                    ...prevData,
                    [day]: data,
                }));
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        if (!attendanceData[currentDay]) {
            fetchAttendanceForDay(currentDay);
        }
    }, [currentDay, attendanceData]);

    const handlePrevDay = () => {
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex > 0) {
            setCurrentDay(days[currentIndex - 1]);
        }
    };

    const handleNextDay = () => {
        const currentIndex = days.indexOf(currentDay);
        if (currentIndex < days.length - 1) {
            setCurrentDay(days[currentIndex + 1]);
        }
    };

    const handleAttendanceChange = (studentId, newStatus) => {
        // Actualiza el estado local primero
        setAttendanceData((prevData) => ({
            ...prevData,
            [currentDay]: prevData[currentDay].map((student) =>
                student.id === studentId ? { ...student, status: newStatus } : student
            ),
        }));

        // Realiza la actualización en el servidor
        Inertia.put(`/api/attendance/${studentId}`, { status: newStatus });
    };

    const filteredStudents = attendanceData[currentDay]?.filter(
        (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    Lista de Asistencia al Comedor
                </h1>

                {/* Navegación por días */}
                <div className="flex justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4">
                    <button
                        onClick={handlePrevDay}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        disabled={currentDay === days[0]}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex space-x-2">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => setCurrentDay(day)}
                                className={`px-4 py-2 rounded-md transition-colors ${currentDay === day
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleNextDay}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        disabled={currentDay === days[days.length - 1]}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Barra de búsqueda */}
                <div className="mb-6 relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o clase..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>

                {/* Tabla de asistencia */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Clase
                                </th>
                                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Asistencia
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredStudents?.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {student.class}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleAttendanceChange(student.id, "present")
                                                }
                                                className={`p-2 rounded-full ${student.status === "present"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-600 hover:bg-green-100"
                                                    }`}
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleAttendanceChange(student.id, "absent")
                                                }
                                                className={`p-2 rounded-full ${student.status === "absent"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-200 text-gray-600 hover:bg-red-100"
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
                </div>
            </div>
        </div>
    );
}

