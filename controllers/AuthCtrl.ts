import {NotFound} from "ts-httpexceptions";
import * as Express from "express";
import {Controller, Get, Post, Required, BodyParams, Request, Response, Next, Authenticated} from 'ts-express-decorators';
import PassportLocalService from '../services/PassportLocalService';
import {IUser} from '../services/UsersService';
import * as Passport from 'passport';
import Events = require('events');
import EventEmitter = NodeJS.EventEmitter;

@Controller("/auth")
export class RestCtrl {
  constructor(
    private passportLocalService: PassportLocalService
  ) {
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
    @Post('/login')
    public login(
        @Required() @BodyParams('email') email: string,
        @Required() @BodyParams('password') password: string,
        @Request() request: Express.Request & {logIn: Function, cookies: any},
        @Response() response: Express.Response,
        @Next() next: Express.NextFunction
    ) {
        console.log('resquest.cookies', request.cookies);

        return new Promise<IUser>((resolve, reject) => {

            try{
                Passport
                    .authenticate('login', (err, user: IUser) => {

                        if (err) {
                            reject(err);
                        }

                        request.logIn(user, (err) => {

                            if (err) {
                                reject(err);
                            }

                            resolve(user);
                        });

                    })(request, response, next);
            }catch (er){
                console.error(er);
            }
        })
            .catch((err) => {

                if (err && err.message === "Failed to serialize user into session") {
                  throw new NotFound('user not found');
                }

                return Promise.reject(err);
            });

    }

    /**
     * Try to register new account
     * @param request
     * @param response
     * @param next
     */
    @Post('/signup')
    public signup(
        @Request() request: Express.Request & {logIn: Function},
        @Response() response: Express.Response,
        @Next() next: Express.NextFunction
    ) {
        return new Promise((resolve, reject) =>  {

            Passport.authenticate('signup', (err, user: IUser) => {

                if(err){
                    reject(err);
                }

                if(!user) {
                    reject(!!err);
                }

                request.logIn(user, (err) => {

                    if (err) {
                        return reject(err);
                    }

                    resolve(user);

                });
            })(request, response, next);
        });
    }

    @Get('/test-auth')
    @Authenticated()
    public testAuth() {
        return true;
    }

    /**
     * Disconnect user
     * @param request
     */
    @Get('/logout')
    public logout(@Request() request:Express.Request & {logout: Function}) {
        request.logout();
        return "Disconnected";
    }
}
