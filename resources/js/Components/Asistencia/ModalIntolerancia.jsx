import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Chip,
    IconButton,
    Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export function StudentIntolerancesModal({ isOpen, onClose, student }) {
    if (!student) return null;

    const intolerances = student.intolerancia_religion
        ? JSON.parse(student.intolerancia_religion)
        : [];

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    padding: 2,
                    bgcolor: 'background.paper',
                },
            }}
        >
            <DialogTitle>
                Intolerancias de {student.nombre}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 2 }}
                >
                    Estas son las intolerancias registradas para este estudiante:
                </Typography>
                {intolerances.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {intolerances.map((intolerancia, index) => (
                            <Chip
                                key={index}
                                label={intolerancia}
                                color="error"
                                variant="outlined"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                    bgcolor: (theme) => theme.palette.error.main,
                                }}
                            />
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        Este estudiante no tiene intolerancias registradas.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
