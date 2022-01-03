import { AbstractEntity } from './abstract.entity';
import { IAbstractService } from './IAbstract.service';
import { Get, Param, Query } from '@nestjs/common';


export class AbstractController<T extends AbstractEntity> {
  constructor(private readonly _iAbstractService: IAbstractService<T>) {
  }

  @Get()
  async findAll(@Query() qs?): Promise<T[]> {
    return this._iAbstractService.getAll(qs);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Query() qs?): Promise<T> {
    return this._iAbstractService.get(id, qs);
  }
}
