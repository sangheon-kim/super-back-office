export type CreateProjectDto = Omit<ItemResponseDto, 'projectId'>;

export interface ItemResponseDto {
  key: string;
  value: string;
  projectId: string;
}
