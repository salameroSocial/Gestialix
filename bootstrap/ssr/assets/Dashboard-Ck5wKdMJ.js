import { jsxs, jsx } from "react/jsx-runtime";
import "react";
function Dashboard() {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold", children: "Bienvenido al Panel de Administración" }),
    /* @__PURE__ */ jsx("p", { className: "mt-4", children: "Aquí puedes gestionar usuarios, roles, y configuraciones." })
  ] });
}
export {
  Dashboard as default
};
