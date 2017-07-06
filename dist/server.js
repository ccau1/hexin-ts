"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Path = require("path");
var rootDir = Path.resolve(__dirname);
var PassportLocalService_1 = require("./services/PassportLocalService");
var Server = (function (_super) {
    __extends(Server, _super);
    function Server() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Server_1 = Server;
    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    Server.prototype.$onMountingMiddlewares = function (passportService) {
        var morgan = require('morgan'), cookieParser = require('cookie-parser'), bodyParser = require('body-parser'), compress = require('compression'), session = require('express-session'), methodOverride = require('method-override');
        this
            .use(morgan('dev'))
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
            extended: true
        }))
            .use(session({
            secret: 'mysecretkey',
            resave: true,
            saveUninitialized: true,
            maxAge: 36000,
            cookie: {
                path: '/',
                httpOnly: true,
                secure: false,
                maxAge: null
            }
        }))
            .use(passportService.middlewareInitialize())
            .use(passportService.middlewareSession());
        return null;
    };
    Server.prototype.$onAuth = function (request, response, next) {
        /// request.isAuthenticated() is provided by passport.js. You can implements other library
        next(request.isAuthenticated());
    };
    Server.prototype.$onReady = function () {
        console.log('Server started...');
    };
    Server.prototype.$onServerInitError = function (err) {
        console.error(err);
    };
    Server.Initialize = function () { return new Server_1().start(); };
    __decorate([
        ts_express_decorators_1.Inject(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [PassportLocalService_1.default]),
        __metadata("design:returntype", Object)
    ], Server.prototype, "$onMountingMiddlewares", null);
    Server = Server_1 = __decorate([
        ts_express_decorators_1.ServerSettings({
            rootDir: rootDir,
            mount: {
                '/api': rootDir + "/controllers/**/**.js"
            },
            httpPort: 8080,
            httpsPort: 8000,
            acceptMimes: ['application/json'],
            componentsScan: [
                rootDir + "/services/**/**.js",
                rootDir + "/middlewares/**/**.js"
            ]
        })
    ], Server);
    return Server;
    var Server_1;
}(ts_express_decorators_1.ServerLoader));
exports.Server = Server;
Server.Initialize();
//# sourceMappingURL=server.js.map