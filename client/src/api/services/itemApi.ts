import axios from 'axios';

const HOST_URL = 'http://localhost:4000';
const SERVICE_URL = '/projects';

export class ItemService {
  static projectId: string = '';
  static itemId: string = '';
  url: string;
  constructor() {
    this.url = `${HOST_URL}/projects/${ItemService.projectId}/items`;
  }

  getItems = async () => {
    const url = this.url;
    const res = await axios.get<FetchResponse<ItemsResponse>>(url);
    return res.data._data;
  };

  getItem = async (id: string) => {
    const url = `${this.url}/${id}`;
    const res = await axios.get<FetchResponse<ItemResponse>>(url);
    return res.data._data;
  };

  createItem = async (item: Item) => {
    const url = this.url;
    const res = await axios.post<FetchResponse<ItemResponse>>(url, { ...item });
    return res.data._data;
  };

  updateItem = async (item: Item) => {
    const url = `${this.url}/${item.previousKey || ''}`;
    await axios.put<FetchResponse<string>>(url, { ...item });
    return 'OK';
  };
}

// export const createItem = async (item: Item) => {
//   const URL = `${COMMON_URL}/${this}/items`;
//   const res = await axios.post<FetchResponse<ItemResponse>>(URL, { ...item });

//   return res.data._data;
// };

// export const updateItem = async ({ projectId, item }: { projectId: string; item: Item }) => {
//   const URL = `${COMMON_URL}/${projectId}/items/${item.key}`;
//   await axios.put<FetchResponse<string>>(URL, { ...item });
//   return 'OK';
// };

// export const deleteItem = async ({ projectId, itemId }: { projectId: string; itemId: string }) => {
//   const URL = `${COMMON_URL}/${projectId}/items/${itemId}`;
//   await axios.delete<FetchResponse<string>>(URL);
//   return 'OK';
// };
