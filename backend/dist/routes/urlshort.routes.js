"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const url_controller_1 = require("../controller/url.controller");
const router = express_1.default.Router();
router.post('/', authentication_1.authenticateToken, url_controller_1.saveUrl);
router.get('/', authentication_1.authenticateToken, url_controller_1.getUserUrls);
router.delete('/:id', authentication_1.authenticateToken, url_controller_1.deleteUrl);
router.put('/:id', authentication_1.authenticateToken, url_controller_1.updateUrl);
router.get('/stats/user', authentication_1.authenticateToken, url_controller_1.getStats);
exports.default = router;
