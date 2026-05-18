"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feed_controller_1 = require("../controllers/feed.controller");
const router = (0, express_1.Router)();
router.get('/', feed_controller_1.getFeedsHandler);
router.post('/', feed_controller_1.createFeedHandler);
exports.default = router;
//# sourceMappingURL=feed.routes.js.map