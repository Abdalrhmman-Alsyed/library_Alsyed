import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  message: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}