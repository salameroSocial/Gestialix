import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { router } from "@inertiajs/react";
function Show({ clase }) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pago, setPago] = useState(false);
  const [intoleranciaReligion, setIntoleranciaReligion] = useState("");
  const [beca, setBeca] = useState(false);
  const handleAddStudent = (e) => {
    e.preventDefault();
    router.post(`/estudiantes`, {
      nombre,
      apellidos,
      clase_id: clase.id,
      pago,
      intolerancia_religion: intoleranciaReligion,
      beca
    }, {
      onSuccess: () => {
        setNombre("");
        setApellidos("");
        setPago(false);
        setIntoleranciaReligion("");
        setBeca(false);
      }
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold mb-4", children: [
      "Clase: ",
      clase.nombre
    ] }),
    /* @__PURE__ */ jsxs("h2", { className: "text-xl mb-4", children: [
      "Curso Académico: ",
      clase.curso_academico
    ] }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Estudiantes" }),
    /* @__PURE__ */ jsx("ul", { className: "mb-4", children: clase.estudiantes.map((estudiante) => /* @__PURE__ */ jsxs("li", { className: "mb-2", children: [
      estudiante.nombre,
      " ",
      estudiante.apellidos
    ] }, estudiante.id)) }),
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Añadir Estudiante" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleAddStudent, className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: nombre,
            onChange: (e) => setNombre(e.target.value),
            className: "border p-2 rounded w-full",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Apellidos" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: apellidos,
            onChange: (e) => setApellidos(e.target.value),
            className: "border p-2 rounded w-full",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Pago Realizado" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: pago,
            onChange: (e) => setPago(e.target.checked),
            className: "border p-2 rounded"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Intolerancia/Restricción" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: intoleranciaReligion,
            onChange: (e) => setIntoleranciaReligion(e.target.value),
            className: "border p-2 rounded w-full"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium", children: "Beca" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: beca,
            onChange: (e) => setBeca(e.target.checked),
            className: "border p-2 rounded"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-blue-500 text-white px-4 py-2 rounded",
          children: "Añadir Estudiante"
        }
      )
    ] })
  ] });
}
export {
  Show as default
};
