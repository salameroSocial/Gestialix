import { jsx } from "react/jsx-runtime";
import axios from "axios";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
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
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.jsx`,
    /* @__PURE__ */ Object.assign({ "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-Ck5wKdMJ.js"), "./Pages/Admin/Users/Edit.jsx": () => import("./assets/Edit-CWlwUTDU.js"), "./Pages/Admin/Users/Index.jsx": () => import("./assets/Index-D4bcYvAD.js"), "./Pages/AsistenciasManagement/AttendanceCrud.jsx": () => import("./assets/AttendanceCrud--KyHDKS5.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-DErc_Q5J.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-e_1wEY2k.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-9XEKNqkB.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-yirkjRtk.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-BSkZVBZi.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-V-5uwRBv.js"), "./Pages/ClasesManagement/Clases.jsx": () => import("./assets/Clases-CQ7cp9mQ.js"), "./Pages/ClasesManagement/Show.jsx": () => import("./assets/Show-DEVkfsRB.js"), "./Pages/CopyWelcome.jsx": () => import("./assets/CopyWelcome-ByNhCfvu.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-umB85uvT.js"), "./Pages/Dashboard/Index.jsx": () => import("./assets/Index-BrUmeFz3.js"), "./Pages/Index.jsx": () => import("./assets/Index-Dx5LaNnK.js"), "./Pages/Inicio.jsx": () => import("./assets/Inicio-DK29dvtP.js"), "./Pages/Landing.jsx": () => import("./assets/Landing-CQS4tdRm.js"), "./Pages/ListaComedor.jsx": () => import("./assets/ListaComedor-Zk6gLoCE.js"), "./Pages/Menus/Create.jsx": () => import("./assets/Create-CJq7rJ25.js"), "./Pages/Menus/Edit.jsx": () => import("./assets/Edit-DQzCA2ju.js"), "./Pages/Menus/Index.jsx": () => import("./assets/Index-Bey5-MEC.js"), "./Pages/Navbar.jsx": () => import("./assets/Navbar-Bcl58Nfk.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-CfDkqpQW.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-D2xBGxMS.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-Ba_w9WZM.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-CexUeXs4.js"), "./Pages/Settings/Ajustes.jsx": () => import("./assets/Ajustes-MFLVo2Ay.js"), "./Pages/Terminos/Terminos.jsx": () => import("./assets/Terminos-CcIwL_qt.js"), "./Pages/Terminos/Terms.jsx": () => import("./assets/Terms-DBaExGa1.js"), "./Pages/Test.jsx": () => import("./assets/Test-1lKSrcdZ.js"), "./Pages/TwoFactorAuthentication.jsx": () => import("./assets/TwoFactorAuthentication-DPOgaFwR.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-Potcq3-H.js") })
  ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(/* @__PURE__ */ jsx(App, { ...props }));
  },
  progress: {
    color: "#4B5563"
  }
});
