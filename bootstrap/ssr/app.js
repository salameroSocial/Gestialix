import { jsx, jsxs } from "react/jsx-runtime";
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { createContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider as ThemeProvider$1 } from "@mui/material/styles/index.js";
import { CssBaseline } from "@mui/material";
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
if (csrfToken) {
  axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
} else {
  console.error("CSRF token not found. Check your Blade template.");
}
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#9c27b0"
    }
  }
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9"
    },
    secondary: {
      main: "#f48fb1"
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    }
  }
});
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const muiTheme = darkMode ? darkTheme : lightTheme;
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { darkMode, toggleTheme }, children: /* @__PURE__ */ jsxs(ThemeProvider$1, { theme: muiTheme, children: [
    /* @__PURE__ */ jsx(CssBaseline, {}),
    children
  ] }) });
};
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.jsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-Ck5wKdMJ.js"), "./Pages/Admin/Users/Edit.jsx": () => import("./assets/Edit-CWlwUTDU.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-D4bcYvAD.js"), "./Pages/AsistenciasManagement/AttendanceCrud.jsx": () => import("./assets/AttendanceCrud-DhOEQSJo.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-DErc_Q5J.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-e_1wEY2k.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-9XEKNqkB.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-yirkjRtk.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-BSkZVBZi.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-V-5uwRBv.js"), "./Pages/ClasesManagement/Clases.jsx": () => import("./assets/Clases-BWJm5wE3.js"), "./Pages/CopyWelcome.jsx": () => import("./assets/CopyWelcome-ByNhCfvu.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-umB85uvT.js"), "./Pages/Dashboard/Index.jsx": () => import("./assets/Index-CSL70Abi.js"), "./Pages/Index.jsx": () => import("./assets/Index-1l1KNZca.js"), "./Pages/Inicio.jsx": () => import("./assets/Inicio-D6URAAA9.js"), "./Pages/Landing.jsx": () => import("./assets/Landing-CQS4tdRm.js"), "./Pages/ListaComedor.jsx": () => import("./assets/ListaComedor-Zk6gLoCE.js"), "./Pages/Menus/Create.jsx": () => import("./assets/Create-CJq7rJ25.js"), "./Pages/Menus/Edit.jsx": () => import("./assets/Edit-DQzCA2ju.js"), "./Pages/Menus/Index.jsx": () => import("./assets/Index-Bey5-MEC.js"), "./Pages/Navbar.jsx": () => import("./assets/Navbar-B5FzGTyB.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-CfDkqpQW.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-D2xBGxMS.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-Ba_w9WZM.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-CexUeXs4.js"), "./Pages/Settings/Ajustes.jsx": () => import("./assets/Ajustes-ZvWwxb14.js"), "./Pages/Terminos/Terminos.jsx": () => import("./assets/Terminos-CcIwL_qt.js"), "./Pages/Terminos/Terms.jsx": () => import("./assets/Terms-DBaExGa1.js"), "./Pages/Test.jsx": () => import("./assets/Test-1lKSrcdZ.js"), "./Pages/TwoFactorAuthentication.jsx": () => import("./assets/TwoFactorAuthentication-DPOgaFwR.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-Potcq3-H.js") })
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(App, { ...props }) })
    );
  },
  progress: {
    color: "#4B5563"
  }
});
export {
  ThemeContext as T
};
