import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
function UserIndex({ users }) {
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Gestión de Usuarios" }),
    /* @__PURE__ */ jsxs("table", { className: "min-w-full bg-white shadow rounded-lg", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-3 text-left", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-left", children: "Roles" }),
        /* @__PURE__ */ jsx("th", { className: "p-3 text-left", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.data.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx("td", { className: "p-3", children: user.name }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: user.roles.map((role) => role.name).join(", ") }),
        /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsx(
          Link,
          {
            href: `/admin/users/${user.id}/edit`,
            className: "text-blue-500 hover:underline",
            children: "Editar"
          }
        ) })
      ] }, user.id)) })
    ] })
  ] });
}
export {
  UserIndex as default
};
