import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { usePage, Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
function MenuIndex() {
  const { menus } = usePage().props;
  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este menú?")) {
      Inertia.delete(route("menus.destroy", id));
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: "Menús" }),
    /* @__PURE__ */ jsx(Link, { href: route("menus.create"), className: "btn btn-primary mb-4", children: "Añadir Menú" }),
    /* @__PURE__ */ jsx("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg", children: /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { children: "Descripción" }),
        /* @__PURE__ */ jsx("th", { children: "Fecha" }),
        /* @__PURE__ */ jsx("th", { children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: menus.map((menu) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: menu.name }),
        /* @__PURE__ */ jsx("td", { children: menu.description }),
        /* @__PURE__ */ jsx("td", { children: menu.date }),
        /* @__PURE__ */ jsxs("td", { children: [
          /* @__PURE__ */ jsx(Link, { href: route("menus.edit", menu.id), className: "btn btn-secondary mr-2", children: "Editar" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(menu.id), className: "btn btn-danger", children: "Eliminar" })
        ] })
      ] }, menu.id)) })
    ] }) })
  ] });
}
export {
  MenuIndex as default
};
