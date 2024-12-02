import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Box,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const EditStudentModal = ({ open, onClose, onSave, studentData = {} }) => {
    const [formData, setFormData] = useState({
        studentId: '',
        nombre: '',
        apellidos: '',
        clase_id: '',
        intolerancia_religion: [],
        intolerancia_especifica: '',
        beca: false,
    });

    useEffect(() => {
        if (studentData) {
            setFormData({
                studentId: studentData.id || '',
                nombre: studentData.nombre || '',
                apellidos: studentData.apellidos || '',
                clase_id: studentData.clase_id || '',
                intolerancia_religion: Array.isArray(studentData.intolerancia_religion)
                    ? studentData.intolerancia_religion
                    : JSON.parse(studentData.intolerancia_religion || '[]'),
                intolerancia_especifica: studentData.intolerancia_especifica || '',
                beca: !!studentData.beca,
            });
        }
    }, [studentData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIntoleranceChange = (e) => {
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            intolerancia_religion: value,
        }));
    };

    const handleDeleteIntolerance = (intoleranceToDelete) => {
        setFormData((prev) => ({
            ...prev,
            intolerancia_religion: prev.intolerancia_religion.filter(
                (intolerancia) => intolerancia !== intoleranceToDelete
            ),
        }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Editar Estudiante</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellidos"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Intolerancias</InputLabel>
                            <Select
                                multiple
                                name="intolerancia_religion"
                                value={formData.intolerancia_religion}
                                onChange={handleIntoleranceChange}
                                label="Intolerancias"
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={value}
                                                onDelete={() => handleDeleteIntolerance(value)}
                                                deleteIcon={
                                                    <CancelIcon
                                                        onMouseDown={(event) => event.stopPropagation()}
                                                    />
                                                }
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                <MenuItem value="No Carne">No Carne</MenuItem>
                                <MenuItem value="No Credo">No Credo</MenuItem>
                                <MenuItem value="Celiaco">Celiaco</MenuItem>
                                <MenuItem value="Lactosa">Lactosa</MenuItem>
                                <MenuItem value="Otros">Otros</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {formData.intolerancia_religion.includes('Otros') && (
                        <Grid item xs={12}>
                            <TextField
                                label="Especificar Intolerancia"
                                name="intolerancia_especifica"
                                value={formData.intolerancia_especifica}
                                onChange={handleChange}
                                fullWidth
                                variant="outlined"
                                multiline
                            />
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStudentModal;

