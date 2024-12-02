import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
} from '@mui/material';

const AddEditClassModal = ({ open, onClose, onSave, initialData = {} }) => {
    const [formData, setFormData] = useState({
        nombre: initialData.nombre || '',
        capacidad: initialData.capacidad || '',
    });

    const handleSave = () => {
        if (formData.nombre && formData.capacidad) {
            onSave({
                nombre: formData.nombre,
                capacidad: parseInt(formData.capacidad, 10),
            });
            setFormData({ nombre: '', capacidad: '' });
            onClose();
        } else {
            alert('Por favor, completa todos los campos');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{initialData.id ? 'Editar Clase' : 'Añadir Clase'}</DialogTitle>
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
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Capacidad"
                            name="capacidad"
                            type="number"
                            fullWidth
                            variant="outlined"
                            value={formData.capacidad}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    {initialData.id ? 'Guardar Cambios' : 'Añadir'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditClassModal;
