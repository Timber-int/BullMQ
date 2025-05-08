import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    BullModule.forRoot({
      // Налаштування підключення до Redis-серверу
      redis: {
        host: '127.0.0.1', // Локальний хост Redis
        port: 6379, // Стандартний порт Redis
      },

      // Ліміт обробки задач — максимум 10 задач кожні 5 секунд
      //   limiter: {
      //     max: 10, // Максимальна кількість задач
      //     duration: 5000, // Період (мс), за який перевіряється кількість задач
      //     bounceBack: false, // Якщо true — нові задачі будуть одразу відхилятись при досягненні ліміту
      //   },
      //
      //   // Префікс для імен черг у Redis
      //   prefix: 'queue',
      //
      //   // Опції задачі за замовчуванням
      //   defaultJobOptions: {
      //     priority: 1, // Пріоритет задачі (1 — високий)
      //     delay: 1000, // Затримка перед запуском задачі (мс)
      //     attempts: 5, // Кількість спроб при помилках
      //     repeat: {
      //       // Планування повтору задачі
      //       every: 60000, // Повторювати кожні 60 секунд
      //       limit: 10, // Обмеження кількості повторень
      //     },
      //     backoff: {
      //       type: 'exponential', // Стратегія затримки між спробами
      //       delay: 3000, // Початкова затримка (мс)
      //     },
      //     lifo: false, // Якщо true — задачі виконуються за принципом "останній прийшов — перший обробляється"
      //     timeout: 10000, // Максимальний час виконання задачі (мс)
      //     jobId: undefined, // Унікальний ідентифікатор задачі (можна задати вручну)
      //     removeOnComplete: true, // Автоматично видаляти задачу після успішного виконання
      //     removeOnFail: true, // Автоматично видаляти задачу після невдачі
      //     stackTraceLimit: 10, // Кількість збережених трасувань стека при помилках
      //   },
      //
      //   // Налаштування поведінки обробника черги
      //   settings: {
      //     backoffStrategies: {}, // Додаткові кастомні стратегії backoff
      //     drainDelay: 300, // Час затримки перед завершенням обробки задач (мс)
      //     retryProcessDelay: 5000, // Затримка перед повторною обробкою задач (мс)
      //     guardInterval: 5000, // Інтервал перевірки на завислі задачі (мс)
      //     maxStalledCount: 1, // Максимальна кількість зависань задачі перед визнанням її як помилкову
      //     stalledInterval: 30000, // Інтервал перевірки на завислі задачі (мс)
      //     lockRenewTime: 10000, // Час, на який поновлюється блокування задачі (мс)
      //     lockDuration: 30000, // Час блокування задачі, щоб уникнути паралельної обробки (мс)
      //   },
    }),
    AudioModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
