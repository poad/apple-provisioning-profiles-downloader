"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const filename = __filename;
const dirname = path_1.default.dirname(filename);
const utils = {
    filename,
    dirname
};
exports.default = utils;
//# sourceMappingURL=utils.cjs.map