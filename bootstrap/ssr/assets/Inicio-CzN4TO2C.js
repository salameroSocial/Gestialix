import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Search, User, ClipboardCheck, Calendar, BookOpen } from "lucide-react";
import { A as AppLayout } from "./AppLayout-DNQewRVV.js";
import { c as csrfFetch } from "./csrfFetch-DJvw9o1x.js";
import "@inertiajs/inertia";
import "./apiClient-DgzgG0IP.js";
import "axios";
const DashboardCard = ({ title, value, icon: Icon, color }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center", children: [
  /* @__PURE__ */ jsx("div", { className: `p-4 rounded-full mr-4 ${color}`, children: /* @__PURE__ */ jsx(Icon, { className: "w-6 h-6 text-white" }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: value })
  ] })
] });
const RecentActivity = ({ activities }) => /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md p-6", children: [
  /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4", children: "Actividad Reciente" }),
  /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: activities.map((activity, index) => /* @__PURE__ */ jsxs("li", { className: "flex items-center space-x-3", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-2 h-2 bg-indigo-500 rounded-full" }),
    /* @__PURE__ */ jsxs("p", { className: "flex-1 text-gray-800 dark:text-gray-300", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: activity.action }),
      " - ",
      activity.client
    ] }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-500 dark:text-gray-400", children: activity.time })
  ] }, index)) })
] });
const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const retrieveData = async () => {
    try {
      const response = await csrfFetch(`/api/activities`);
      if (!response.ok) throw new Error("Error al recuperar los datos");
      const data = await response.json();
      setSummaryData(data.summary || []);
      setRecentActivities(data.recentActivities || []);
    } catch (error) {
      console.error("Error al recuperar datos:", error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx("header", { className: "bg-white dark:bg-gray-800 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold text-gray-900 dark:text-gray-100", children: "Dashboard" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscar...",
            className: "bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          }
        ),
        /* @__PURE__ */ jsx(Search, { className: "w-5 h-5 text-gray-500 dark:text-gray-300 absolute left-3 top-2.5" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg\n                        :grid-cols-4", children: summaryData.map((item, index) => /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 rounded-lg shadow-md\n                                :p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-gray-100 dark:bg-gray-700 rounded-full p-2",
            children: /* @__PURE__ */ jsx("img", { src: item.icon, alt: item.title, className: "w-6 h-\n                                            6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-\n                                                200", children: item.title }),
          /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-gray-900 dark:text-gray-\n                                                100", children: item.value })
        ] })
      ] }) }, index)) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6", children: summaryData.map((item, index) => /* @__PURE__ */ jsx(
        DashboardCard,
        {
          title: item.nombre,
          value: item.apellidos,
          icon: item.icon,
          color: item.color
        },
        index
      )) }),
      /* @__PURE__ */ jsx(RecentActivity, { activities: recentActivities })
    ] }) }),
    /* @__PURE__ */ jsx(Inicio, {})
  ] }) });
};
function Inicio() {
  const features = [
    {
      title: "Gestión de Usuarios",
      description: "Administra fácilmente los usuarios de tu sistema.",
      icon: User,
      link: "/clases"
    },
    {
      title: "Asistencias",
      description: "Controla la asistencia de clases y reportes.",
      icon: ClipboardCheck,
      link: "/asistencias"
    },
    {
      title: "Calendario",
      description: "Consulta los eventos y actividades programadas.",
      icon: Calendar,
      link: "/clases"
    },
    {
      title: "Documentación",
      description: "Accede a manuales y tutoriales para ayudarte.",
      icon: BookOpen,
      link: "/terms"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-gray-100 dark:bg-gray-900", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-extrabold tracking-tight text-gray-800 dark:text-white sm:text-5xl text-center", children: "¡Bienvenido al Panel de Gestión!" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-gray-600 dark:text-gray-300 text-center", children: "Elige una sección para empezar a trabajar con tus datos." }),
    /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
      "a",
      {
        href: feature.link,
        className: "p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition duration-200 hover:scale-105 group",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-blue-900 rounded-full", children: /* @__PURE__ */ jsx(feature.icon, { className: "w-6 h-6 text-purple-500 dark:text-blue-300" }) }),
          /* @__PURE__ */ jsx("h3", { className: "mt-4 text-lg font-medium text-gray-800 dark:text-white group-hover:text-blue-500", children: feature.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: feature.description })
        ]
      },
      index
    )) })
  ] }) });
}
export {
  Inicio,
  Dashboard as default
};
