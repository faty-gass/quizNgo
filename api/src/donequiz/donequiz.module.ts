import { DonequizService } from "./donequiz.service";
import { DonequizController } from "./donequiz.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DonequizSchema } from "./donequiz.model";
import { UsersModule } from "src/users/users.module";
import { CategoryModule } from "src/category/category.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Donequiz", schema: DonequizSchema }]),
    UsersModule,
    CategoryModule,
  ],
  controllers: [DonequizController],
  providers: [DonequizService],
  exports: [MongooseModule, DonequizService],
})
export class DonequizModule {}
