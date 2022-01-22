import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASK') private tasks: string,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  TASK;
  getHello(): string {
    // console.log(this.tasks);
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! ${apiKey} ${dbName} `;
  }
}
