import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class CronService {
  constructor(private readonly ownerService: OwnerService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async runEveryDay(): Promise<void> {
    await this.ownerService.removeOwners();
  }
}
