import { Module } from '@nestjs/common';
import { TrainService } from './training.service';
import { TraineeController } from './training.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import Trainee from './entities/train.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Trainee])],
  controllers: [TraineeController],
  providers: [TrainService],
})
export class TraineeModule {}
