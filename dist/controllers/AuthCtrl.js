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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_httpexceptions_1 = require("ts-httpexceptions");
var Express = require("express");
var ts_express_decorators_1 = require("ts-express-decorators");
var PassportLocalService_1 = require("../services/PassportLocalService");
var Passport = require("passport");
var RestCtrl = (function () {
    function RestCtrl(passportLocalService) {
        this.passportLocalService = passportLocalService;
        passportLocalService.initLocalSignup();
        passportLocalService.initLocalLogin();
    }
    /**
     * Authenticate user with local info (in Database).
     * @param email
     * @param password
     * @param request
     * @param response
     * @param next
     */
    RestCtrl.prototype.login = function (email, password, request, response, next) {
        console.log('resquest.cookies', request.cookies);
        return new Promise(function (resolve, reject) {
            try {
                Passport
                    .authenticate('login', function (err, user) {
                    if (err) {
                        reject(err);
                    }
                    request.logIn(user, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve(user);
                    });
                })(request, response, next);
            }
            catch (er) {
                console.error(er);
            }
        })
            .catch(function (err) {
            if (err && err.message === "Failed to serialize user into session") {
                throw new ts_httpexceptions_1.NotFound('user not found');
            }
            return Promise.reject(err);
        });
    };
    /**
     * Try to register new account
     * @param request
     * @param response
     * @param next
     */
    RestCtrl.prototype.signup = function (request, response, next) {
        return new Promise(function (resolve, reject) {
            Passport.authenticate('signup', function (err, user) {
                if (err) {
                    reject(err);
                }
                if (!user) {
                    reject(!!err);
                }
                request.logIn(user, function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(user);
                });
            })(request, response, next);
        });
    };
    RestCtrl.prototype.testAuth = function () {
        return true;
    };
    /**
     * Disconnect user
     * @param request
     */
    RestCtrl.prototype.logout = function (request) {
        request.logout();
        return "Disconnected";
    };
    __decorate([
        ts_express_decorators_1.Post('/login'),
        __param(0, ts_express_decorators_1.Required()), __param(0, ts_express_decorators_1.BodyParams('email')),
        __param(1, ts_express_decorators_1.Required()), __param(1, ts_express_decorators_1.BodyParams('password')),
        __param(2, ts_express_decorators_1.Request()),
        __param(3, ts_express_decorators_1.Response()),
        __param(4, ts_express_decorators_1.Next()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], RestCtrl.prototype, "login", null);
    __decorate([
        ts_express_decorators_1.Post('/signup'),
        __param(0, ts_express_decorators_1.Request()),
        __param(1, ts_express_decorators_1.Response()),
        __param(2, ts_express_decorators_1.Next()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], RestCtrl.prototype, "signup", null);
    __decorate([
        ts_express_decorators_1.Get('/test-auth'),
        ts_express_decorators_1.Authenticated(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], RestCtrl.prototype, "testAuth", null);
    __decorate([
        ts_express_decorators_1.Get('/logout'),
        __param(0, ts_express_decorators_1.Request()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], RestCtrl.prototype, "logout", null);
    RestCtrl = __decorate([
        ts_express_decorators_1.Controller("/auth"),
        __metadata("design:paramtypes", [PassportLocalService_1.default])
    ], RestCtrl);
    return RestCtrl;
}());
exports.RestCtrl = RestCtrl;
//# sourceMappingURL=AuthCtrl.js.map