import { Injectable, Inject } from '@nestjs/common';
import { Page } from '@domain/entities/page';
import { PageDto } from '@application/dto/page.dto';
import { PageRepository } from '@infrastructure/repository/page.repository';

// Se inyecta el repo en el servicio
@Injectable()
export class PageService {
  constructor(private readonly pageRepository: PageRepository ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(pageDto: PageDto): Promise<Page> {
    return await this.pageRepository.create(pageDto);
  }

  async find(): Promise<Page[]> {
    return await this.pageRepository.find();
  }

}
