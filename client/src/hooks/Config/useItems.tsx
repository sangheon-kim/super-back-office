import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const HOST_URL = 'http://localhost:4000';

interface ItemResponse {
  project: Project;
  items: Array<Item>;
}

export default function useItems(projectId: string) {
  const [project, setProject]: [Project, any] = React.useState({ description: '', projectId: '' });
  const [items, setItems]: [Array<Item>, any] = React.useState([]);
  const SERVICE_URL = (() => `/projects/${projectId}/items`)();
  const URL = `${HOST_URL}${SERVICE_URL}`;
  const { isLoading, refetch } = useQuery(
    ['items', projectId],
    async () => {
      try {
        const response = await fetch(URL);
        const { _data }: FetchResponse<ItemResponse> = await response.json();

        setProject(_data.project);
        setItems(_data.items);

        return _data;
      } catch (error) {}
    },
    { staleTime: Number.MAX_SAFE_INTEGER }
  );

  React.useEffect(() => {
    refetch();
  }, [projectId]);

  return {
    data: {
      project,
      items,
    },
    isLoading,
  };
}
