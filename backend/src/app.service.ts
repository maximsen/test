import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Donation, DonationDocument } from './donation.schema';
import { DonateDto } from './donate.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  public addDontation({ amount, currency }: DonateDto) {
    const donation = new this.donationModel({
      amount,
      currency,
    });
    return donation.save();
  }
}
