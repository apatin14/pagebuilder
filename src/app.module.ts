import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './application/controllers/app.controller';
import { PageService } from './domain/services/page.services';
import { DatabaseModule } from './infrastructure/database/database.module';
import { modelProviders } from './infrastructure/models';
import { PageRepository } from './infrastructure/repository/page.repository';
import { LoggerMiddleware } from './application/middlewere/logger.middleware';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './infrastructure/health/terminus-options.check';

const HealthModule = TerminusModule.forRootAsync({
  useClass: TerminusOptionsService,
});

@Module({
  imports: [DatabaseModule, HealthModule],
  controllers: [AppController],
  providers: [
    PageService,
    PageRepository,
    ...modelProviders,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AppController);
  }
}
