import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { BullModule } from '@nestjs/bull';
import { PhotoProcessor } from './photo.processor';
import { PhotoController } from './photo.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'photo',
    }),
  ],
  providers: [PhotoService, PhotoProcessor],
  controllers: [PhotoController],
})
export class PhotoModule {}
