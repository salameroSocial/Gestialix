import { jsxs, jsx } from "react/jsx-runtime";
import { S as Spinner, A as AppLayout } from "./AppLayout-RoKqJet7.js";
import { useState, useEffect, useReducer } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp, Trash, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import { toast } from "react-toastify";
import Select from "react-select";
import "@inertiajs/inertia";
import "./apiClient-DgzgG0IP.js";
import "axios";
const ConfirmModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-50", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 bg-black opacity-50",
        onClick: onCancel
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-lg z-10", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Confirmación" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-6", children: message }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onCancel,
            className: "px-4 py-2 border rounded hover:bg-gray-100",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              onConfirm();
              onCancel();
            },
            className: "px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600",
            children: "Confirmar"
          }
        )
      ] })
    ] })
  ] });
};
const intoleranciaOptions = [
  { value: "no_carne", label: "No Carne" },
  { value: "no_cerdo", label: "No Cerdo" },
  { value: "celiaco", label: "Celíaco" },
  { value: "lactosa", label: "Intolerante a la Lactosa" }
];
const EditModal = ({ isOpen, onClose, onSave, title, initialData, fields }) => {
  const [formData, setFormData] = useState(initialData);
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  const handleSelectChange = (selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      intolerancia_religion: selectedOptions.map((option) => option.value)
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full", children: /* @__PURE__ */ jsxs("div", { className: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium leading-6 text-gray-900 mb-4", children: title }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      fields.map((field) => /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: field.name, className: "block text-sm font-medium text-gray-700", children: field.label }),
        field.name === "intolerancia_religion" ? (
          // Campo de selección múltiple
          /* @__PURE__ */ jsx(
            Select,
            {
              isMulti: true,
              name: "intolerancia_religion",
              options: intoleranciaOptions,
              className: "basic-multi-select",
              classNamePrefix: "select",
              value: intoleranciaOptions.filter(
                (option) => {
                  var _a;
                  return (_a = formData == null ? void 0 : formData.intolerancia_religion) == null ? void 0 : _a.includes(option.value);
                }
              ),
              onChange: handleSelectChange
            }
          )
        ) : field.type === "checkbox" ? (
          // Campo de checkbox
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              id: field.name,
              name: field.name,
              checked: formData[field.name] || false,
              onChange: handleChange,
              className: "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            }
          )
        ) : (
          // Campo de texto
          /* @__PURE__ */ jsx(
            "input",
            {
              type: field.type,
              id: field.name,
              name: field.name,
              value: formData[field.name] || "",
              onChange: handleChange,
              required: field.required,
              className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            }
          )
        )
      ] }, field.name)),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex justify-end", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            children: "Guardar"
          }
        )
      ] })
    ] })
  ] }) });
};
const StudentTable = ({ students, onStudentEdit, toggleAssignment, onStudentDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState({ deleting: null, editing: false });
  const handleDeleteClick = (studentId) => {
    setSelectedStudentId(studentId);
    setIsDeleteModalOpen(true);
  };
  const handleConfirmDelete = async () => {
    setLoading({ ...loading, deleting: selectedStudentId });
    try {
      if (selectedStudentId) {
        await onStudentDelete(selectedStudentId);
      }
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    } finally {
      setLoading({ ...loading, deleting: null });
      setSelectedStudentId(null);
      setIsDeleteModalOpen(false);
    }
  };
  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };
  const handleSave = async (updatedStudent) => {
    setLoading({ ...loading, editing: true });
    try {
      await onStudentEdit(updatedStudent);
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
    } finally {
      setLoading({ ...loading, editing: false });
      setIsEditModalOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4", children: [
    /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-left text-gray-600 dark:text-gray-200", children: [
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Asignado al Comedor" }),
        /* @__PURE__ */ jsx("th", { className: "py-2", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: students.map((student) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-gray-200 text-gray-600 dark:text-gray-200", children: [
        /* @__PURE__ */ jsxs("td", { className: "py-2", children: [
          student.nombre,
          " ",
          student.apellidos
        ] }),
        /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => toggleAssignment(student.id),
            className: `px-2 py-1 rounded-full text-xs font-semibold ${student.asignado_comedor ? "bg-green-100 text-green-800 dark:bg-green-300 dark:text-green-800" : "bg-red-200 text-gray-800 dark:bg-red-600 dark:text-gray-200"}`,
            disabled: student.loading,
            children: student.loading ? "Cargando..." : student.asignado_comedor ? "Asignado" : "No asignado"
          }
        ) }),
        /* @__PURE__ */ jsx("td", { className: "py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleEditClick(student),
              className: "p-1 hover:bg-gray-200 rounded-full",
              children: /* @__PURE__ */ jsx(Edit, { className: "w-4 h-4 text-blue-500" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDeleteClick(student.id),
              className: `p-1 hover:bg-gray-200 rounded-full ${loading.deleting === student.id ? "opacity-50" : ""}`,
              disabled: loading.deleting === student.id,
              children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4 text-red-500" })
            }
          )
        ] }) })
      ] }, student.id)) })
    ] }),
    isDeleteModalOpen && /* @__PURE__ */ jsx(
      ConfirmModal,
      {
        isOpen: isDeleteModalOpen,
        onConfirm: handleConfirmDelete,
        onCancel: () => setIsDeleteModalOpen(false),
        message: "¿Estás seguro de que quieres eliminar este estudiante?"
      }
    ),
    selectedStudent && /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isEditModalOpen,
        onClose: () => setIsEditModalOpen(false),
        onSave: handleSave,
        title: "Editar Estudiante",
        initialData: {
          id: selectedStudent.id,
          nombre: selectedStudent.nombre,
          apellidos: selectedStudent.apellidos,
          intolerancia_religion: selectedStudent.intolerancia_religion,
          beca: selectedStudent.beca
        },
        fields: [
          { name: "nombre", label: "Nombre", type: "text", required: true },
          { name: "apellidos", label: "Apellidos", type: "text", required: true },
          {
            name: "intolerancia_religion",
            label: "Intolerancia/Religión",
            type: "select"
          },
          { name: "beca", label: "Beca", type: "checkbox" }
        ]
      }
    )
  ] });
};
const ClassItem = ({
  classData,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  toggleAssignment
}) => {
  var _a;
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({
    nombre: "",
    apellidos: "",
    intolerancia_religion: "",
    beca: false
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: type === "checkbox" ? checked : value
    });
  };
  const handleStudentDelete = async (studentId) => {
    try {
      const response = await csrfFetch(`/api/classes/${classData.id}/students/${studentId}`, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Error deleting student");
      }
      const updatedStudents = classData.estudiantes.filter(
        (student) => student.id !== studentId
      );
      onToggle(classData.id);
      classData.estudiantes = updatedStudents;
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };
  const handleEditSave = async (updatedStudent) => {
    console.log("Datos enviados al backend:", updatedStudent);
    try {
      const response = await csrfFetch(`/api/students/${updatedStudent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudent)
        // O usar directamente updatedStudent si el backend acepta arrays
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el estudiante");
      }
      const updatedData = await response.json();
      setStudents(
        (prevStudents) => prevStudents.map(
          (student) => student.id === updatedData.id ? updatedData : student
        )
      );
      toast.success("Estudiante actualizado correctamente");
    } catch (error) {
      console.error("Error al guardar:", error);
      toast.error("No se pudo guardar el estudiante");
    }
  };
  const handleAddStudent = async () => {
    if (!newStudent.nombre || !newStudent.apellidos) {
      console.error("El nombre y apellidos son obligatorios");
      return;
    }
    try {
      const response = await csrfFetch(`/api/classes/${classData.id}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent)
      });
      if (!response.ok) throw new Error("Error al añadir estudiante");
      const addedStudent = await response.json();
      classData.estudiantes = [...classData.estudiantes || [], addedStudent];
      setIsAddingStudent(false);
      setNewStudent({ nombre: "", apellidos: "", intolerancia_religion: "", beca: false });
    } catch (error) {
      console.error("Error al añadir estudiante:", error);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer",
        onClick: onToggle,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("button", { className: "mr-2", children: isOpen ? /* @__PURE__ */ jsx(ChevronDown, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(ChevronUp, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-lg text-blue-500 font-semibold", children: classData.nombre }),
            /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-orange-500 hidden sm:inline", children: [
              "(",
              classData.estudiantes ? classData.estudiantes.length : 0,
              " alumnos)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm text-green-500 hidden sm:inline", children: [
              "(",
              classData.curso_academico || "N/D",
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap space-x-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  onEdit(classData);
                },
                className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                children: /* @__PURE__ */ jsx(Edit, { className: "w-5 h-5 text-blue-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setIsDeleteModalOpen(true);
                },
                className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                children: /* @__PURE__ */ jsx(Trash, { className: "w-5 h-5 text-red-500" })
              }
            ),
            /* @__PURE__ */ jsx(
              ConfirmModal,
              {
                isOpen: isDeleteModalOpen,
                onConfirm: () => onDelete(classData.id),
                onCancel: () => setIsDeleteModalOpen(false),
                message: "¿Estás seguro de que quieres eliminar esta clase?"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: (e) => {
                  e.stopPropagation();
                  setIsAddingStudent(true);
                },
                className: "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full",
                children: /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5 text-green-500" })
              }
            )
          ] })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx(
      StudentTable,
      {
        students: classData.estudiantes || [],
        onStudentDelete: handleStudentDelete,
        toggleAssignment,
        onEditSave: handleEditSave
      }
    ) }),
    isAddingStudent && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        className: "fixed inset-0 flex items-center justify-center z-50 overflow-hidden",
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "fixed inset-0 bg-black opacity-50",
              onClick: () => setIsAddingStudent(false)
            }
          ),
          /* @__PURE__ */ jsxs(motion.div, { className: "relative z-10 bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-auto shadow-lg", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-2", children: "Añadir Nuevo Estudiante" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "nombre",
                  value: newStudent.nombre,
                  onChange: handleInputChange,
                  placeholder: "Nombre",
                  className: "w-full p-2 border rounded"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "apellidos",
                  value: newStudent.apellidos,
                  onChange: handleInputChange,
                  placeholder: "Apellidos",
                  className: "w-full p-2 border rounded"
                }
              ),
              /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Intolerancias:" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: [
                { value: "no_carne", label: "No Carne" },
                { value: "no_credo", label: "No Credo" },
                { value: "celiaco", label: "Celiaco" },
                { value: "lactosa", label: "Lactosa" },
                { value: "otros", label: "Otros (Especificar abajo)" }
              ].map((option) => {
                var _a2;
                return /* @__PURE__ */ jsxs(
                  "label",
                  {
                    className: "flex items-center space-x-2",
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "checkbox",
                          value: option.value,
                          checked: (_a2 = newStudent.intolerancia_religion) == null ? void 0 : _a2.includes(option.value),
                          onChange: (e) => {
                            const isChecked = e.target.checked;
                            const currentSelections = newStudent.intolerancia_religion || [];
                            setNewStudent({
                              ...newStudent,
                              intolerancia_religion: isChecked ? [...currentSelections, option.value] : currentSelections.filter((item) => item !== option.value)
                            });
                          },
                          className: "form-checkbox"
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { children: option.label })
                    ]
                  },
                  option.value
                );
              }) }),
              ((_a = newStudent.intolerancia_religion) == null ? void 0 : _a.includes("otros")) && /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  name: "otros",
                  placeholder: "Especificar otras intolerancias",
                  className: "w-full p-2 border rounded mt-2",
                  onChange: (e) => {
                    const otrosValue = e.target.value;
                    e.preventDefault();
                    setNewStudent({
                      ...newStudent,
                      intolerancia_religion: [
                        ...newStudent.intolerancia_religion.filter(
                          (item) => item !== "otros"
                        ),
                        otrosValue
                      ]
                    });
                  }
                }
              ),
              /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    name: "beca",
                    checked: newStudent.beca,
                    onChange: handleInputChange,
                    className: "mr-2"
                  }
                ),
                "Beca"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleAddStudent,
                    className: "bg-blue-500 text-white px-4 py-2 rounded",
                    children: "Guardar"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setIsAddingStudent(false),
                    className: "bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded",
                    children: "Cancelar"
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
};
function AddEditClassModal({ onSave, onClose, classData }) {
  const [name, setName] = useState((classData == null ? void 0 : classData.name) || "");
  const [academicYear, setAcademicYear] = useState((classData == null ? void 0 : classData.academicYear) || "");
  const handleSubmit = (e) => {
    console.log("Clikao");
    e.preventDefault();
    onSave({ name, academicYear });
  };
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-6 w-96", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4", children: classData ? "Editar Clase" : "Añadir Nueva Clase" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Nombre de la Clase" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "border p-2 rounded w-full",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Año Académico" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: academicYear,
            onChange: (e) => setAcademicYear(e.target.value),
            className: "border p-2 rounded w-full",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end space-x-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "px-4 py-2 border rounded",
            children: "Cancelar"
          }
        ),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-500 text-white rounded", children: "Guardar" })
      ] })
    ] })
  ] }) });
}
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
    case "TOGGLE_ASSIGNMENT":
      return state.map(
        (cls) => cls.id === action.payload.classId ? {
          ...cls,
          estudiantes: cls.estudiantes.map(
            (student) => student.id === action.payload.studentId ? {
              ...student,
              asignado: !student.asignado,
              loading: action.payload.loading || false
            } : student
          )
        } : cls
      );
    case "UPDATE_STUDENT":
      return state.map(
        (cls) => cls.id === action.payload.classId ? {
          ...cls,
          estudiantes: cls.estudiantes.map(
            (student) => student.id === action.payload.updatedStudent.id ? action.payload.updatedStudent : student
          )
        } : cls
      );
    default:
      return state;
  }
};
function ClaseManagement() {
  const [classes, dispatch] = useReducer(classesReducer, []);
  const [openClassId, setOpenClassId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  useEffect(() => {
    if (!isEditModalOpen) {
      setEditingClass(null);
      setSelectedStudent(null);
    }
  }, [isEditModalOpen]);
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await csrfFetch("/api/classes");
        const data = await response.json();
        dispatch({ type: "SET_CLASSES", payload: data });
      } catch (error2) {
        setError("No se pudieron cargar las clases");
        console.error(error2);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);
  const handleToggleClass = (classId) => {
    setOpenClassId(openClassId === classId ? null : classId);
  };
  const handleAddClass = async (classData) => {
    try {
      const response = await csrfFetch("/api/classes/new", {
        method: "POST",
        body: JSON.stringify({
          nombre: classData.name,
          curso_academico: classData.academicYear
        })
      });
      if (!response.ok) throw new Error("Error al añadir la clase");
      const newClass = await response.json();
      dispatch({ type: "ADD_CLASS", payload: newClass });
      setIsAddingClass(false);
    } catch (error2) {
      setError("No se pudo añadir la clase");
      console.error(error2);
    }
  };
  const handleEditClass = async (updatedClass) => {
    try {
      const response = await csrfFetch(`/api/classes/${updatedClass.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedClass)
      });
      if (!response.ok) throw new Error("Error al editar la clase");
      dispatch({ type: "UPDATE_CLASS", payload: updatedClass });
      setEditingClass(null);
      setIsEditModalOpen(false);
    } catch (error2) {
      setError("No se pudo editar la clase");
      console.error(error2);
    }
  };
  const handleEditStudent = async (updatedStudent) => {
    try {
      const response = await csrfFetch(`/api/students/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent)
      });
      if (!response.ok) throw new Error("Error al actualizar el estudiante");
      dispatch({ type: "UPDATE_STUDENT", payload: updatedStudent });
    } catch (error2) {
      console.error("Error al guardar el estudiante:", error2);
    }
  };
  const handleDeleteClass = async (classId) => {
    try {
      const response = await csrfFetch(`/api/classes/${classId}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Error al eliminar la clase");
      dispatch({ type: "DELETE_CLASS", payload: classId });
    } catch (error2) {
      setError("No se pudo eliminar la clase");
      console.error(error2);
    }
  };
  const toggleAssignment = async (classId, studentId) => {
    try {
      const response = await csrfFetch(`/api/students/${studentId}/toggle-assignment`, {
        method: "PATCH"
      });
      if (!response.ok) throw new Error("Error al guardar el cambio en el backend");
      const updatedStudent = await response.json();
      dispatch({
        type: "UPDATE_STUDENT",
        payload: {
          classId,
          updatedStudent
        }
      });
    } catch (error2) {
      console.error("Error al asignar/desasignar en el backend:", error2);
    }
  };
  const filteredClasses = classes.filter(
    (cls) => {
      var _a, _b;
      return ((_a = cls.nombre) == null ? void 0 : _a.toLowerCase().includes(searchTerm.toLowerCase())) || ((_b = cls.estudiantes) == null ? void 0 : _b.some(
        (estudiante) => {
          var _a2;
          return (_a2 = estudiante.nombre) == null ? void 0 : _a2.toLowerCase().includes(searchTerm.toLowerCase());
        }
      ));
    }
  );
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8 p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-gray-800 dark:text-white", children: "Gestión de Clases" }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-500 text-white p-2 rounded", children: error }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscar clases o alumnos...",
            className: "pl-10 pr-4 py-2 border rounded-lg",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsAddingClass(true),
          className: "bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:inline ml-2", children: "Añadir Clase" })
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx(Spinner, {}) : filteredClasses.length > 0 ? filteredClasses.map((classData) => /* @__PURE__ */ jsx(
      ClassItem,
      {
        classData,
        isOpen: openClassId === classData.id,
        onToggle: () => handleToggleClass(classData.id),
        onEdit: (classData2) => {
          setEditingClass(classData2);
          setIsEditModalOpen(true);
        },
        onDelete: handleDeleteClass,
        toggleAssignment: (studentId) => toggleAssignment(classData.id, studentId)
      },
      classData.id
    )) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-500", children: "No hay clases disponibles" }),
    isAddingClass && /* @__PURE__ */ jsx(
      AddEditClassModal,
      {
        onSave: handleAddClass,
        onClose: () => setIsAddingClass(false)
      }
    ),
    isEditModalOpen && editingClass && /* @__PURE__ */ jsx(
      AddEditClassModal,
      {
        isOpen: isEditModalOpen,
        onClose: () => setIsEditModalOpen(false),
        onSave: handleEditClass,
        title: "Editar Clase",
        initialData: editingClass
      }
    ),
    isEditModalOpen && selectedStudent && /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isEditModalOpen,
        onClose: () => setIsEditModalOpen(false),
        onSave: (updatedStudent) => handleEditStudent(updatedStudent),
        title: "Editar Estudiante",
        initialData: selectedStudent
      }
    )
  ] }) });
}
const Clases = () => {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(ClaseManagement, {}) });
};
export {
  Clases as default
};
