import {ServerLoader, IServerLifecycle, ServerSettings, Inject} from "ts-express-decorators";
import Path = require("path");
const rootDir = Path.resolve(__dirname);
import passport = require('passport');
import PassportLocalService from "./services/PassportLocalService";

@ServerSettings({
   rootDir,
   mount: {
    '/api': `${rootDir}/controllers/**/**.js`
   },
   httpPort: 8080,
   httpsPort: 8000,
   acceptMimes: ['application/json'],
   componentsScan: [
     `${rootDir}/services/**/**.js`,
     `${rootDir}/middlewares/**/**.js`
   ]
})
export class Server extends ServerLoader implements IServerLifecycle {

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  @Inject()
  $onMountingMiddlewares(passportService: PassportLocalService): void|Promise<any> {

    const morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compress = require('compression'),
      session = require('express-session'),
      methodOverride = require('method-override');


    this
      .use(morgan('dev'))
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }))

      // Configure session used by Passport
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
      // Configure passport JS
      .use(passportService.middlewareInitialize())
      .use(passportService.middlewareSession());

    return null;
  }

  public $onAuth(request, response, next): void {
    /// request.isAuthenticated() is provided by passport.js. You can implements other library
    next(request.isAuthenticated());
  }

  public $onReady() {
    console.log('Server started...');
  }

  public $onServerInitError(err) {
    console.error(err);
  }

  static Initialize = (): Promise<any> => new Server().start();
}

Server.Initialize();
