"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const main_1 = __importDefault(require("./routes/main"));
const tipoSanguineo_1 = require("./routes/tipoSanguineo");
const pessoas_1 = require("./routes/pessoas");
const estados_1 = require("./routes/estados");
const cidades_1 = require("./routes/cidades");
const locaisColeta_1 = require("./routes/locaisColeta");
// setup do server
const PORT = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//rotas
app.use(main_1.default);
app.use(tipoSanguineo_1.tipoSanguineoRouter);
app.use(pessoas_1.pessoasRouter);
app.use(estados_1.estadosRouter);
app.use(cidades_1.cidadesRouter);
app.use(locaisColeta_1.localColetaRouter);
// build server
app.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map