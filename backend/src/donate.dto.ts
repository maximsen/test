import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class DonateDto {
  @IsNotEmpty({
    message: 'Amount required',
  })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsPositive({
    message: 'Amount should be more than 0',
  })
  @IsInt()
  amount: number;

  @IsNotEmpty({
    message: 'Currency required',
  })
  @IsString()
  currency: string;
}
