import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import * as Mongoose from "mongoose";
import { hasRoles } from "src/auth/roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guards";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  /**
   * @api {post} /category Create new category
   * @apiName CreateCategory
   * @apiGroup Category
   * @apiDescription Creating a new category
   *
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   * 
   * @apiParam {String} name Name of the new category
   *
   * @apiSuccess {String} id ID of the created category
   *
   * @apiError InternalServerError Database error while creating new entry.
   *
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addCategory(@Body("name") name: string) {
    const result = await this.categoryService.createCategory(name);
    return { id: result };
  }

  @Get("/array")
  async showAllCategories() {
    const result = await this.categoryService.showCategory();
    return result;
  }

  /**
   * @api {get} /category Get all categories
   * @apiName GetCategories
   * @apiGroup Category
   * @apiDescription Showing all the categories
   *
   *
   * @apiSuccessExample
   *     HTTP/1.1 200 OK
   *    [
   *        {
   *           "id": "5f7efd7fc828e01d223fd055",
   *           "name" : "Laravel"
   *        },
   *        {
   *           "id": "5f7efd87c828e01d223fd056",
   *           "name" : "PHP"
   *        },
   *        ...
   *    ]
   *
   *
   *
   */
  @Get()
  async showCategories() {
    const result = await this.categoryService.showCategories();
    return result;
  }

  /**
   * @api {patch} /category/:id Update category
   * @apiName UpdateCategory
   * @apiGroup Category
   * @apiDescription Updating an existing category
   *
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   * 
   * @apiParam {String} id ID of the category
   * @apiParam {String} name New name of a category
   *
   * @apiSuccessExample
   *     HTTP/1.1 200 OK
   *        {
   *           "id": "5f7efd7fc828e01d223fd055",
   *           "name" : "Laravel"
   *        },
   *
   *
   * @apiError NotFoundError Category not found
   *
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  async updateCategory(
    @Param("id") categoryId: Mongoose.Schema.Types.ObjectId,
    @Body("name") name: string,
  ) {
    const result = await this.categoryService.update(categoryId, name);
    return result;
  }

  /**
   * @api {delete} /category/:id Delete category
   * @apiName DeleteCategory
   * @apiGroup Category
   * @apiDescription Deleting an existing category
   *
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   * 
   * @apiParam {String} id ID of the category
   *
   * @apiSuccessExample
   *     HTTP/1.1 200 OK
   *        {
   *           "message": "Category successfully deleted",
   *        },
   *
   * @apiError NotFoundError Category not found
   *
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id") // pour admin
  async deleteCategory(@Param("id") categoryId) {
    const result = await this.categoryService.delete(categoryId);
    return { message: result };
  }
}
