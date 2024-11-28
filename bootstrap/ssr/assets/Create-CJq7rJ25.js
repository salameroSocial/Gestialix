import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import "@inertiajs/inertia-react";
import { B as Button } from "./Buttons-D9lSxtz5.js";
import "lucide-react";
import "framer-motion";
function MenuForm({ menu = {} }) {
  const [formData, setFormData] = useState({
    name: menu.name || "",
    description: menu.description || "",
    date: menu.date || ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (menu.id) {
      Inertia.put(route("menus.update", menu.id), formData);
    } else {
      Inertia.post(route("menus.store"), formData);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4 bg-green-200 max-w-md rounded-lg", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold mb-4", children: menu.id ? "Editar Menú" : "Añadir Menú" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            name: "name",
            value: formData.name,
            onChange: handleChange,
            required: true,
            className: "input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Descripción" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            name: "description",
            value: formData.description,
            onChange: handleChange,
            className: "input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-700", children: "Fecha" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "date",
            name: "date",
            value: formData.date,
            onChange: handleChange,
            required: true,
            className: "input"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(Button, { type: "submit", text: menu.id ? "Guardar Cambios" : "Crear Menú" })
    ] })
  ] });
}
export {
  MenuForm as default
};
