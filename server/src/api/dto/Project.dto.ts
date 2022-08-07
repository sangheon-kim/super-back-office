import { IsString, IsOptional, IsAscii, Length } from 'class-validator';

export class RequestProjectDto {
  @IsString()
  @Length(1, 50)
  @IsAscii()
  public projectId!: string;

  @IsString()
  @IsOptional()
  public description!: string;
}

export interface ProjectReponseDto {
  /** 프로젝트명 */
  projectId: string;
  /** 프로젝트 설명 */
  description: string;
}

export class CreateProjectDto extends RequestProjectDto {}

export class UpdateProjectDto extends RequestProjectDto {
  @IsString()
  @Length(1, 50)
  @IsOptional()
  @IsAscii()
  public projectId!: string;
}
