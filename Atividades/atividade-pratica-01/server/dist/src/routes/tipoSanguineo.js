"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoSanguineoRouter = void 0;
const express_1 = require("express");
const GetAllTipoSanguineo_1 = require("../controller/tiposSanguineos/GetAllTipoSanguineo");
const tipoSanguineoRouter = (0, express_1.Router)();
exports.tipoSanguineoRouter = tipoSanguineoRouter;
const getAllTipoSanguineo = new GetAllTipoSanguineo_1.GetAllTipoSanguineo();
tipoSanguineoRouter.get('/tipoSanguineo', getAllTipoSanguineo.handle);
//# sourceMappingURL=tipoSanguineo.js.map