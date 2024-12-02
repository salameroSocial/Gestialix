import Switch from '@mui/material/Switch';

<ListItemSecondaryAction>
    <Switch
        checked={estudiante.asignado_comedor}
        onChange={async () => {
            dispatch({ type: 'TOGGLE_ASSIGNMENT_LOADING', payload: { classId: clase.id, studentId: estudiante.id } });

            try {
                await onToggleAssignment(clase.id, estudiante.id);
                dispatch({ type: 'TOGGLE_ASSIGNMENT_SUCCESS', payload: { classId: clase.id, studentId: estudiante.id } });
            } catch (error) {
                console.error('Error al alternar el estado:', error);
                dispatch({ type: 'TOGGLE_ASSIGNMENT_FAILURE', payload: { classId: clase.id, studentId: estudiante.id } });
            }
        }}
        inputProps={{ 'aria-label': 'toggle assignment' }}
        color="primary"
    />
</ListItemSecondaryAction>
