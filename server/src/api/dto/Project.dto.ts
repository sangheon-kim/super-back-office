import { IsString, IsOptional, IsAscii } from 'class-validator';

export class RequestProjectDto {
  @IsString()
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
  @IsOptional()
  public projectId!: string;
}
