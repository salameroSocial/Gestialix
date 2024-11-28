import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import { A as AppLayout } from "./AppLayout-RoKqJet7.js";
import "lucide-react";
import "./apiClient-DgzgG0IP.js";
import "axios";
function Input({ label, ...props }) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsx("input", { className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500", ...props })
  ] });
}
function Button({ children, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: "w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
      ...props,
      children
    }
  );
}
function Label({ children, ...props }) {
  return /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", ...props, children });
}
function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    notifications_enabled: false,
    theme: "light"
    // Default theme
  });
  const [loading, setLoading] = useState(false);
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/user-profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error("Error actualizando perfil");
      const data = await response.json();
      toast.success("Perfil actualizado correctamente.");
      setForm(data);
    } catch (err) {
      toast.error("Ocurrió un error al actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto py-10 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-8", children: "Ajustes" }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white shadow sm:rounded-lg p-6 mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Información del Usuario" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: updateProfile, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nombre" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              name: "name",
              value: form.name,
              onChange: handleChange,
              type: "text",
              autoComplete: "name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Correo Electrónico" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              name: "email",
              value: form.email,
              onChange: handleChange,
              type: "email",
              autoComplete: "email"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("label", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              name: "notifications_enabled",
              checked: form.notifications_enabled,
              onChange: handleChange,
              className: "form-checkbox h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Habilitar notificaciones" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: loading, children: loading ? "Guardando..." : "Guardar Cambios" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white shadow sm:rounded-lg p-6 mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Preferencias" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "theme", children: "Tema" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "theme",
            name: "theme",
            value: form.theme,
            onChange: handleChange,
            className: "border rounded-lg p-2 w-full",
            children: [
              /* @__PURE__ */ jsx("option", { value: "light", children: "Claro" }),
              /* @__PURE__ */ jsx("option", { value: "dark", children: "Oscuro" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white shadow sm:rounded-lg p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "Seguridad" }),
      /* @__PURE__ */ jsx(Button, { onClick: () => Inertia.visit("/password/reset"), children: "Cambiar Contraseña" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-8 text-sm text-gray-500 text-center", children: /* @__PURE__ */ jsxs("p", { children: [
      /* @__PURE__ */ jsx("a", { href: "/privacy-policy", className: "text-blue-500 hover:underline", children: "Política de Privacidad" }),
      " ",
      "|",
      " ",
      /* @__PURE__ */ jsx("a", { href: "/terms-of-service", className: "text-blue-500 hover:underline", children: "Términos de Servicio" })
    ] }) })
  ] });
}
function Ajustes() {
  return /* @__PURE__ */ jsx(AppLayout, { children: /* @__PURE__ */ jsx(Settings, {}) });
}
export {
  Ajustes as default
};
