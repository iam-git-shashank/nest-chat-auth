import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import Follower from "./entities/follower.entity";
import { FollowerService } from "./follower.service";
import { FollowerController } from "./follower.controller";
import Users from "../user/entities/user.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Follower,Users])],
  controllers: [FollowerController],
  providers: [FollowerService],
  exports: [FollowerService],
})
export class FollowerModule {}