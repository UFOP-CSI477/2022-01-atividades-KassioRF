"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cidadesRouter = void 0;
const express_1 = require("express");
const GetAllCidade_1 = require("../controller/cidade/GetAllCidade");
const GetByIdCidade_1 = require("../controller/cidade/GetByIdCidade");
const cidadesRouter = (0, express_1.Router)();
exports.cidadesRouter = cidadesRouter;
const getAllCidade = new GetAllCidade_1.GetAllCidade();
const getByIdCidade = new GetByIdCidade_1.GetByIdCidade();
cidadesRouter.get('/cidades', getAllCidade.handle);
cidadesRouter.get('/cidades/:id', getByIdCidade.handle);
//# sourceMappingURL=cidades.js.map