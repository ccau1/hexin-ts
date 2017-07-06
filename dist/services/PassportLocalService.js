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
var UsersService_1 = require("./UsersService");
var Passport = require("passport");
var passport_local_1 = require("passport-local");
var PassportLocalService = (function () {
    function PassportLocalService(usersService) {
        var _this = this;
        this.usersService = usersService;
        this.onLocalLogin = function (req, email, password, done) {
            //$log.debug('LocalLogin', login, password);
            var user = _this.usersService.findByCredential(email, password);
            if (!user) {
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            // all is well, return successful user
            return done(null, user);
        };
        // used to serialize the user for the session
        Passport.serializeUser(PassportLocalService_1.serialize);
        // used to deserialize the user
        Passport.deserializeUser(this.deserialize.bind(this));
    }
    PassportLocalService_1 = PassportLocalService;
    PassportLocalService.prototype.middlewareInitialize = function () {
        return Passport.initialize();
    };
    PassportLocalService.prototype.middlewareSession = function (options) {
        return Passport.session(options);
    };
    /**
     *
     * @param user
     * @param done
     */
    PassportLocalService.serialize = function (user, done) {
        done(null, user._id);
    };
    /**
     *
     * @param id
     * @param done
     */
    PassportLocalService.prototype.deserialize = function (id, done) {
        done(null, this.usersService.find(id));
    };
    ;
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    PassportLocalService.prototype.initLocalSignup = function () {
        var _this = this;
        Passport
            .use('signup', new passport_local_1.Strategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function (req, email, password, done) {
            console.log('LOCAL SIGNUP', email, password);
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {
                _this.onLocalSignup(req, email, password, done);
            });
        }));
    };
    PassportLocalService.prototype.onLocalSignup = function (req, email, password, done) {
        var user = this.usersService.findByEmail(email);
        if (user) {
            return done(null, false);
        }
        // Create new User
        var newUser = this.usersService.create({
            email: email,
            password: password,
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });
        done(null, newUser);
    };
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    PassportLocalService.prototype.initLocalLogin = function () {
        Passport.use('login', new passport_local_1.Strategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, this.onLocalLogin));
    };
    PassportLocalService = PassportLocalService_1 = __decorate([
        ts_express_decorators_1.Service(),
        __metadata("design:paramtypes", [UsersService_1.default])
    ], PassportLocalService);
    return PassportLocalService;
    var PassportLocalService_1;
}());
exports.default = PassportLocalService;
//# sourceMappingURL=PassportLocalService.js.map