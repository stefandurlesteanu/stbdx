import { BadGatewayException, Injectable } from '@nestjs/common';
import { AbstractEntity } from './abstract.entity';
import { IAbstractService } from './IAbstract.service';
import axios from 'axios';
import { ApiEndpoints } from '../config/api-endpoints';

@Injectable()
export class AbstractCrudService<T extends AbstractEntity> implements IAbstractService<T> {
  private endpoint: string;
  protected rootEndpoint = ApiEndpoints.root;

  constructor() {
  }

  public async getAll(qs?: Record<string, unknown>): Promise<T[]> {
    try {
      const url = `${this.getRequestUrl()}`;
      const options = this.setOptions(qs);
      const response = await axios.get(url, options);
      return response.data;
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  public async get(id: string, qs?: Record<string, unknown>): Promise<T> {
    try {
      const url = `${this.getRequestUrl()}/${id}`;
      const options = this.setOptions(qs);
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  setOptions(qs?: Record<string, unknown>) {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (qs) {
      options['params'] = qs;
    }
    return options;
  }

  private getRequestUrl(appendage: string | number = ''): string {
    let endpoint = this.rootEndpoint + this.endpoint;
    if (appendage) {
      endpoint = endpoint + '/' + appendage;
    }
    return endpoint;
  }
}
