import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as ffmpeg from 'fluent-ffmpeg';

@Processor('audio')
export class AudioProcessor {
  @Process('analyze_audio')
  async handleAudio(job: Job<{ filePath: string }>) {
    const { filePath } = job.data;

    console.log(`🎧 Обробка аудіо: ${filePath}`);

    const duration = await this.getAudioDuration(filePath);
    console.log(`✅ Тривалість аудіо: ${duration} секунд`);
  }

  private getAudioDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, metadata) => {
        if (err) return reject(err);

        const duration = metadata?.format?.duration;
        if (typeof duration === 'number') {
          resolve(duration);
        } else {
          reject(new Error('Неможливо визначити тривалість аудіо'));
        }
      });
    });
  }
}
