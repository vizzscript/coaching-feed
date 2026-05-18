"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const redis_1 = require("./config/redis");
const sockets_1 = require("./sockets");
const feed_routes_1 = __importDefault(require("./routes/feed.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
}));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
// Initialize external services
(0, db_1.connectDB)();
(0, redis_1.connectRedis)();
(0, sockets_1.initSocket)(httpServer);
// Routes
app.use('/api/feed', feed_routes_1.default);
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map