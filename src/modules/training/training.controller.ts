// employee.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TrainService } from './training.service';
import { CreateTrainDto } from './dto/create-train-dto';
import { Express } from 'express';
@Controller('trainee')
export class TraineeController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createTracinDto:CreateTrainDto,
  ) {
    console.log(createTracinDto);
    return this.trainService.create(createTracinDto, file);
  }
}
