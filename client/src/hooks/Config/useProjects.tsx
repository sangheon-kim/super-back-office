import { useQuery } from '@tanstack/react-query';

const HOST_URL = 'http://localhost:4000';

export default function useProjects() {
  const { data, isLoading, isError } = useQuery(['projects'], async () => {
    const response = await fetch(`${HOST_URL}/projects`);
    const data = await response.json();

    //
    return data;
  });
  return { data, isLoading, isError };
}
