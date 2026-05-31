import { Controller, Get, Param, Query } from '@nestjs/common'
import { AnalyticsService } from './analytics.service'

@Controller('analytics')
export class AnalyticsController {
  constructor(private analytics: AnalyticsService) {}

  @Get('content/:id') getStats(@Param('id') id: string) {
    return this.analytics.getStats(id)
  }

  @Get('top') getTop(@Query('limit') limit = '10') {
    return this.analytics.getTopContent(+limit)
  }
}