"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./config/environment");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const morgan_1 = require("./config/morgan");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(morgan_1.logger);
app.use(errorHandler_1.errorHandler);
if (!environment_1.config.DB_URL) {
    console.error('Database URL is not defined');
    process.exit(1);
}
mongoose_1.default.connect(environment_1.config.DB_URL)
    .then(() => {
    console.log('Database connected successfully');
})
    .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});
app.use('/api', bookRoutes_1.default);
const PORT = environment_1.config.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
