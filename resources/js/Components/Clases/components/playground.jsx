import { useState } from 'react';
import { Eye } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function AttendanceTable({ attendanceData }) {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
    };

    return (
        <table className="w-full">
            <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Alumno
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Intolerancias
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {attendanceData.map((record) => (
                    <tr key={record.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                            {record.nombre} {record.apellidos}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                            <button
                                onClick={() => handleOpenModal(record)}
                                className={`p-2 rounded-full transition-colors ${record.intolerancia_religion && record.intolerancia_religion.length > 0
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                    }`}
                                disabled={!record.intolerancia_religion || record.intolerancia_religion.length === 0}
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>

            {/* Modal para mostrar intolerancias */}
            {selectedStudent && (
                <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
                    <DialogTitle>Intolerancias de {selectedStudent.nombre}</DialogTitle>
                    <DialogContent>
                        {selectedStudent.intolerancia_religion && selectedStudent.intolerancia_religion.length > 0 ? (
                            <ul>
                                {selectedStudent.intolerancia_religion.map((intolerancia, index) => (
                                    <li key={index} className="mb-2 text-gray-800 dark:text-gray-200">
                                        - {intolerancia}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">Este estudiante no tiene intolerancias registradas.</p>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </table>
    );
}

export default AttendanceTable;
