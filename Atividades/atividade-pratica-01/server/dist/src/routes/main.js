"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mainRouter = (0, express_1.Router)();
mainRouter.get('/', (req, res) => {
    res.json({
        message: "Server is runnning =D"
    });
});
exports.default = mainRouter;
//# sourceMappingURL=main.js.map