import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search, Check, X } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
function ComedorAttendance({ initialData }) {
  var _a;
  const [currentDay, setCurrentDay] = useState(days[0]);
  const [attendanceData, setAttendanceData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchAttendanceForDay = async (day) => {
      try {
        const response = await fetch(`/api/attendance?day=${day}`);
        const data = await response.json();
        setAttendanceData((prevData) => ({
          ...prevData,
          [day]: data
        }));
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };
    if (!attendanceData[currentDay]) {
      fetchAttendanceForDay(currentDay);
    }
  }, [currentDay, attendanceData]);
  const handlePrevDay = () => {
    const currentIndex = days.indexOf(currentDay);
    if (currentIndex > 0) {
      setCurrentDay(days[currentIndex - 1]);
    }
  };
  const handleNextDay = () => {
    const currentIndex = days.indexOf(currentDay);
    if (currentIndex < days.length - 1) {
      setCurrentDay(days[currentIndex + 1]);
    }
  };
  const handleAttendanceChange = (studentId, newStatus) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [currentDay]: prevData[currentDay].map(
        (student) => student.id === studentId ? { ...student, status: newStatus } : student
      )
    }));
    Inertia.put(`/api/attendance/${studentId}`, { status: newStatus });
  };
  const filteredStudents = (_a = attendanceData[currentDay]) == null ? void 0 : _a.filter(
    (student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 p-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-8 text-gray-800", children: "Lista de Asistencia al Comedor" }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6 bg-white rounded-lg shadow-md p-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handlePrevDay,
          className: "p-2 rounded-full hover:bg-gray-200 transition-colors",
          disabled: currentDay === days[0],
          children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex space-x-2", children: days.map((day) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentDay(day),
          className: `px-4 py-2 rounded-md transition-colors ${currentDay === day ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-200"}`,
          children: day
        },
        day
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleNextDay,
          className: "p-2 rounded-full hover:bg-gray-200 transition-colors",
          disabled: currentDay === days[days.length - 1],
          children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 relative", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Buscar por nombre o clase...",
          className: "w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 w-5 h-5 text-gray-400" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-md overflow-hidden", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 text-left", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Clase" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Asistencia" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-200", children: filteredStudents == null ? void 0 : filteredStudents.map((student) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: student.name }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: student.class }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleAttendanceChange(student.id, "present"),
              className: `p-2 rounded-full ${student.status === "present" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-green-100"}`,
              children: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleAttendanceChange(student.id, "absent"),
              className: `p-2 rounded-full ${student.status === "absent" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-red-100"}`,
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }) })
      ] }, student.id)) })
    ] }) })
  ] }) });
}
export {
  ComedorAttendance as default
};
