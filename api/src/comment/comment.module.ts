import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentSchema } from "./comment.model";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Comment", schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [MongooseModule, CommentService],
})
export class CommentModule {}
