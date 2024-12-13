import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useContext, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { X, Menu, Sun, Moon, Home, BarChart, Users, List, Settings, HelpCircle, LogOut } from "lucide-react";
import { T as ThemeContext } from "../app.js";
import { a as apiClient } from "./apiClient-DgzgG0IP.js";
const MenuItem = ({ icon: Icon, label, isOpen, onClick }) => /* @__PURE__ */ jsxs(
  "li",
  {
    onClick,
    className: `flex items-center p-2 rounded-lg transition-all duration-300 ease-in-out cursor-pointer 
                    ${isOpen ? "hover:bg-gray-100 dark:hover:bg-gray-700" : "justify-center"}`,
    children: [
      /* @__PURE__ */ jsx(Icon, { className: `w-6 h-6 ${isOpen ? "mr-4" : ""} text-gray-600 dark:text-gray-300` }),
      isOpen && /* @__PURE__ */ jsx("span", { className: "text-gray-700 dark:text-gray-300", children: label })
    ]
  }
);
function SidebarMenu({ isOpen, toggleSidebar, userData }) {
  const [isMobile, setIsMobile] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navigateTo = (route) => {
    Inertia.visit(route);
    if (isMobile) toggleSidebar();
  };
  const handleLogout = () => {
    Inertia.post("/logout", {}, {
      onSuccess: () => console.log("Sesión cerrada exitosamente")
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out
                        ${isOpen ? "w-64" : "w-20"} ${isMobile && !isOpen ? "-translate-x-full" : ""}`,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleSidebar,
            className: `absolute top-4 -right-12 bg-white dark:bg-gray-900 p-2 rounded-full shadow-md transition-transform duration-300 ease-in-out
                            ${isOpen ? "rotate-180" : ""}`,
            "aria-label": isOpen ? "Cerrar menú" : "Abrir menú",
            children: isOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6 text-gray-600 dark:text-white" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6 text-gray-600 dark:text-gray-300" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: `flex items-center justify-center h-20 ${isOpen ? "px-4" : ""}`, children: /* @__PURE__ */ jsxs("a", { href: "/dashboard", target: "_blank", children: [
          /* @__PURE__ */ jsx("img", { src: "/images/logoGestialix.svg", alt: "Logo", className: "w-10 h-10" }),
          isOpen && /* @__PURE__ */ jsx("h1", { className: "ml-4 text-xl font-bold text-gray-700 dark:text-gray-300", children: "Gestialix" })
        ] }) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: toggleTheme,
            className: "mt-4 flex items-center justify-center text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out",
            children: [
              darkMode ? /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Moon, { className: "w-5 h-5" }),
              isOpen && /* @__PURE__ */ jsx("span", { className: "ml-2", children: darkMode ? "Modo Claro" : "Modo Oscuro" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("nav", { className: "flex-grow", children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 py-4", children: [
          /* @__PURE__ */ jsx(MenuItem, { icon: Home, label: "Inicio", isOpen, onClick: () => navigateTo("/inicio") }),
          /* @__PURE__ */ jsx(MenuItem, { icon: BarChart, label: "Panel de control", isOpen, onClick: () => navigateTo("/dashboard") }),
          /* @__PURE__ */ jsx(MenuItem, { icon: Users, label: "Clases", isOpen, onClick: () => navigateTo("/clases") }),
          /* @__PURE__ */ jsx(MenuItem, { icon: List, label: "Asistencias", isOpen, onClick: () => navigateTo("/asistencias") }),
          /* @__PURE__ */ jsx(MenuItem, { icon: Settings, label: "Configuración", isOpen, onClick: () => navigateTo("/settings") }),
          /* @__PURE__ */ jsx(MenuItem, { icon: HelpCircle, label: "Ayuda", isOpen, onClick: () => navigateTo("/terms") })
        ] }) }),
        /* @__PURE__ */ jsx(MenuItem, { icon: LogOut, label: "Cerrar sesión", isOpen, onClick: handleLogout }),
        /* @__PURE__ */ jsx("div", { className: `p-4 ${isOpen ? "text-center" : "flex justify-center"}`, children: isOpen ? /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "© 2024 Gestialix" }) : /* @__PURE__ */ jsx("span", { className: "w-2 h-2 bg-green-500 rounded-full" }) })
      ]
    }
  );
}
const fetchUserData = async () => {
  var _a;
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error al cargar datos del usuario:", error);
    if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
      console.error("No autenticado. Redirigiendo al login...");
      window.href = "/login";
    }
    return null;
  }
};
function Spinner({
  color = "blue",
  size = "md",
  showProgress = false,
  message
}) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (showProgress) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 101);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showProgress]);
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };
  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-4 h-4",
    lg: "w-6 h-6"
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen bg-gray-600", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", children: [
      /* @__PURE__ */ jsx("div", { className: `absolute rounded-full border-4 border-t-${color}-500 border-r-transparent border-b-${color}-500 border-l-transparent ${sizeClasses[size]} animate-spin` }),
      /* @__PURE__ */ jsx("div", { className: `absolute rounded-full border-4 border-t-transparent border-r-${color}-500 border-b-transparent border-l-${color}-500 ${sizeClasses[size]} animate-spin-reverse` }),
      /* @__PURE__ */ jsx("div", { className: `absolute bg-${color}-500 ${dotSizes[size]} rounded-full animate-pulse` }),
      showProgress && /* @__PURE__ */ jsxs("div", { className: "absolute text-sm font-semibold text-gray-700", children: [
        progress,
        "%"
      ] })
    ] }),
    message && /* @__PURE__ */ jsx("p", { className: "mt-4 text-gray-700 text-center max-w-xs", children: message })
  ] });
}
function AppLayout({ children }) {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  if (loading) {
    return /* @__PURE__ */ jsx(Spinner, {});
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen w-full bg-gray-100 dark:bg-gray-500", children: [
    /* @__PURE__ */ jsx(SidebarMenu, { isOpen: isSidebarOpen, toggleSidebar, userData }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `transition-all duration-300 w-full ${isSidebarOpen ? "sm:ml-64 md:ml-20 ml-0" : "sm:ml-20 ml-0"}`,
        children: [
          /* @__PURE__ */ jsx("header", { className: " bg-white shadow-md" }),
          /* @__PURE__ */ jsx("main", { children })
        ]
      }
    )
  ] });
}
export {
  AppLayout as A,
  Spinner as S
};
