// src/modules/post/dto/create-post.dto.ts
export class CreatePostDto {
  content: string; // The content of the post
  authorId: number;
  imageUrl: string; // ID of the author (this can be obtained from the authenticated user)
}
