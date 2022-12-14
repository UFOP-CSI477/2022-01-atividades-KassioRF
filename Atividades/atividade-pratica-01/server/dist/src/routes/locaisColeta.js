"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localColetaRouter = void 0;
const express_1 = require("express");
const CreateLocalColeta_1 = require("../controller/locaisColeta/CreateLocalColeta");
const GetAllLocalColeta_1 = require("../controller/locaisColeta/GetAllLocalColeta");
const GetByIdLocalColeta_1 = require("../controller/locaisColeta/GetByIdLocalColeta");
const UpdateLocalColeta_1 = require("../controller/locaisColeta/UpdateLocalColeta");
const DeleteLocalColeta_1 = require("../controller/locaisColeta/DeleteLocalColeta");
const localColetaRouter = (0, express_1.Router)();
exports.localColetaRouter = localColetaRouter;
const createLocalColeta = new CreateLocalColeta_1.CreateLocalColeta();
const getAllLocalColeta = new GetAllLocalColeta_1.GetAllLocalColeta();
const getByIdLocalColeta = new GetByIdLocalColeta_1.GetByIdLocalColeta();
const updateLocalColeta = new UpdateLocalColeta_1.UpdateLocalColeta();
const deleteLocalColeta = new DeleteLocalColeta_1.DeleteLocalColeta();
localColetaRouter.post('/localColeta', createLocalColeta.handle);
localColetaRouter.get('/localColeta', getAllLocalColeta.handle);
localColetaRouter.get('/localColeta/:id', getByIdLocalColeta.handle);
localColetaRouter.put('/localColeta/:id', updateLocalColeta.handle);
localColetaRouter.delete('/localColeta/:id', deleteLocalColeta.handle);
//# sourceMappingURL=locaisColeta.js.map