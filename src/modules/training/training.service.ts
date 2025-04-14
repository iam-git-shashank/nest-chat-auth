// supabase.service.ts
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Trainee from './entities/train.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/mysql';
import { CreateTrainDto } from './dto/create-train-dto';
@Injectable()
export class TrainService {
  private readonly client: SupabaseClient;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Trainee)
    private readonly traineeRepo: EntityRepository<Trainee>,
    private readonly em: EntityManager,
  ) {
    this.client = createClient(
      'https://bqzqhvbmbmnqdfxmeyqb.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxenFodmJtYm1ucWRmeG1leXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NTcwNDAsImV4cCI6MjA1OTMzMzA0MH0.kyGZQ_N48NEwWiL6GYwI2Bp3-TPGKGk8O-Eb-KMxJFs',
    );
  }

  async create(dto:CreateTrainDto, file: Express.Multer.File) {
    const url = await this.uploadFile(file);

    const trainee = this.traineeRepo.create({
      name: dto.name,
      url: url,
    });

    await this.em.persistAndFlush(trainee);
    return {message:"succ",trainee};
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { originalname, buffer } = file;
    const filePath = `pdfs/${Date.now()}-${originalname}`;

    const { data, error } = await this.client.storage
      .from('resume-bucket') // replace with your bucket name
      .upload(filePath, buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Supabase upload error: ${error.message}`);

    const { data: urlData } = this.client.storage
      .from('your-bucket-name')
      .getPublicUrl(filePath);
    console.log(urlData);
    return urlData.publicUrl;
  }
}
