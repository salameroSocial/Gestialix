import React, { useState, useReducer, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import StudentList from './components/Clase';
import AddEditClassModal from './components/AddEditClassModal';
import AddStudentModal from './components/AddStudentModal';
import csrfFetch from '@/utils/csrfFetch';
import classesReducer from './reducers/classesReducer';
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Container,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ToastManager from '../ToastManager';

export default function ClaseManagement() {
    const toastRef = useRef();
    const [classes, dispatch] = useReducer(classesReducer, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [orderBy, setOrderBy] = useState('nombre'); // Nombre por defecto
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
    const [selectedClassId, setSelectedClassId] = useState(null);


    const showToast = (message, severity) => {
        toastRef.current.showToast(message, severity);
    };
    // Escucha para detectar cambios en el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cargar las clases desde el backend
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await csrfFetch('/api/classes');
                const data = await response.json();
                dispatch({ type: 'SET_CLASSES', payload: data });
            } catch (error) {
                showToast('Error al cargar las clases:', 'error');
                console.error('Error al cargar las clases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleDeleteStudent = async (classId, studentId) => {
        try {
            await csrfFetch(`/api/classes/${classId}/students/${studentId}`, {
                method: 'DELETE',
            });
            dispatch({
                type: 'DELETE_STUDENT',
                payload: { classId, studentId },
            });
        } catch (error) {
            console.error('Error al eliminar el estudiante:', error);
        }
    };

    const onOpenStudentModal = (classId) => {
        setSelectedClassId(classId);
        setIsStudentModalOpen(true);
    };

    const handleAddStudent = async (studentData) => {
        try {
            const response = await csrfFetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...studentData, clase_id: selectedClassId }),
            });
            const newStudent = await response.json();

            // Actualiza el estado global con el nuevo estudiante
            dispatch({
                type: 'ADD_STUDENT',
                payload: { classId: selectedClassId, student: newStudent },
            });
        } catch (error) {
            console.error('Error al añadir estudiante:', error);
        } finally {
            setIsStudentModalOpen(false); // Cierra el modal después de añadir
        }
    };

    // Manejar la creación/edición de clases
    const handleSaveClass = async (clase) => {
        try {
            console.log("clase", clase)
            const method = editingClass ? 'PUT' : 'POST';
            const endpoint = editingClass ? `/api/classes/${clase.id}` : '/api/classes/new';

            const response = await csrfFetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clase),
            });

            const updatedClass = await response.json();
            dispatch({
                type: editingClass ? 'UPDATE_CLASS' : 'ADD_CLASS',
                payload: updatedClass,
            });

            setIsModalOpen(false);
            setEditingClass(null);
        } catch (error) {
            console.error('Error al guardar la clase:', error);
        }
    };

    // Manejar la eliminación de una clase
    const handleDeleteClass = async (classId) => {
        try {
            await csrfFetch(`/api/classes/${classId}`, { method: 'DELETE' });
            dispatch({ type: 'DELETE_CLASS', payload: classId });
        } catch (error) {
            console.error('Error al eliminar la clase:', error);
        }
    };

    // Manejar el guardado de estudiantes
    const handleSaveStudent = async (studentData) => {
        try {
            console.log("Entrando en el save...");
            const response = await csrfFetch(`/api/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });

            // Extrae el estudiante correctamente
            const { estudiante } = await response.json();
            console.log('Estudiante recibido:', estudiante);

            // Actualizar el estado de la clase correspondiente
            dispatch({
                type: 'ADD_STUDENT',
                payload: {
                    classId: studentData.clase_id,
                    student: estudiante, // Usa el estudiante extraído
                },
            });

            console.log('Estudiante añadido correctamente:', estudiante);
        } catch (error) {
            console.error('Error al guardar el estudiante:', error);
            alert('No se pudo guardar el estudiante.');
        }
    };



    // Alternar la asignación de un estudiante
    const toggleAssignment = async (classId, studentId) => {
        try {
            const response = await csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
                method: 'PATCH',
            });

            if (response.status === 200) {
                const { asignado } = await response.json();
                dispatch({
                    type: 'TOGGLE_ASSIGNMENT',
                    payload: { classId, studentId, asignado },
                });
            }
        } catch (error) {
            console.error('Error al alternar el estado de asignación:', error);
            alert('No se pudo alternar el estado de asignación.');
        }
    };


    const handleOpenStudentModal = (classId) => {
        console.log('ID de la clase recibido en el padre:', classId);
        setSelectedClassId(classId);
        setIsStudentModalOpen(true);
    };

    const handleEditStudent = async (classId, editedStudent) => {
        try {
            console.log("Estudiante editado:", editedStudent, "Estudiante id:", editedStudent.studentId);
            const response = await csrfFetch(`/api/students/${editedStudent.studentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedStudent),
            });

            if (!response.ok) {
                throw new Error('Error en la actualización.');
            }

            const updatedStudent = await response.json();
            dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
        } catch (error) {
            console.error('Error al actualizar el estudiante:', error);
        }
    };



    const filteredClasses = classes.filter((cls) =>
        cls.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log('Clases filtradas:', filteredClasses);

    return (
        <Container maxWidth="xl" className="h-full mb-8 mt-0">
            <ToastManager ref={toastRef} />
            <Box sx={{ py: 4 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 4 },
                        backgroundColor: 'background.default', // Usa tokens de color del tema
                        borderRadius: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: 'bold',
                            color: 'primary.main', // Usa tokens de color del tema
                            mb: 4,
                        }}
                    >
                        Gestión de Clases
                    </Typography>

                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Buscar clases..."
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="order-by-label">Ordenar por</InputLabel>
                                <Select
                                    labelId="order-by-label"
                                    value={orderBy}
                                    onChange={(e) => setOrderBy(e.target.value)}
                                    label="Ordenar por"
                                >
                                    <MenuItem value="nombre">Nombre</MenuItem>
                                    <MenuItem value="apellidos">Apellido</MenuItem>
                                    <MenuItem value="asignado">Estado de Asignación</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => setIsModalOpen(true)}
                                sx={{
                                    height: '100%',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                }}
                            >
                                {isMobile ? 'Añadir' : 'Añadir Clase'}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

            <Grid container spacing={3}>
                {classes.map((clase) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={clase.id}>
                            <StudentList
                                clase={clase} // La clase actual
                                estudiantes={clase.estudiantes || []} // Lista de estudiantes (asegúrate de que clase tenga estudiantes como array)
                                orderBy={orderBy} // Si lo necesitas, aunque no se usa directamente aquí
                                onToggleAssignment={toggleAssignment} // Función para alternar asignación de comedor
                                onEditClass={(clase) => {
                                    setEditingClass(clase);
                                    setIsModalOpen(true);
                                }} // Función para editar clase
                                onDeleteClass={(clase) => handleDeleteClass(clase.id)} // Función para eliminar clase
                                onDeleteStudent={handleDeleteStudent} // Función para eliminar un estudiante
                                onEditStudent={handleEditStudent} // Función para guardar cambios de un estudiante
                                onOpenStudentModal={handleOpenStudentModal} // Función para abrir el modal de añadir estudiante
                                dispatch={dispatch} // Dispatch para manejar el estado global
                            />

                        </Grid>
                    );
                })}
            </Grid>
            <AddEditClassModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveClass}
                editingClass={editingClass || {}} // Pasar los datos completos de la clase
            />
            <AddStudentModal
                open={isStudentModalOpen}
                onClose={() => setIsStudentModalOpen(false)}
                onSave={handleSaveStudent}
                classId={selectedClassId}
            />

        </Container>
    );
}
