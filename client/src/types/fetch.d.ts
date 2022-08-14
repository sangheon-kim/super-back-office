interface FetchResponse<T = { [key: string]: any }> {
  status: number;
  success: boolean;
  _data: T;
}

interface Project {
  description: string;
  projectId: string;
}

interface Item {
  key: string;
  value: string;
  projectId: string;
  previousKey?: string;
}
interface ItemsResponse {
  project: Project;
  items: Array<Item>;
}

interface ItemResponse {
  project: Project;
  item: Item;
}
