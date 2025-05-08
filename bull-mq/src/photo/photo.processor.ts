import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueStalled,
  OnQueueWaiting,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import * as sharp from 'sharp';
import { Scope } from '@nestjs/common';

@Processor('photo')
export class PhotoProcessor {
  // Основний обробник задачі "analyze_photo"
  @Process({ name: 'analyze_photo', concurrency: 1 })
  async handlePhoto(job: Job<{ filePath: string }>) {
    const { filePath } = job.data;
    console.log(`🖼️ Обробка фото: ${filePath}`);

    try {
      const metadata = await this.getPhotoMetadata(filePath);
      console.log(`✅ Інформація про фото:`, metadata);
    } catch (err) {
      console.error('❌ Помилка при обробці фото:', err.message);
    }
  }

  // Метод для витягування метаданих зображення (розмір, формат, глибина кольору тощо)
  private async getPhotoMetadata(filePath: string) {
    return await sharp(filePath).metadata();
  }

  // 🔄 Викликається коли задача переходить у статус "виконується"
  @OnQueueActive()
  onActive(job: Job) {
    console.log(`🔄 Задача активна (jobId: ${job.id})`);
  }

  // ✅ Викликається після успішного завершення задачі
  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    console.log(`✅ Задача завершена (jobId: ${job.id})`);
  }

  // ❌ Викликається у випадку невдачі виконання задачі
  @OnQueueFailed()
  onFailed(job: Job, error: any) {
    console.error(
      `❌ Задача завершилась з помилкою (jobId: ${job.id}):`,
      error.message,
    );
  }

  // ⏳ Викликається, коли задача чекає в черзі
  @OnQueueWaiting()
  onWaiting(jobId: string | number) {
    console.log(`⏳ Задача чекає у черзі (jobId: ${jobId})`);
  }

  // ⚠️ Викликається, коли задача зависає кілька разів
  @OnQueueStalled()
  onStalled(job: Job) {
    console.warn(`⚠️ Задача зависла (jobId: ${job.id})`);
  }

  // 🧯 Викликається при виникненні помилки на рівні черги
  @OnQueueError()
  onError(error: Error) {
    console.error('🧯 Помилка в черзі:', error.message);
  }
}
