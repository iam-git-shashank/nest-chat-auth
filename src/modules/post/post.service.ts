// src/modules/post/post.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Post } from './entitites/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import Users from '../user/entities/user.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { extname } from 'path';
import { supabase } from '../supabase/supabase.client';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepo: EntityRepository<Post>,
    @InjectRepository(Users)
    private userRepo: EntityRepository<Users>,
    private readonly em: EntityManager,
  ) {}

  // Create a new post
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const user = await this.userRepo.findOneOrFail({
      id: createPostDto.authorId,
    });
    const post = this.postRepo.create({
      content: createPostDto.content,
      author: user,
      imageUrl: createPostDto.imageUrl,

      createdAt: new Date(),
    });
    await this.em.flush();
    return post;
  }
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileExt = extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;

    console.log('url entered');
    const { error } = await supabase.storage
      .from('post-bucket')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from('post-bucket')
      .getPublicUrl(fileName);
    return data.publicUrl; // store this in your MySQL post table
  }

  async getPostsByUserId(userId: number) {
    return this.postRepo.find(
      { author: userId },
      {
        populate: ['author'],
        orderBy: { createdAt: 'DESC' },
      },
    );
  }
  // Get all posts
  async findAll(): Promise<Post[]> {return this.postRepo.findAll({
    populate: ['author'],
    orderBy: { createdAt: 'DESC' }, // most recent posts first
  });

  }
}
