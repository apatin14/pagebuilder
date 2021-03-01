import { LoggerService, Context } from '@domain/services/logger.service';
import { Controller, Get, Post, Body, UseInterceptors, Res } from '@nestjs/common';
import { LoggingInterceptor } from '@application/interceptors/logging.interceptor';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageService } from '@domain/services/page.services';

// UserController
@ApiTags('user')
@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(private readonly pageService: PageService) {}

  @Get('build')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  build(): string {
    const context: Context = { module: 'AppController', method: 'build' };
    this.Log.logger('Hello World!', context);
    return 'Hello World!';
  }

  @Get('/all')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async getAll(){
    const context: Context = { module: 'AppController', method: 'getAll' };
    this.Log.logger('Hello World!', context);
    return await this.pageService.find();
  }

  @Post('/user/register/contactme')
  @ApiResponse({ status: 201, description: '{sucess: true, message: "tu mensaje fue enviado correctamente"}', })
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() user){
    const context: Context = { module: 'AppController', method: 'create' };
    let jsonData = {
      sucess: true,
      message: "Tu mensaje fue enviado correctamente."
    }
    //await this.pageService.contactUS(user);
    //await this.pageService.sendEmail(user);
    if (await this.pageService.create(user)){
      return jsonData;
    }
    else{
      return {
        sucess: false,
        message: "No se envió correctamente el mensaje. Por favor inténtelo de nuevo."
      }
    }
  }


}
