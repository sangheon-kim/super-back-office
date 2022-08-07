import { IsString, IsAscii, IsOptional, MaxLength } from 'class-validator';

export class RequestItemDto {
  @IsString()
  @IsAscii()
  @MaxLength(30)
  public key!: string;

  @IsString()
  @IsOptional()
  public value!: string;
}

export class CreateItemDto extends RequestItemDto {}

export class UpdateItemDto extends RequestItemDto {
  @IsString()
  @IsAscii()
  @MaxLength(30)
  @IsOptional()
  public key!: string;
}

export class ResponseItemDto extends RequestItemDto {
  @IsString()
  @IsAscii()
  public projectId!: string;
}
