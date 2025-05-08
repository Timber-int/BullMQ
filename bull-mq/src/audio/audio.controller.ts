import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AudioService } from './audio.service';
import { extname } from 'path';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/audio', // папка для збереження
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now();
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    await this.audioService.processAudio(file.path);
    return { message: 'Аудіофайл додано в чергу на обробку' };
  }
}
