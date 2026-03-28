import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';


@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const take = limit ? parseInt(limit) : 4;
    const skip = offset ? parseInt(offset) : 0;
    return this.feedbackService.findAll(take, skip);
  }

  
  @Get('share/facebook')
  shareFacebook() {
    return { url: 'https://www.facebook.com/share/18Y9FyDAQT/' };
  }
}