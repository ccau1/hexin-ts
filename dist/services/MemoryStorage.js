"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_express_decorators_1 = require("ts-express-decorators");
var MemoryStorage = (function () {
    function MemoryStorage() {
        var _this = this;
        this.states = new Map();
        /**
         * Serialize value and store it.
         * @param key
         * @param value
         */
        this.set = function (key, value) { return _this.states.set(key, JSON.stringify(value)); };
    }
    /**
     * Return the value stored.
     * @param key
     */
    MemoryStorage.prototype.get = function (key) {
        return JSON.parse(this.states.get(key));
    };
    MemoryStorage = __decorate([
        ts_express_decorators_1.Service(),
        __metadata("design:paramtypes", [])
    ], MemoryStorage);
    return MemoryStorage;
}());
exports.default = MemoryStorage;
//# sourceMappingURL=MemoryStorage.js.map