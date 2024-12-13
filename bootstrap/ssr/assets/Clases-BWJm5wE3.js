import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as AppLayout } from "./AppLayout-CWhgbinT.js";
import { useState, useEffect, forwardRef, useImperativeHandle, useRef, useReducer } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogTitle, DialogContent, Grid, TextField, FormControl, InputLabel, Select, Box, Chip, MenuItem, DialogActions, Button, Card, CardHeader, Tooltip, Typography, IconButton, CardActions, Collapse, CardContent, ListItem, ListItemIcon, Checkbox, ListItemText, List, CircularProgress, Switch, Snackbar, Alert, Container, Paper, InputAdornment } from "@mui/material";
import { Edit, Delete, ExpandLess, ExpandMore, Add, Visibility } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import "@inertiajs/inertia";
import "lucide-react";
import "../app.js";
import "axios";
import "@inertiajs/react";
import "react-dom/client";
import "@mui/material/styles/index.js";
import "./apiClient-DgzgG0IP.js";
const EditStudentModal = ({ open, onClose, onSave, studentData = {} }) => {
  const [formData, setFormData] = useState({
    studentId: "",
    nombre: "",
    apellidos: "",
    clase_id: "",
    intolerancia_religion: [],
    intolerancia_especifica: "",
    beca: false
  });
  useEffect(() => {
    if (studentData) {
      setFormData({
        studentId: studentData.id || "",
        nombre: studentData.nombre || "",
        apellidos: studentData.apellidos || "",
        clase_id: studentData.clase_id || "",
        intolerancia_religion: Array.isArray(studentData.intolerancia_religion) ? studentData.intolerancia_religion : JSON.parse(studentData.intolerancia_religion || "[]"),
        intolerancia_especifica: studentData.intolerancia_especifica || "",
        beca: !!studentData.beca
      });
    }
  }, [studentData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleIntoleranceChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      intolerancia_religion: value
    }));
  };
  const handleDeleteIntolerance = (intoleranceToDelete) => {
    setFormData((prev) => ({
      ...prev,
      intolerancia_religion: prev.intolerancia_religion.filter(
        (intolerancia) => intolerancia !== intoleranceToDelete
      )
    }));
  };
  const handleSave = () => {
    onSave(formData);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, fullWidth: true, maxWidth: "sm", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Editar Estudiante" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mt: 1 }, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Nombre",
          name: "nombre",
          value: formData.nombre,
          onChange: handleChange,
          fullWidth: true,
          variant: "outlined"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Apellidos",
          name: "apellidos",
          value: formData.apellidos,
          onChange: handleChange,
          fullWidth: true,
          variant: "outlined"
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, variant: "outlined", children: [
        /* @__PURE__ */ jsx(InputLabel, { children: "Intolerancias" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            multiple: true,
            name: "intolerancia_religion",
            value: formData.intolerancia_religion,
            onChange: handleIntoleranceChange,
            label: "Intolerancias",
            renderValue: (selected) => /* @__PURE__ */ jsx(Box, { sx: { display: "flex", flexWrap: "wrap", gap: 0.5 }, children: selected.map((value) => /* @__PURE__ */ jsx(
              Chip,
              {
                label: value,
                onDelete: () => handleDeleteIntolerance(value),
                deleteIcon: /* @__PURE__ */ jsx(
                  CancelIcon,
                  {
                    onMouseDown: (event) => event.stopPropagation()
                  }
                )
              },
              value
            )) }),
            children: [
              /* @__PURE__ */ jsx(MenuItem, { value: "No Carne", children: "No Carne" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "No Credo", children: "No Credo" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "Celiaco", children: "Celiaco" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "Lactosa", children: "Lactosa" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "Otros", children: "Otros" })
            ]
          }
        )
      ] }) }),
      formData.intolerancia_religion.includes("Otros") && /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Especificar Intolerancia",
          name: "intolerancia_especifica",
          value: formData.intolerancia_especifica || "",
          onChange: (e) => setFormData((prev) => ({
            ...prev,
            intolerancia_especifica: e.target.value
          })),
          fullWidth: true,
          variant: "outlined",
          multiline: true
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSave, variant: "contained", color: "primary", children: "Guardar Cambios" })
    ] })
  ] });
};
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
function StudentList({ clase, estudiantes, onEditClass, onDeleteClass, onOpenStudentModal, onToggleAssignment, onDeleteStudent, dispatch }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [groupAction, setGroupAction] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const toggleExpand = () => setExpanded(!expanded);
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStudents(estudiantes.map((e) => e.id));
    } else {
      setSelectedStudents([]);
    }
  };
  const handleSelectStudent = (studentId) => {
    setSelectedStudents(
      (prev) => prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };
  const handleApplyGroupAction = async () => {
    console.log(`Aplicando ${groupAction} a`, selectedStudents);
    if (selectedStudents.length === 0 || !groupAction) return;
    try {
      if (groupAction === "delete") {
        const deletePromises = selectedStudents.map(
          (studentId) => csrfFetch(`/api/students/${studentId}`, { method: "DELETE" })
        );
        await Promise.all(deletePromises);
        dispatch({ type: "DELETE_STUDENTS", payload: selectedStudents });
      } else if (groupAction === "assign") {
        const assignPromises = selectedStudents.map(
          (studentId) => csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ asignado: true })
          })
        );
        await Promise.all(assignPromises);
        dispatch({ type: "ASSIGN_STUDENTS_COMEDOR", payload: selectedStudents });
      } else if (groupAction === "unassign") {
        const unassignPromises = selectedStudents.map(
          (studentId) => csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ asignado: false })
          })
        );
        await Promise.all(unassignPromises);
        dispatch({ type: "UNASSIGN_STUDENTS_COMEDOR", payload: selectedStudents });
      }
      setSelectedStudents([]);
      setGroupAction("");
    } catch (error) {
      console.error("Error al realizar la acción grupal:", error);
    }
  };
  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };
  const handleSaveStudent = async (editedStudent) => {
    try {
      const intoleranciaReligion = [...editedStudent.intolerancia_religion];
      if (editedStudent.intolerancia_religion.includes("Otros") && editedStudent.intolerancia_especifica) {
        intoleranciaReligion.push(editedStudent.intolerancia_especifica);
      }
      const response = await csrfFetch(`/api/students/${editedStudent.studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: editedStudent.nombre,
          apellidos: editedStudent.apellidos,
          clase_id: editedStudent.clase_id,
          intolerancia_religion: intoleranciaReligion,
          // Incluye "Otros" y "intolerancia_especifica"
          beca: editedStudent.beca
        })
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el estudiante.");
      }
      const updatedStudent = await response.json();
      console.log("Estudiante actualizado correctamente:", updatedStudent);
    } catch (error) {
      console.error("Error al editar el estudiante:", error);
    }
    setIsEditModalOpen(false);
  };
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(
      CardHeader,
      {
        title: /* @__PURE__ */ jsx(Tooltip, { title: clase.nombre, children: /* @__PURE__ */ jsx(Typography, { variant: "h6", noWrap: true, children: truncateText(clase.nombre, 20) }) }),
        subheader: `Curso Académico: ${clase.curso_academico || "N/A"}`,
        action: /* @__PURE__ */ jsxs(Box, { children: [
          /* @__PURE__ */ jsx(IconButton, { onClick: () => onEditClass(clase), children: /* @__PURE__ */ jsx(Edit, {}) }),
          /* @__PURE__ */ jsx(IconButton, { onClick: () => onDeleteClass(clase), children: /* @__PURE__ */ jsx(Delete, {}) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(CardActions, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: toggleExpand,
          endIcon: expanded ? /* @__PURE__ */ jsx(ExpandLess, {}) : /* @__PURE__ */ jsx(ExpandMore, {}),
          children: expanded ? "Ocultar Alumnos" : "Ver Alumnos"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          startIcon: /* @__PURE__ */ jsx(Add, {}),
          onClick: () => onOpenStudentModal(clase.id),
          children: "Añadir Alumno"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Collapse, { in: expanded, timeout: "auto", unmountOnExit: true, children: /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxs(Box, { display: "flex", alignItems: "center", mb: 2, children: [
        /* @__PURE__ */ jsx(FormControl, { size: "small", sx: { minWidth: 150, mr: 2 }, children: /* @__PURE__ */ jsxs(
          Select,
          {
            value: groupAction,
            onChange: (e) => setGroupAction(e.target.value),
            displayEmpty: true,
            children: [
              /* @__PURE__ */ jsx(MenuItem, { value: "", disabled: true, children: "Acciones en masa" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "assign", children: "Asignar al Comedor" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "unassign", children: "Desasignar del Comedor" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "delete", children: "Eliminar" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleApplyGroupAction,
            disabled: selectedStudents.length === 0 || !groupAction,
            variant: "contained",
            color: "primary",
            children: "Aplicar"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(ListItem, { dense: true, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            edge: "start",
            checked: selectedStudents.length === estudiantes.length && estudiantes.length > 0,
            indeterminate: selectedStudents.length > 0 && selectedStudents.length < estudiantes.length,
            onChange: handleSelectAll
          }
        ) }),
        /* @__PURE__ */ jsx(ListItemText, { primary: "Seleccionar Todos" })
      ] }),
      /* @__PURE__ */ jsx(List, { children: estudiantes.map((estudiante) => /* @__PURE__ */ jsxs(ListItem, { dense: true, children: [
        /* @__PURE__ */ jsx(ListItemIcon, { children: /* @__PURE__ */ jsx(
          Checkbox,
          {
            edge: "start",
            checked: selectedStudents.includes(estudiante.id),
            onChange: () => handleSelectStudent(estudiante.id)
          }
        ) }),
        /* @__PURE__ */ jsx(
          ListItemText,
          {
            primary: /* @__PURE__ */ jsx(Tooltip, { title: `${estudiante.nombre} ${estudiante.apellidos}`, children: /* @__PURE__ */ jsx(Typography, { noWrap: true, children: truncateText(`${estudiante.nombre} ${estudiante.apellidos}`, 30) }) }),
            secondary: `Asignado: ${estudiante.asignado_comedor ? "Sí" : "No"}`
          }
        ),
        /* @__PURE__ */ jsx(Box, { display: "flex", alignItems: "center", children: estudiante.loading ? /* @__PURE__ */ jsx(CircularProgress, { size: 24 }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              checked: estudiante.asignado_comedor,
              onChange: async () => {
                dispatch({
                  type: "TOGGLE_ASSIGNMENT_LOADING",
                  payload: { classId: clase.id, studentId: estudiante.id }
                });
                try {
                  await onToggleAssignment(clase.id, estudiante.id);
                  dispatch({
                    type: "TOGGLE_ASSIGNMENT_SUCCESS",
                    payload: { classId: clase.id, studentId: estudiante.id }
                  });
                } catch (error) {
                  console.error("Error al alternar el estado:", error);
                  dispatch({
                    type: "TOGGLE_ASSIGNMENT_FAILURE",
                    payload: { classId: clase.id, studentId: estudiante.id }
                  });
                }
              },
              color: "secondary"
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => onDeleteStudent(clase.id, estudiante.id),
              size: "small",
              children: /* @__PURE__ */ jsx(Delete, { fontSize: "small", color: "error" })
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => handleOpenEditModal(estudiante),
              size: "small",
              children: /* @__PURE__ */ jsx(Visibility, { fontSize: "small", color: "primary" })
            }
          )
        ] }) })
      ] }, `${clase.id}-${estudiante.id}`)) })
    ] }) }),
    selectedStudent && /* @__PURE__ */ jsx(
      EditStudentModal,
      {
        open: isEditModalOpen,
        onClose: () => setIsEditModalOpen(false),
        onSave: handleSaveStudent,
        studentData: selectedStudent,
        studentId: selectedStudent.id
      }
    )
  ] });
}
const AddEditClassModal = ({ open, onClose, onSave, editingClass = null }) => {
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    curso_academico: ""
  });
  const [errors, setErrors] = useState({
    nombre: "",
    curso_academico: ""
  });
  useEffect(() => {
    if (editingClass) {
      setFormData({
        id: editingClass.id || null,
        nombre: editingClass.nombre || "",
        // Establece el nombre si existe
        curso_academico: editingClass.curso_academico || ""
        // Establece el curso académico si existe
      });
    } else {
      setFormData({ id: null, nombre: "", curso_academico: "" });
    }
  }, [editingClass]);
  const validateCursoAcademico = (value) => {
    const regex = /^\d{4}\/\d{4}$/;
    if (!regex.test(value)) {
      return "El formato debe ser YYYY/YYYY";
    }
    return "";
  };
  const handleSave = () => {
    const cursoAcademicoError = validateCursoAcademico(formData.curso_academico);
    if (formData.nombre && !cursoAcademicoError) {
      onSave({
        id: formData.id,
        // Incluimos el id (será null si es una nueva clase)
        nombre: formData.nombre,
        curso_academico: formData.curso_academico
      });
      setFormData({ id: null, nombre: "", curso_academico: "" });
      setErrors({ nombre: "", curso_academico: "" });
      onClose();
    } else {
      setErrors({
        nombre: formData.nombre ? "" : "El nombre es obligatorio",
        curso_academico: cursoAcademicoError || "El curso académico es obligatorio"
      });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "curso_academico") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        curso_academico: validateCursoAcademico(value)
      }));
    }
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, fullWidth: true, children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: editingClass ? "Editar Clase" : "Añadir Clase" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mt: 1 }, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          autoFocus: true,
          label: "Nombre de la Clase",
          name: "nombre",
          fullWidth: true,
          variant: "outlined",
          value: formData.nombre,
          onChange: handleChange,
          error: !!errors.nombre,
          helperText: errors.nombre
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Curso Académico (YYYY/YYYY)",
          name: "curso_academico",
          type: "text",
          fullWidth: true,
          variant: "outlined",
          value: formData.curso_academico,
          onChange: handleChange,
          error: !!errors.curso_academico,
          helperText: errors.curso_academico
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSave, variant: "contained", color: "primary", children: editingClass ? "Guardar Cambios" : "Añadir" })
    ] })
  ] });
};
const AddStudentModal = ({ open, onClose, onSave, classId }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    clase_id: "",
    // Inicialmente vacío
    pago: "",
    intolerancia_religion: [],
    intolerancia_especifica: "",
    beca: false
  });
  useEffect(() => {
    if (classId) {
      setFormData((prevData) => ({
        ...prevData,
        clase_id: classId
      }));
    }
  }, [classId]);
  const intoleranciaOptions = [
    "No Carne",
    "No Credo",
    "Celiaco",
    "Lactosa",
    "Otros (Especificar)"
  ];
  const handleSave = () => {
    if (!formData.nombre || !formData.apellidos || !formData.pago) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }
    const intolerancias = formData.intolerancia_religion.includes("Otros (Especificar)") && formData.intolerancia_especifica ? [...formData.intolerancia_religion, formData.intolerancia_especifica] : formData.intolerancia_religion;
    onSave({
      ...formData,
      intolerancia_religion: intolerancias
    });
    setFormData({
      nombre: "",
      apellidos: "",
      clase_id: classId || "",
      pago: "",
      intolerancia_religion: [],
      intolerancia_especifica: "",
      beca: false
    });
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onClose, fullWidth: true, children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Añadir Nuevo Estudiante" }),
    /* @__PURE__ */ jsx(DialogContent, { children: /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, sx: { mt: 1 }, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Nombre",
          name: "nombre",
          fullWidth: true,
          variant: "outlined",
          value: formData.nombre,
          onChange: handleChange
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Apellidos",
          name: "apellidos",
          fullWidth: true,
          variant: "outlined",
          value: formData.apellidos,
          onChange: handleChange
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Clase ID",
          name: "clase_id",
          fullWidth: true,
          variant: "outlined",
          value: formData.clase_id,
          disabled: true
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
        /* @__PURE__ */ jsx(InputLabel, { id: "pago-label", children: "Método de Pago" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            labelId: "pago-label",
            name: "pago",
            value: formData.pago,
            onChange: handleChange,
            children: [
              /* @__PURE__ */ jsx(MenuItem, { value: "Beca", children: "Beca" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "Domiciliado", children: "Domiciliado" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
        /* @__PURE__ */ jsx(InputLabel, { id: "intolerancia-label", children: "Intolerancia Religiosa/Alimenticia" }),
        /* @__PURE__ */ jsx(
          Select,
          {
            labelId: "intolerancia-label",
            name: "intolerancia_religion",
            multiple: true,
            value: formData.intolerancia_religion,
            onChange: (e) => setFormData((prev) => ({
              ...prev,
              intolerancia_religion: e.target.value
            })),
            renderValue: (selected) => selected.join(", "),
            children: intoleranciaOptions.map((option) => /* @__PURE__ */ jsxs(MenuItem, { value: option, children: [
              /* @__PURE__ */ jsx(Checkbox, { checked: formData.intolerancia_religion.includes(option) }),
              /* @__PURE__ */ jsx(ListItemText, { primary: option })
            ] }, option))
          }
        )
      ] }) }),
      formData.intolerancia_religion.includes("Otros (Especificar)") && /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsx(
        TextField,
        {
          label: "Especificar Intolerancia",
          name: "intolerancia_especifica",
          fullWidth: true,
          variant: "outlined",
          multiline: true,
          rows: 3,
          value: formData.intolerancia_especifica,
          onChange: handleChange
        }
      ) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, children: [
        /* @__PURE__ */ jsx(InputLabel, { id: "beca-label", children: "Beca" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            labelId: "beca-label",
            name: "beca",
            value: formData.beca,
            onChange: (e) => setFormData((prev) => ({
              ...prev,
              beca: e.target.value === "true"
            })),
            children: [
              /* @__PURE__ */ jsx(MenuItem, { value: "true", children: "Sí" }),
              /* @__PURE__ */ jsx(MenuItem, { value: "false", children: "No" })
            ]
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs(DialogActions, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onClose, children: "Cancelar" }),
      /* @__PURE__ */ jsx(Button, { onClick: handleSave, variant: "contained", color: "primary", children: "Guardar" })
    ] })
  ] });
};
const classesReducer = (state, action) => {
  switch (action.type) {
    case "SET_CLASSES":
      return action.payload;
    case "ADD_CLASS":
      return [...state, action.payload];
    case "UPDATE_CLASS":
      return state.map(
        (cls) => cls.id === action.payload.id ? action.payload : cls
      );
    case "DELETE_CLASS":
      return state.filter((cls) => cls.id !== action.payload);
    case "UPDATE_STUDENTS":
      return state.map(
        (cls) => cls.id === action.payload.classId ? { ...cls, estudiantes: action.payload.students } : cls
      );
    case "TOGGLE_ASSIGNMENT_LOADING":
      return state.map(
        (clase) => clase.id === action.payload.classId ? {
          ...clase,
          estudiantes: clase.estudiantes.map(
            (estudiante) => estudiante.id === action.payload.studentId ? { ...estudiante, loading: true } : estudiante
          )
        } : clase
      );
    case "TOGGLE_ASSIGNMENT_SUCCESS":
      return state.map(
        (clase) => clase.id === action.payload.classId ? {
          ...clase,
          estudiantes: clase.estudiantes.map(
            (estudiante) => estudiante.id === action.payload.studentId ? {
              ...estudiante,
              asignado_comedor: !estudiante.asignado_comedor,
              loading: false
            } : estudiante
          )
        } : clase
      );
    case "TOGGLE_ASSIGNMENT_FAILURE":
      return state.map(
        (clase) => clase.id === action.payload.classId ? {
          ...clase,
          estudiantes: clase.estudiantes.map(
            (estudiante) => estudiante.id === action.payload.studentId ? { ...estudiante, loading: false } : estudiante
          )
        } : clase
      );
    case "UPDATE_STUDENT":
      return state.map((clase) => {
        if (clase.id === action.payload.clase_id) {
          return {
            ...clase,
            estudiantes: clase.estudiantes.map(
              (estudiante) => estudiante.id === action.payload.id ? action.payload : estudiante
            )
          };
        }
        return clase;
      });
    case "ADD_STUDENT":
      const { classId, student } = action.payload;
      return state.map(
        (clase) => clase.id === classId ? { ...clase, estudiantes: [...clase.estudiantes, student] } : clase
      );
    case "DELETE_STUDENT":
      return state.map(
        (clase) => clase.id === action.payload.classId ? {
          ...clase,
          estudiantes: clase.estudiantes.filter(
            (estudiante) => estudiante.id !== action.payload.studentId
          )
        } : clase
      );
    case "DELETE_STUDENTS":
      const { payload: studentIdsToDelete } = action;
      return state.map((clase) => ({
        ...clase,
        estudiantes: clase.estudiantes.filter(
          (estudiante) => !studentIdsToDelete.includes(estudiante.id)
        )
      }));
    case "ASSIGN_STUDENTS_COMEDOR":
      const { payload: studentIdsToAssign } = action;
      return state.map((clase) => ({
        ...clase,
        estudiantes: clase.estudiantes.map(
          (estudiante) => studentIdsToAssign.includes(estudiante.id) ? { ...estudiante, asignado_comedor: true } : estudiante
        )
      }));
    case "UNASSIGN_STUDENTS_COMEDOR":
      const { payload: studentIdsToUnassign } = action;
      return state.map((clase) => ({
        ...clase,
        estudiantes: clase.estudiantes.map(
          (estudiante) => studentIdsToUnassign.includes(estudiante.id) ? { ...estudiante, asignado_comedor: false } : estudiante
        )
      }));
    default:
      return state;
  }
};
const ToastManager = forwardRef((_, ref) => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
  useImperativeHandle(ref, () => ({
    showToast: (message, severity = "success") => {
      setToast({ open: true, message, severity });
    }
  }));
  const handleClose = () => {
    setToast({ ...toast, open: false });
  };
  return /* @__PURE__ */ jsx(
    Snackbar,
    {
      open: toast.open,
      autoHideDuration: 6e3,
      onClose: handleClose,
      anchorOrigin: { vertical: "bottom", horizontal: "right" },
      children: /* @__PURE__ */ jsxs(
        Alert,
        {
          onClose: handleClose,
          severity: toast.severity,
          sx: { width: "100%", whiteSpace: "pre-wrap" },
          children: [
            typeof toast.message === "string" ? toast.message : JSON.stringify(toast.message, null, 2),
            " "
          ]
        }
      )
    }
  );
});
function ClaseManagement() {
  const toastRef = useRef();
  const [classes, dispatch] = useReducer(classesReducer, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [orderBy, setOrderBy] = useState("nombre");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const showToast = (message, severity) => {
    toastRef.current.showToast(message, severity);
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await csrfFetch("/api/classes");
        const data = await response.json();
        dispatch({ type: "SET_CLASSES", payload: data });
      } catch (error) {
        showToast("Error al cargar las clases:", "error");
        console.error("Error al cargar las clases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);
  const handleDeleteStudent = async (classId, studentId) => {
    try {
      await csrfFetch(`/api/classes/${classId}/students/${studentId}`, {
        method: "DELETE"
      });
      dispatch({
        type: "DELETE_STUDENT",
        payload: { classId, studentId }
      });
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
    }
  };
  const handleSaveClass = async (clase) => {
    try {
      console.log("clase", clase);
      const method = editingClass ? "PUT" : "POST";
      const endpoint = editingClass ? `/api/classes/${clase.id}` : "/api/classes/new";
      const response = await csrfFetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clase)
      });
      const updatedClass = await response.json();
      dispatch({
        type: editingClass ? "UPDATE_CLASS" : "ADD_CLASS",
        payload: updatedClass
      });
      setIsModalOpen(false);
      setEditingClass(null);
    } catch (error) {
      console.error("Error al guardar la clase:", error);
    }
  };
  const handleDeleteClass = async (classId) => {
    try {
      await csrfFetch(`/api/classes/${classId}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CLASS", payload: classId });
    } catch (error) {
      console.error("Error al eliminar la clase:", error);
    }
  };
  const handleSaveStudent = async (studentData) => {
    try {
      console.log("Entrando en el save...");
      const response = await csrfFetch(`/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
      });
      const { estudiante } = await response.json();
      console.log("Estudiante recibido:", estudiante);
      dispatch({
        type: "ADD_STUDENT",
        payload: {
          classId: studentData.clase_id,
          student: estudiante
          // Usa el estudiante extraído
        }
      });
      console.log("Estudiante añadido correctamente:", estudiante);
    } catch (error) {
      console.error("Error al guardar el estudiante:", error);
      alert("No se pudo guardar el estudiante.");
    }
  };
  const toggleAssignment = async (classId, studentId) => {
    try {
      const response = await csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
        method: "PATCH"
      });
      if (response.status === 200) {
        const { asignado } = await response.json();
        dispatch({
          type: "TOGGLE_ASSIGNMENT",
          payload: { classId, studentId, asignado }
        });
      }
    } catch (error) {
      console.error("Error al alternar el estado de asignación:", error);
      alert("No se pudo alternar el estado de asignación.");
    }
  };
  const handleOpenStudentModal = (classId) => {
    console.log("ID de la clase recibido en el padre:", classId);
    setSelectedClassId(classId);
    setIsStudentModalOpen(true);
  };
  const handleEditStudent = async (classId, editedStudent) => {
    try {
      console.log("Estudiante editado:", editedStudent, "Estudiante id:", editedStudent.studentId);
      const response = await csrfFetch(`/api/students/${editedStudent.studentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedStudent)
      });
      if (!response.ok) {
        throw new Error("Error en la actualización.");
      }
      const updatedStudent = await response.json();
      dispatch({ type: "UPDATE_STUDENT", payload: updatedStudent });
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
    }
  };
  const processedClasses = classes.filter((cls) => {
    return cls.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  }).map((cls) => {
    const sortedEstudiantes = [...cls.estudiantes || []].sort((a, b) => {
      if (orderBy === "nombre") {
        return (a.nombre || "").localeCompare(b.nombre || "");
      } else if (orderBy === "apellidos") {
        return (a.apellidos || "").localeCompare(b.apellidos || "");
      } else if (orderBy === "asignado") {
        return (a.asignado_comedor ? 1 : 0) - (b.asignado_comedor ? 1 : 0);
      }
      return 0;
    });
    return { ...cls, estudiantes: sortedEstudiantes };
  });
  return /* @__PURE__ */ jsxs(Container, { maxWidth: "xl", className: "h-full mb-8 mt-0", children: [
    /* @__PURE__ */ jsx(ToastManager, { ref: toastRef }),
    /* @__PURE__ */ jsx(Box, { sx: { py: 4 }, children: /* @__PURE__ */ jsxs(
      Paper,
      {
        elevation: 3,
        sx: {
          p: { xs: 2, sm: 4 },
          backgroundColor: "background.default",
          // Usa tokens de color del tema
          borderRadius: 2
        },
        children: [
          /* @__PURE__ */ jsx(
            Typography,
            {
              variant: "h4",
              component: "h1",
              align: "center",
              gutterBottom: true,
              sx: {
                fontWeight: "bold",
                color: "primary.main",
                // Usa tokens de color del tema
                mb: 4
              },
              children: "Gestión de Clases"
            }
          ),
          /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 3, alignItems: "stretch", children: [
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 6, children: /* @__PURE__ */ jsx(
              TextField,
              {
                fullWidth: true,
                placeholder: "Buscar clases...",
                variant: "outlined",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                InputProps: {
                  startAdornment: /* @__PURE__ */ jsx(InputAdornment, { position: "start", children: /* @__PURE__ */ jsx(SearchIcon, { color: "action" }) })
                }
              }
            ) }),
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 3, children: /* @__PURE__ */ jsxs(FormControl, { fullWidth: true, variant: "outlined", children: [
              /* @__PURE__ */ jsx(InputLabel, { id: "order-by-label", children: "Ordenar por" }),
              /* @__PURE__ */ jsxs(
                Select,
                {
                  labelId: "order-by-label",
                  value: orderBy,
                  onChange: (e) => setOrderBy(e.target.value),
                  label: "Ordenar por",
                  children: [
                    /* @__PURE__ */ jsx(MenuItem, { value: "nombre", children: "Nombre" }),
                    /* @__PURE__ */ jsx(MenuItem, { value: "apellidos", children: "Apellido" }),
                    /* @__PURE__ */ jsx(MenuItem, { value: "asignado", children: "Estado de Asignación" })
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 3, children: /* @__PURE__ */ jsx(
              Button,
              {
                fullWidth: true,
                variant: "contained",
                color: "primary",
                startIcon: /* @__PURE__ */ jsx(AddIcon, {}),
                onClick: () => setIsModalOpen(true),
                sx: {
                  height: "100%",
                  textTransform: "none",
                  fontSize: "1rem"
                },
                children: isMobile ? "Añadir" : "Añadir Clase"
              }
            ) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 3, children: processedClasses.map((clase) => {
      return /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: /* @__PURE__ */ jsx(
        StudentList,
        {
          clase,
          estudiantes: clase.estudiantes || [],
          orderBy,
          onToggleAssignment: toggleAssignment,
          onEditClass: (clase2) => {
            setEditingClass(clase2);
            setIsModalOpen(true);
          },
          onDeleteClass: (clase2) => handleDeleteClass(clase2.id),
          onDeleteStudent: handleDeleteStudent,
          onEditStudent: handleEditStudent,
          onOpenStudentModal: handleOpenStudentModal,
          dispatch
        }
      ) }, clase.id);
    }) }),
    /* @__PURE__ */ jsx(
      AddEditClassModal,
      {
        open: isModalOpen,
        onClose: () => setIsModalOpen(false),
        onSave: handleSaveClass,
        editingClass: editingClass || {}
      }
    ),
    /* @__PURE__ */ jsx(
      AddStudentModal,
      {
        open: isStudentModalOpen,
        onClose: () => setIsStudentModalOpen(false),
        onSave: handleSaveStudent,
        classId: selectedClassId
      }
    )
  ] });
}
const Clases = () => {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(ClaseManagement, {}) });
};
export {
  Clases as default
};
