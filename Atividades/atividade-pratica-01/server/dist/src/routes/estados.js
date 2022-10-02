"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estadosRouter = void 0;
const express_1 = require("express");
const GetAllEstado_1 = require("../controller/estado/GetAllEstado");
const GetByIdEstado_1 = require("../controller/estado/GetByIdEstado");
const estadosRouter = (0, express_1.Router)();
exports.estadosRouter = estadosRouter;
const getAllEstado = new GetAllEstado_1.GetAllEstado();
const getByIdEstado = new GetByIdEstado_1.GetByIdEstado();
estadosRouter.get('/estados', getAllEstado.handle);
estadosRouter.get('/estados/:id', getByIdEstado.handle);
//# sourceMappingURL=estados.js.map