import { Controller, Get, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./auth/local-auth.guard";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  /**
   * @api {post} /auth/login Login
   * @apiName Login
   * @apiGroup Auth
   *
   * @apiParam {String} username User email address.
   * @apiParam {String} password User password with 6 char min..
   *
   * @apiSuccess {String} access_token JWT token.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 OK
   *     {
   *       "access_token": "xxxxxxxxxxxxxxxxxxxxx",
   *     }
   *
   * @apiError Unauthorized.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "error": "Incorrect credentials"
   *     }
   */
  @UseGuards(LocalAuthGuard)
  @Post("auth/login")
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  /**
   * @api {get} /profile Get authentified user
   * @apiName getAuth
   * @apiGroup Auth
   *
   * @apiHeader {String} authorization Bearer token.
   *
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 OK
   *     {
   *       "id" : "5f845e9c3637511f9875b63f",
   *       "name": "John",
   *       "email": "john@john.com",
   *       "favorites" : ["5f7f00e8c828e01d223fd058", "5f7f4c46eb4a5b3d2eaa1e34"],
   *       "score" : 30,
   *       "role": "user"
   *     },
   *
   * @apiError Unauthorized.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "error": "Incorrect credentials"
   *     }
   */
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
