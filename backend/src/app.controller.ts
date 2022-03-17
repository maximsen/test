import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DonateDto } from './donate.dto';

const currencies = new Set(['USD', 'EUR', 'GBP', 'RUB']);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('donate')
  donate(@Body() body: DonateDto) {
    if (!currencies.has(body.currency)) {
      throw new BadRequestException('Wrong currency');
    }

    this.appService.addDontation(body);
    return {
      ok: true,
    };
  }
}
