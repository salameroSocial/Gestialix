import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Button,
    CircularProgress,
    Switch,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const ClassCard = ({
    clase = {},
    orderBy,
    onToggleAssignment,
    onEditClass,
    onDeleteClass,
    onOpenStudentModal,
    dispatch,
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const estudiantes = clase?.estudiantes || []; // Si estudiantes es undefined, usa un array vacío por defecto

    // Ordenar los estudiantes según el filtro global
    const sortedEstudiantes = [...estudiantes].sort((a, b) => {
        if (orderBy === 'nombre') {
            return a.nombre.localeCompare(b.nombre);
        }
        if (orderBy === 'apellidos') {
            return a.apellidos.localeCompare(b.apellidos);
        }
        if (orderBy === 'asignado') {
            return a.asignado === b.asignado ? 0 : a.asignado ? -1 : 1;
        }
        return 0; // Sin cambios si no hay criterio
    });

    return (
        <Card>
            <CardHeader
                title={clase.nombre}
                subheader={`Curso Académico: ${clase.curso_academico || 'N/A'}`}
                action={
                    <>
                        <IconButton onClick={() => onEditClass(clase)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onDeleteClass(clase)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
            />
            <CardActions>
                <Button
                    onClick={toggleExpand}
                    endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                >
                    {expanded ? 'Ocultar Alumnos' : 'Ver Alumnos'}
                </Button>
                {/* <Button
                    startIcon={<AddIcon />}
                    onClick={() => onSaveStudent(clase.id)} // Abrir modal para añadir estudiante
                >    Añadir Alumno
                </Button> */}
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => onOpenStudentModal(clase.id)} // Pasa el ID de la clase
                >
                    Añadir Alumno
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {/* Lista ordenada de estudiantes */}
                    <List>
                        {sortedEstudiantes.map((estudiante) => (
                            <ListItem key={estudiante.id}>
                                <ListItemText
                                    primary={`${estudiante.nombre} ${estudiante.apellidos}`}
                                    secondary={`Asignado: ${estudiante.asignado_comedor ? 'Sí' : 'No'}`}
                                />
                                <ListItemSecondaryAction>
                                    {estudiante.loading ? (
                                        // Indicador de carga cuando está en proceso
                                        <CircularProgress size={24} />
                                    ) : (
                                        // Switch personalizado para asignación
                                        <Switch
                                            checked={estudiante.asignado_comedor}
                                            onChange={async () => {
                                                // Mostrar indicador de carga temporal
                                                dispatch({
                                                    type: 'TOGGLE_ASSIGNMENT_LOADING',
                                                    payload: { classId: clase.id, studentId: estudiante.id },
                                                });

                                                try {
                                                    // Realiza la petición al backend
                                                    await onToggleAssignment(clase.id, estudiante.id);

                                                    // Actualiza el estado tras la respuesta del backend
                                                    dispatch({
                                                        type: 'TOGGLE_ASSIGNMENT_SUCCESS',
                                                        payload: { classId: clase.id, studentId: estudiante.id },
                                                    });
                                                } catch (error) {
                                                    console.error('Error al alternar el estado:', error);

                                                    // Manejo del error
                                                    dispatch({
                                                        type: 'TOGGLE_ASSIGNMENT_FAILURE',
                                                        payload: { classId: clase.id, studentId: estudiante.id },
                                                    });
                                                }
                                            }}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': {
                                                    color: 'green',
                                                },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                    backgroundColor: 'green',
                                                },
                                                transition: 'all 0.3s ease', // Transición suave para el cambio
                                            }}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'Toggle Assignment' }}
                                        />
                                    )}
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>

                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ClassCard;
