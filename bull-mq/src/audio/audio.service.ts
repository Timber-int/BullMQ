import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async processAudio(filePath: string) {
    await this.audioQueue.add('analyze_audio', { filePath });
  }
}
