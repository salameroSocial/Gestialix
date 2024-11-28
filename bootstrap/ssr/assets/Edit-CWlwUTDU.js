import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Link } from "@inertiajs/react";
function EditUser({ user, roles }) {
  const { data, setData, put, errors } = useForm({
    roles: user.roles.map((role) => role.name)
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/admin/users/${user.id}`);
  };
  return /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Editar Usuario" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: "Roles" }),
        roles.map((role) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              value: role.name,
              checked: data.roles.includes(role.name),
              onChange: (e) => {
                if (e.target.checked) {
                  setData("roles", [...data.roles, role.name]);
                } else {
                  setData("roles", data.roles.filter((r) => r !== role.name));
                }
              }
            }
          ),
          /* @__PURE__ */ jsx("span", { children: role.name })
        ] }) }, role.id)),
        errors.roles && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: errors.roles })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",
          children: "Guardar Cambios"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/admin/users",
          className: "ml-4 text-gray-500 hover:underline",
          children: "Cancelar"
        }
      )
    ] })
  ] });
}
export {
  EditUser as default
};
