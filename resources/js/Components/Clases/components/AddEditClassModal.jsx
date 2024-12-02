import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from '@mui/material';

const AddEditClassModal = ({ open, onClose, onSave, editingClass = null }) => {
    const [formData, setFormData] = useState({
        id: null,
        nombre: '',
        curso_academico: '',
    });

    const [errors, setErrors] = useState({
        nombre: '',
        curso_academico: '',
    });

    useEffect(() => {
        if (editingClass) {
            // Configurar los datos de la clase seleccionada al abrir el modal
            setFormData({
                id: editingClass.id || null,
                nombre: editingClass.nombre || '', // Establece el nombre si existe
                curso_academico: editingClass.curso_academico || '', // Establece el curso académico si existe
            });
        } else {
            // Reinicia el formulario cuando se abre el modal para añadir una nueva clase
            setFormData({ id: null, nombre: '', curso_academico: '' });
        }
    }, [editingClass]);

    const validateCursoAcademico = (value) => {
        const regex = /^\d{4}\/\d{4}$/; // Regex para validar YYYY/YYYY
        if (!regex.test(value)) {
            return 'El formato debe ser YYYY/YYYY';
        }
        return '';
    };

    const handleSave = () => {
        const cursoAcademicoError = validateCursoAcademico(formData.curso_academico);
        if (formData.nombre && !cursoAcademicoError) {
            onSave({
                id: formData.id, // Incluimos el id (será null si es una nueva clase)
                nombre: formData.nombre,
                curso_academico: formData.curso_academico,
            });
            setFormData({ id: null, nombre: '', curso_academico: '' });
            setErrors({ nombre: '', curso_academico: '' });
            onClose();
        } else {
            setErrors({
                nombre: formData.nombre ? '' : 'El nombre es obligatorio',
                curso_academico: cursoAcademicoError || 'El curso académico es obligatorio',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'curso_academico') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                curso_academico: validateCursoAcademico(value),
            }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{editingClass ? 'Editar Clase' : 'Añadir Clase'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            autoFocus
                            label="Nombre de la Clase"
                            name="nombre"
                            fullWidth
                            variant="outlined"
                            value={formData.nombre}
                            onChange={handleChange}
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Curso Académico (YYYY/YYYY)"
                            name="curso_academico"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={formData.curso_academico}
                            onChange={handleChange}
                            error={!!errors.curso_academico}
                            helperText={errors.curso_academico}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    {editingClass ? 'Guardar Cambios' : 'Añadir'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditClassModal;
