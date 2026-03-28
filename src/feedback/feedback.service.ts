import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entity/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';


@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly repo: Repository<Feedback>,
  ) {}

  async create(dto: CreateFeedbackDto) {
    const feedback = this.repo.create({
      name: dto.name || 'غير معروف',
      message: dto.message,
      rating: dto.rating,
    });
    return this.repo.save(feedback);
  }

  async findAll(limit = 4, offset = 0) {
    return this.repo.find({
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }
}