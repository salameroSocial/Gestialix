import { jsxs } from "react/jsx-runtime";
function Dashboard({ userData }) {
  var _a, _b, _c;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Bienvenido, ",
      ((_a = userData == null ? void 0 : userData.user) == null ? void 0 : _a.name) || "Usuario"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Roles: ",
      ((_b = userData == null ? void 0 : userData.roles) == null ? void 0 : _b.join(", ")) || "Sin roles"
    ] }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Permisos: ",
      ((_c = userData == null ? void 0 : userData.permissions) == null ? void 0 : _c.join(", ")) || "Sin permisos"
    ] })
  ] });
}
export {
  Dashboard as default
};
