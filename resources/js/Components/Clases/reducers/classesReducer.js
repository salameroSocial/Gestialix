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
            // Actualiza los datos de un estudiante en una clase específica.
            return state.map((cls) =>
                cls.id === action.payload.classId
                    ? {
                        ...cls,
                        estudiantes: cls.estudiantes.map((student) =>
                            student.id === action.payload.updatedStudent.id
                                ? action.payload.updatedStudent
                                : student
                        ),
                    }
                    : cls
            );
        case 'ADD_STUDENT':
            return state.map((clase) =>
                clase.id === action.payload.classId
                    ? {
                        ...clase,
                        estudiantes: [...clase.estudiantes, action.payload.student],
                    }
                    : clase
            );

        default:
            // Devuelve el estado actual si no coincide ninguna acción.
            return state;
    }
};

export default classesReducer;
