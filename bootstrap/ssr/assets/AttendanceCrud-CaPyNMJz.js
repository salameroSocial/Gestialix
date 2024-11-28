import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Spinner, A as AppLayout } from "./AppLayout-RoKqJet7.js";
import { ChevronLeft, Calendar, ChevronRight, Users, Search, Check, X } from "lucide-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "@inertiajs/inertia";
import "./apiClient-DgzgG0IP.js";
import "axios";
registerLocale("es", es);
const DataSelector = ({ currentDay, changeDate, handleDayChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    handleDayChange(formattedDate);
    setIsCalendarOpen(false);
  };
  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => changeDate(-1),
        className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6 text-gray-700 dark:text-gray-300" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center space-x-2 cursor-pointer",
          onClick: () => setIsCalendarOpen((prev) => !prev),
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "text-blue-500 dark:text-blue-400" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-800 dark:text-gray-200", children: new Date(currentDay).toLocaleDateString("es-ES") })
          ]
        }
      ),
      isCalendarOpen && /* @__PURE__ */ jsx("div", { className: "absolute mt-2 z-50", children: /* @__PURE__ */ jsx(
        DatePicker,
        {
          selected: new Date(currentDay),
          onChange: handleDateChange,
          inline: true,
          filterDate: isWeekday,
          locale: "es",
          className: "react-datepicker"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => changeDate(1),
        className: "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6 text-gray-700 dark:text-gray-300" })
      }
    )
  ] });
};
function Asistencia() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentDay, setCurrentDay] = useState((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchInitialData = async () => {
      var _a, _b, _c;
      try {
        setLoading(true);
        const classResponse = await fetch("/api/classes");
        if (!classResponse.ok) throw new Error("Error fetching classes");
        const classData = await classResponse.json();
        setClasses(classData);
        setSelectedClass(((_a = classData[0]) == null ? void 0 : _a.id) || null);
        if ((_b = classData[0]) == null ? void 0 : _b.id) {
          await fetchAttendanceData(currentDay, (_c = classData[0]) == null ? void 0 : _c.id);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);
  const fetchAttendanceData = async (date, classId) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/attendance-or-create?date=${date}&class_id=${classId}`);
      if (!response.ok) throw new Error("Error fetching attendance data");
      const data = await response.json();
      console.log("Data de atendancia: " + data);
      const updatedData = data.map((record) => ({
        ...record,
        asiste: record.asiste !== null ? record.asiste : 1
      }));
      setAttendanceData(updatedData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAttendanceChange = async (attendanceId, newStatus) => {
    try {
      const response = await fetch(`/api/attendance/${attendanceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ asiste: newStatus })
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setAttendanceData(
        (prevData) => prevData.map(
          (record) => record.id === attendanceId ? { ...record, asiste: newStatus } : record
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  const handleClassChange = async (classId) => {
    setSelectedClass(classId);
    await fetchAttendanceData(currentDay, classId);
  };
  const handleDayChange = async (newDate) => {
    setCurrentDay(newDate);
    if (!selectedClass) {
      console.warn("Selecciona una clase primero.");
      return;
    }
    await fetchAttendanceData(newDate, selectedClass);
  };
  const filteredStudents = attendanceData.filter(
    (record) => record.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || record.estudiante.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const changeDate = (days) => {
    let newDate = new Date(currentDay);
    do {
      newDate.setDate(newDate.getDate() + days);
    } while (newDate.getDay() === 0 || newDate.getDay() === 6);
    handleDayChange(newDate.toISOString().split("T")[0]);
  };
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  if (loading) return /* @__PURE__ */ jsx(
    Spinner,
    {
      color: "green",
      size: "lg"
    }
  );
  if (error) return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen bg-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative", role: "alert", children: [
    /* @__PURE__ */ jsx("strong", { className: "font-bold", children: "Error:" }),
    /* @__PURE__ */ jsxs("span", { className: "block sm:inline", children: [
      " ",
      error
    ] })
  ] }) });
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900 p-2", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8 text-gray-800 dark:text-gray-200", children: "Asistencia al Comedor" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(Users, { className: "text-blue-500 dark:text-blue-400" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: selectedClass || "",
              onChange: (e) => handleClassChange(e.target.value),
              className: "border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "Selecciona una clase" }),
                classes.map((cls) => /* @__PURE__ */ jsx("option", { value: cls.id, children: cls.nombre }, cls.id))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          DataSelector,
          {
            currentDay,
            changeDate,
            handleDayChange
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-auto", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Buscar estudiante...",
              className: "pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 w-full",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-gray-700", children: [
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Alumno" }),
          /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider", children: "Asistencia" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700", children: filteredStudents.map((record) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { className: "px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200", children: [
            /* @__PURE__ */ jsx("span", { className: "block sm:hidden", children: truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 16) }),
            /* @__PURE__ */ jsx("span", { className: "hidden sm:block", children: truncateText(`${record.estudiante.nombre} ${record.estudiante.apellidos}`, 40) })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleAttendanceChange(record.id, 1),
                className: `p-2 rounded-full transition-colors ${record.asiste === 1 ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-green-100 dark:bg-gray-700 dark:hover:bg-green-600"}`,
                children: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleAttendanceChange(record.id, 0),
                className: `p-2 rounded-full transition-colors ${record.asiste === 0 ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-red-100 dark:bg-gray-700 dark:hover:bg-red-600"}`,
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }) })
        ] }, record.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200", children: "Resumen de Asistencia" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-green-100 dark:bg-green-800 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-green-800 dark:text-green-300 font-medium", children: "Presentes" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: attendanceData.filter((record) => record.asiste === 1).length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-red-100 dark:bg-red-800 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-red-800 dark:text-red-300 font-medium", children: "Ausentes" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-red-600 dark:text-red-400", children: attendanceData.filter((record) => record.asiste === 0).length })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-gray-100 dark:bg-gray-700 p-4 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { className: "text-gray-800 dark:text-gray-300 font-medium", children: "Sin marcar" }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-600 dark:text-gray-400", children: attendanceData.filter((record) => record.asiste === null).length })
        ] })
      ] })
    ] })
  ] }) });
}
function ComedorAttendance() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Asistencia, {}) });
}
export {
  ComedorAttendance as default
};
