import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ViewEvent } from './schemas/view-event.schema'

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(ViewEvent.name) private viewModel: Model<ViewEvent>) {}

  track(contentId: string, contentType: string, userId: string | null, ip: string) {
    return this.viewModel.create({ contentId, contentType, userId, ip })
  }

  async getStats(contentId: string) {
    const [total, last24h] = await Promise.all([
      this.viewModel.countDocuments({ contentId }),
      this.viewModel.countDocuments({
        contentId,
        createdAt: { $gte: new Date(Date.now() - 86_400_000) },
      }),
    ])
    return { contentId, total, last24h }
  }

  async getTopContent(limit = 10) {
    return this.viewModel.aggregate([
      { $group: { _id: '$contentId', views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: limit },
    ])
  }
}