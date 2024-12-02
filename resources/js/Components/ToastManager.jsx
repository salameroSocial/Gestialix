import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ToastManager = forwardRef((_, ref) => {
    const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

    // Exponer la función showToast al padre
    useImperativeHandle(ref, () => ({
        showToast: (message, severity = 'success') => {
            setToast({ open: true, message, severity });
        },
    }));

    const handleClose = () => {
        setToast({ ...toast, open: false });
    };

    return (
        <Snackbar
            open={toast.open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={handleClose}
                severity={toast.severity}
                sx={{ width: '100%', whiteSpace: 'pre-wrap' }} // Permite formato legible
            >
                {typeof toast.message === 'string'
                    ? toast.message
                    : JSON.stringify(toast.message, null, 2)} {/* Mostrar errores formateados */}
            </Alert>
        </Snackbar>
    );
});

export default ToastManager;
