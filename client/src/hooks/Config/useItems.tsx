import React from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ItemService } from 'src/api/services/itemApi';
// import { ItemService } from 'src/api/services/itemAPI';

const onError = (err: unknown) => console.error(err);

const HOST_URL = 'http://localhost:4000';

export default function useItems(projectId: string) {
  const SERVICE_URL = `/projects/${projectId}/items`;
  ItemService.projectId = projectId;
  const itemService = new ItemService();

  const COMMON_URL = `${HOST_URL}${SERVICE_URL}`;
  const [project, setProject]: [Project, any] = React.useState({ description: '', projectId: '' });
  const [items, setItems]: [Array<Item>, any] = React.useState([]);

  const { isLoading, refetch } = useQuery(['items', projectId], itemService.getItems, {
    staleTime: Number.MAX_SAFE_INTEGER,
    onSuccess: (data) => {
      setProject(data.project);
      setItems(data.items);
    },
  });

  React.useEffect(() => {
    ItemService.projectId = projectId;
    refetch();
  }, [projectId]);

  const addItem = useMutation(itemService.createItem, {
    onSuccess: (data) => {
      setItems([...items, data.item]);
    },
    onError,
  });

  const updateItem = useMutation(itemService.updateItem, {
    onSuccess: (data, variables) => {
      const { previousKey, key: updateKey, value: updateValue, projectId } = variables;

      setItems(
        items.map((item) => {
          return item.previousKey === item.key
            ? {
                key: updateKey,
                value: updateValue,
                projectId,
              }
            : { ...item };
        })
      );
    },
    onError,
  });

  const deleteItem = useMutation(itemService.deleteItem, {
    onSuccess: (_, key) => {
      setItems(items.filter((item) => item.key !== key));
      // refetch();
    },
    onError,
  });

  return {
    data: {
      project,
      items,
    },
    isLoading,
    addItem,
    updateItem,
    deleteItem,
  };
}
