"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.routes = ['/', '/login', '/sign-up', '/dashboard'];
exports.routeRequest = function (request, response) {
    var url = request.url;
    if (exports.routes.includes(url.trim())) {
        response.sendFile(path_1.default.join(__dirname, '/../public/build/index.html'));
    }
    else if (url.includes('/build')) {
        response.sendFile(path_1.default.join(__dirname, '/../public', url));
    }
    else {
        response.status(404).redirect('/');
    }
};
