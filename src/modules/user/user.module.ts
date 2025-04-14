import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import Users from "./entities/user.entity";

@Module({
    imports: [MikroOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService],
    exports:[UserService]
})
export class UserModule{}