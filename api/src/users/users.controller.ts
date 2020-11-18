import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
  NotAcceptableException,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UsersService } from "./users.service";
import { RolesGuard } from "src/auth/roles.guards";
import { hasRoles } from "src/auth/roles.decorator";
import * as Mongoose from "mongoose";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * @api {post} /users Create new user
   * @apiName CreateNewUser
   * @apiGroup User
   *
   * @apiParam {String} name User unique name.
   * @apiParam {String} email User unique email.
   * @apiParam {String} password User password with 6 char min..
   * @apiParam {String[]} [favorites] User favorite quiz.
   * @apiParam {Number} [score=0] User total XPs.
   * @apiParam {string="admin","user"} [role="user"] User status.
   *
   * @apiSuccess {String} id ID of the User.
   * @apiSuccess {String} name Name of the User.
   * @apiSuccess {String} email  Email of the User.
   * @apiSuccess {String[]} favorites Favorites of the User.
   * @apiSuccess {Number} score Score of the User.
   * @apiSuccess {string} role Status of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 201 OK
   *     {
   *       "id" : "5f845e9c3637511f9875b63f"
   *       "name": "John",
   *       "email": "john@john.com",
   *       "favorites" : [],
   *       "score" : 0,
   *       "role": "user"
   *     }
   *
   * @apiError NotAcceptableException.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 406 Not Acceptable
   *     {
   *       "error": "Email must be unique"
   *     }
   */
  @Post() // //  pour utilisateur simple et admin
  async addUser(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    @Body("role") role: string,
  ) {
    // if (password.length < 6)
    if (!password.match(/^\S{6,}$/)) {
      // ^^^ password no spaces, min length 6
      // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ password 1x uppercase min, 1x lowercase min, 1x digit min, 1x [#?!@$%^&*-], min length 8
      return {
        error:
          "Le mot de passe doit contenir au moins 6 caractères sans espace(s).",
      };
    } else {
      const newUser = await this.usersService.insertUser(
        name,
        email,
        password,
        favorites,
        score,
        role,
      );
      return newUser;
    }
    // modifié pour register new user par admin
  }


  /**
   * @api {get} /users/admin Get all registered users
   * @apiName GetAllUser
   * @apiGroup User
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "id" : "5f845e9c3637511f9875b63f",
   *       "name": "John",
   *       "email": "john@john.com",
   *       "favorites" : [],
   *       "score" : 30,
   *       "role": "user"
   *     },
   *     {
   *       "id" : "5f845e9c3637511f9875b75f",
   *       "name": "Jane",
   *       "email": "jane@jane.com",
   *       "favorites" : [],
   *       "score" : 60,
   *       "role": "admin"
   *     }]
   *
   * @apiError 401 Unauthorized
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Unauthorized
   *     {
   *       "error": "unauthorized"
   *     }
   */
  //@hasRoles("admin")
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin") //  pour admin
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  /**
   * @api {get} /users/admin/:id Get one user info
   * @apiName GetOneUser
   * @apiGroup User
   * 
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   *
   * @apiParam {Number} id User unique ID.
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     [{
   *       "id" : "5f845e9c3637511f9875b63f",
   *       "name": "John",
   *       "email": "john@john.com",
   *       "favorites" : [],
   *       "score" : 30,
   *       "role": "user"
   *     },
   *
   * @apiError 404 Not Found
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "User not found"
   *     }
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("admin/:id") //  pour admin
  getUser(@Param("id") userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  /**
   * @api {patch} /users/admin/:id Update user (admin)
   * @apiName UpdateUserAdm
   * @apiGroup User
   * 
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   *
   * @apiParam {Number} id User unique ID.
   * @apiParam {String} [email] User unique email.
   * @apiParam {String} [password] User password with 6 char min..
   * @apiParam {String[]} [favorites] User favorite quiz.
   * @apiParam {Number} [score=0] User total XPs.
   * @apiParam {string="admin","user"} [role="user"] User status.
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *     }
   *
   * @apiError NotAcceptableException.
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("admin/:id") //  pour admin
  async updateUserAdmin(
    @Param("id") userId: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    @Body("role") role: string,
  ) {
    await this.usersService.updateUserAdmin(
      userId,
      name,
      email,
      password,
      favorites,
      score,
      role,
    );
    return null;
  }

  /**
   * @api {patch} /users/:id Update user
   * @apiName UpdateUser
   * @apiGroup User
   *
   * @apiHeader {String} authorization Bearer token.
   * 
   * @apiParam {Number} id User unique ID.
   * @apiParam {String} [email] User unique email.
   * @apiParam {String} [password] User password with 6 char min..
   * @apiParam {String[]} [favorites] User favorite quiz.
   * @apiParam {Number} [score=0] User total XPs.
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       message : "User successfully updated !"
   *     }
   *
   * @apiError NotAcceptableException.
   */
  @UseGuards(JwtAuthGuard)
  @Patch(":id") //  pour utilisateur simple
  async updateUser(
    @Param("id") userId: string,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("favorites") favorites: [Mongoose.Schema.Types.ObjectId],
    @Body("score") score: Number,
    //@Body('role') role: boolean,
  ) {
    const result = await this.usersService.updateUser(
      userId,
      name,
      email,
      password,
      favorites,
      score,
      // role,
    );
    return { message: result };
  }

  /**
   * @api {delete} /users/admin/:id Delete user
   * @apiName DeleteUser
   * @apiGroup User
   * 
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   *
   * @apiParam {Number} id User unique ID.
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *     }
   *
   * @apiError 404 UserNotFound
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("admin/:id") //  pour admin
  async removeUser(@Param("id") prodId: string) {
    await this.usersService.deleteUser(prodId);
    return null;
  }
}
