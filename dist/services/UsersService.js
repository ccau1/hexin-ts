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
var MemoryStorage_1 = require("./MemoryStorage");
var UsersService = (function () {
    function UsersService(memoryStorage) {
        this.memoryStorage = memoryStorage;
        this.memoryStorage.set('users', require('../../resources/users.json'));
    }
    /**
     * Find a user by his ID.
     * @param id
     * @returns {undefined|IUser}
     */
    UsersService.prototype.find = function (id) {
        var users = this.query();
        return users.find(function (value) { return value._id === id; });
    };
    UsersService.prototype.findByEmail = function (email) {
        var users = this.query();
        return users.find(function (value) { return value.email === email; });
    };
    UsersService.prototype.findByCredential = function (email, password) {
        var users = this.query();
        return users.find(function (value) { return value.email === email && value.password === password; });
    };
    /**
     * Create a new User
     * @param name
     * @returns {{id: any, name: string}}
     */
    UsersService.prototype.create = function (user) {
        user._id = require('node-uuid').v4();
        var users = this.memoryStorage.get('users');
        users.push(user);
        this.memoryStorage.set('users', users);
        return user;
    };
    /**
     *
     * @returns {IUser[]}
     */
    UsersService.prototype.query = function () {
        return this.memoryStorage.get("users");
    };
    /**
     *
     * @param user
     * @returns {IUser}
     */
    UsersService.prototype.update = function (user) {
        var users = this.query();
        var index = users.findIndex(function (value) { return value._id === user._id; });
        users[index] = user;
        this.memoryStorage.set('users', users);
        return user;
    };
    UsersService = __decorate([
        ts_express_decorators_1.Service(),
        __metadata("design:paramtypes", [MemoryStorage_1.default])
    ], UsersService);
    return UsersService;
}());
exports.default = UsersService;
//# sourceMappingURL=UsersService.js.map