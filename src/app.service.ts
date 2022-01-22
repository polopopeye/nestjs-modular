import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apikey: string,
    @Inject('TASK') private tasks: string,
  ) {}
  TASK;
  getHello(): string {
    // console.log(this.tasks);

    return `Hello World! ${this.apikey} 
    
    and this are the tasks...
  
    `;
  }
}
