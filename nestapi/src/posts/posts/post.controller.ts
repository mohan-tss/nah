import { Controller, Get, Post, Body, Query, Req, Request, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostQueryDao, SavePostDto } from '../dto/post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostService) { }

    @Get('list')
    async getPosts(@Query() query: PostQueryDao, @Req() req) {
        const sessionUser = req['sessionUser'];
        console.log('sessionUser -->', sessionUser);
        let data: any;
        if (query.postId) {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, data, success: true };
        } else {
            data = await this.postService.getPosts(query, sessionUser);
            return { message: false, success: true, ...data, query };
        }
    }

    @Post()
    async saveUpdatePost(@Body() post: SavePostDto) {
        let msg = 'Created successfully';
        if (post.id) {
            msg = 'Updated successfully';
        }
        const data = await this.postService.saveUpdatePost(post);
        return { message: msg, success: true, data };

    }

    /**
  * post bookmark
  */
    @Post('bookmark')
    async bookmarkPost(@Body() bookmark, @Request() req) {
        return this.postService.bookmarkPost(bookmark);
    }

    @Post('comment')
    async addComment(@Body() comment, @Request() req) {
        return this.postService.addComment(comment);
    }
    /**
     * 
     * @param id 
     */
    @Delete('comment/:commentId')
    async deleteComment(@Param('commentId') id: number) {
        const data = await this.postService.deleteComment(id);
        return { message: 'Deleted successfull', success: true, data };
    }

}
