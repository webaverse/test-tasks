import { HttpService } from '@nestjs/axios';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { AppService } from './app.service';

import { ExchangeDto } from 'src/dto/exchange.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly httpService: HttpService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('exchange_router')
  @ApiOkResponse()
  async getExchange(@Query() query: ExchangeDto): Promise<AxiosResponse<any, any>> {
    try {
      const res = await lastValueFrom(this.httpService
        .get(`https://api.coinstats.app/public/v1/markets?coinId=${query.coinId}&currency=${query.currency}`)
        .pipe(map((res: any) => res.data))
      );
      let matchedExchanges = res.filter(currency => currency.pair == `${query.symbol}/USD`);
      matchedExchanges.sort((a, b) => a.price - b.price);
      return {
        currency: query.symbol,
        ...matchedExchanges[0]
      };
    } catch (error) {
      console.log(error);
    }
    return null;
  }

}
