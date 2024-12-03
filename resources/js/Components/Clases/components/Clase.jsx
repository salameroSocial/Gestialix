import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Checkbox,
    Switch,
    Tooltip,
    Box,
    FormControl,
    Select,
    MenuItem,
    Typography,
    CircularProgress,
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import EditStudentModal from './EditStudentModal';
import csrfFetch from '@/utils/csrfFetch';

const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export default function StudentList({ clase, estudiantes, onEditClass, onDeleteClass, onOpenStudentModal, onToggleAssignment, onDeleteStudent, dispatch }) {
    const [expanded, setExpanded] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [groupAction, setGroupAction] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const toggleExpand = () => setExpanded(!expanded);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedStudents(estudiantes.map(e => e.id));
        } else {
            setSelectedStudents([]);
        }
    };

    const handleSelectStudent = (studentId) => {
        setSelectedStudents(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };
    const handleApplyGroupAction = async () => {
        console.log(`Aplicando ${groupAction} a`, selectedStudents);
        if (selectedStudents.length === 0 || !groupAction) return;

        try {
            if (groupAction === 'delete') {
                const deletePromises = selectedStudents.map((studentId) =>
                    csrfFetch(`/api/students/${studentId}`, { method: 'DELETE' })
                );
                await Promise.all(deletePromises);
                dispatch({ type: 'DELETE_STUDENTS', payload: selectedStudents });
            } else if (groupAction === 'assign') {
                const assignPromises = selectedStudents.map((studentId) =>
                    csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ asignado: true }),
                    })
                );
                await Promise.all(assignPromises);
                dispatch({ type: 'ASSIGN_STUDENTS_COMEDOR', payload: selectedStudents });
            } else if (groupAction === 'unassign') {
                const unassignPromises = selectedStudents.map((studentId) =>
                    csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ asignado: false }),
                    })
                );
                await Promise.all(unassignPromises);
                dispatch({ type: 'UNASSIGN_STUDENTS_COMEDOR', payload: selectedStudents });
            }
            setSelectedStudents([]); // Limpia la selección
            setGroupAction(''); // Limpia la acción
        } catch (error) {
            console.error('Error al realizar la acción grupal:', error);
        }
    };



    const handleOpenEditModal = (student) => {
        setSelectedStudent(student);
        setIsEditModalOpen(true);
    };

    const handleSaveStudent = async (editedStudent) => {
        try {
            // Combina "intolerancia_especifica" con "intolerancia_religion"
            const intoleranciaReligion = [...editedStudent.intolerancia_religion];

            if (editedStudent.intolerancia_religion.includes("Otros") && editedStudent.intolerancia_especifica) {
                intoleranciaReligion.push(editedStudent.intolerancia_especifica);
            }

            const response = await csrfFetch(`/api/students/${editedStudent.studentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: editedStudent.nombre,
                    apellidos: editedStudent.apellidos,
                    clase_id: editedStudent.clase_id,
                    intolerancia_religion: intoleranciaReligion, // Incluye "Otros" y "intolerancia_especifica"
                    beca: editedStudent.beca,
                }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estudiante.');
            }

            const updatedStudent = await response.json();
            console.log('Estudiante actualizado correctamente:', updatedStudent);

            // Opcional: Actualizar el estado del frontend
        } catch (error) {
            console.error('Error al editar el estudiante:', error);
        }
        setIsEditModalOpen(false);
    };


    return (
        <Card>
            <CardHeader
                title={
                    <Tooltip title={clase.nombre}>
                        <Typography variant="h6" noWrap>
                            {truncateText(clase.nombre, 20)}
                        </Typography>
                    </Tooltip>
                }
                subheader={`Curso Académico: ${clase.curso_academico || 'N/A'}`}
                action={
                    <Box>
                        <IconButton onClick={() => onEditClass(clase)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteClass(clase)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                }
            />
            <CardActions>
                <Button
                    onClick={toggleExpand}
                    endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {expanded ? 'Ocultar Alumnos' : 'Ver Alumnos'}
                </Button>
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => onOpenStudentModal(clase.id)}
                >
                    Añadir Alumno
                </Button>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                        <FormControl size="small" sx={{ minWidth: 150, mr: 2 }}>
                            <Select
                                value={groupAction}
                                onChange={(e) => setGroupAction(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Acciones en masa
                                </MenuItem>
                                <MenuItem value="assign">Asignar al Comedor</MenuItem>
                                <MenuItem value="unassign">Desasignar del Comedor</MenuItem>
                                <MenuItem value="delete">Eliminar</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            onClick={handleApplyGroupAction}
                            disabled={selectedStudents.length === 0 || !groupAction}
                            variant="contained"
                            color="primary"
                        >
                            Aplicar
                        </Button>
                    </Box>

                    <ListItem dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={selectedStudents.length === estudiantes.length && estudiantes.length > 0}
                                indeterminate={selectedStudents.length > 0 && selectedStudents.length < estudiantes.length}
                                onChange={handleSelectAll}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Seleccionar Todos" />
                    </ListItem>

                    <List>
                        {estudiantes.map((estudiante) => (
                            <ListItem key={`${clase.id}-${estudiante.id}`} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selectedStudents.includes(estudiante.id)}
                                        onChange={() => handleSelectStudent(estudiante.id)}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Tooltip title={`${estudiante.nombre} ${estudiante.apellidos}`}>
                                            <Typography noWrap>
                                                {truncateText(`${estudiante.nombre} ${estudiante.apellidos}`, 30)}
                                            </Typography>
                                        </Tooltip>
                                    }
                                    secondary={`Asignado: ${estudiante.asignado_comedor ? 'Sí' : 'No'}`}
                                />
                                <Box display="flex" alignItems="center">
                                    {estudiante.loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <>
                                            <Switch
                                                checked={estudiante.asignado_comedor}
                                                onChange={async () => {
                                                    dispatch({
                                                        type: 'TOGGLE_ASSIGNMENT_LOADING',
                                                        payload: { classId: clase.id, studentId: estudiante.id },
                                                    });
                                                    try {
                                                        await onToggleAssignment(clase.id, estudiante.id);
                                                        dispatch({
                                                            type: 'TOGGLE_ASSIGNMENT_SUCCESS',
                                                            payload: { classId: clase.id, studentId: estudiante.id },
                                                        });
                                                    } catch (error) {
                                                        console.error('Error al alternar el estado:', error);
                                                        dispatch({
                                                            type: 'TOGGLE_ASSIGNMENT_FAILURE',
                                                            payload: { classId: clase.id, studentId: estudiante.id },
                                                        });
                                                    }
                                                }}
                                                color="secondary"
                                            />
                                            <IconButton
                                                onClick={() => onDeleteStudent(clase.id, estudiante.id)}
                                                size="small"
                                            >
                                                <DeleteIcon fontSize="small" color="error" />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenEditModal(estudiante)}
                                                size="small"
                                            >
                                                <VisibilityIcon fontSize="small" color="primary" />
                                            </IconButton>
                                        </>
                                    )}
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>

            {selectedStudent && (
                <EditStudentModal
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={handleSaveStudent}
                    studentData={selectedStudent}
                    studentId={selectedStudent.id}
                />
            )}
        </Card>
    );
}