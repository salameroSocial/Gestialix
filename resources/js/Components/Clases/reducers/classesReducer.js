/**
 * Reducer para manejar el estado de las clases.
 * @param {Array} state - Estado actual de las clases.
 * @param {Object} action - Acción que modifica el estado.
 * @returns {Array} - Nuevo estado actualizado.
 */
const classesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            // Establece las clases iniciales al cargar desde el backend.
            return action.payload;

        case 'ADD_CLASS':
            // Añade una nueva clase al estado.
            return [...state, action.payload];

        case 'UPDATE_CLASS':
            // Actualiza una clase existente en el estado.
            return state.map((cls) =>
                cls.id === action.payload.id ? action.payload : cls
            );

        case 'DELETE_CLASS':
            // Elimina una clase del estado.
            return state.filter((cls) => cls.id !== action.payload);

        case 'UPDATE_STUDENTS':
            // Actualiza los estudiantes de una clase específica.
            return state.map((cls) =>
                cls.id === action.payload.classId
                    ? { ...cls, estudiantes: action.payload.students }
                    : cls
            );

        case 'TOGGLE_ASSIGNMENT_LOADING':
            return state.map((clase) =>
                clase.id === action.payload.classId
                    ? {
                        ...clase,
                        estudiantes: clase.estudiantes.map((estudiante) =>
                            estudiante.id === action.payload.studentId
                                ? { ...estudiante, loading: true }
                                : estudiante
                        ),
                    }
                    : clase
            );

        case 'TOGGLE_ASSIGNMENT_SUCCESS':
            return state.map((clase) =>
                clase.id === action.payload.classId
                    ? {
                        ...clase,
                        estudiantes: clase.estudiantes.map((estudiante) =>
                            estudiante.id === action.payload.studentId
                                ? {
                                    ...estudiante,
                                    asignado_comedor: !estudiante.asignado_comedor,
                                    loading: false,
                                }
                                : estudiante
                        ),
                    }
                    : clase
            );

        case 'TOGGLE_ASSIGNMENT_FAILURE':
            return state.map((clase) =>
                clase.id === action.payload.classId
                    ? {
                        ...clase,
                        estudiantes: clase.estudiantes.map((estudiante) =>
                            estudiante.id === action.payload.studentId
                                ? { ...estudiante, loading: false }
                                : estudiante
                        ),
                    }
                    : clase
            );

        case 'UPDATE_STUDENT':
            return state.map((clase) => {
                if (clase.id === action.payload.clase_id) {
                    return {
                        ...clase,
                        estudiantes: clase.estudiantes.map((estudiante) =>
                            estudiante.id === action.payload.id ? action.payload : estudiante
                        ),
                    };
                }
                return clase;
            });
        case 'ADD_STUDENT':
            const { classId, student } = action.payload;
            return state.map((clase) =>
                clase.id === classId
                    ? { ...clase, estudiantes: [...clase.estudiantes, student] }
                    : clase
            );


        case 'DELETE_STUDENT':
            return state.map((clase) =>
                clase.id === action.payload.classId
                    ? {
                        ...clase,
                        estudiantes: clase.estudiantes.filter(
                            (estudiante) => estudiante.id !== action.payload.studentId
                        ),
                    }
                    : clase
            );

        case 'DELETE_STUDENTS':
            const { payload: studentIdsToDelete } = action;
            return state.map((clase) => ({
                ...clase,
                estudiantes: clase.estudiantes.filter(
                    (estudiante) => !studentIdsToDelete.includes(estudiante.id)
                ),
            }));

        case 'ASSIGN_STUDENTS_COMEDOR':
            const { payload: studentIdsToAssign } = action;
            return state.map((clase) => ({
                ...clase,
                estudiantes: clase.estudiantes.map((estudiante) =>
                    studentIdsToAssign.includes(estudiante.id)
                        ? { ...estudiante, asignado_comedor: true }
                        : estudiante
                ),
            }));
        case 'UNASSIGN_STUDENTS_COMEDOR':
            const { payload: studentIdsToUnassign } = action;
            return state.map((clase) => ({
                ...clase,
                estudiantes: clase.estudiantes.map((estudiante) =>
                    studentIdsToUnassign.includes(estudiante.id)
                        ? { ...estudiante, asignado_comedor: false }
                        : estudiante
                ),
            }));

        default:
            // Devuelve el estado actual si no coincide ninguna acción.
            return state;
    }
};

export default classesReducer;
