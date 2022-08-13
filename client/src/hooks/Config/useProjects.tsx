import React from 'react';
import { useQuery } from '@tanstack/react-query';

const HOST_URL = 'http://localhost:4000';

export default function useProjects() {
  const [projects, setProjects]: [Option[], any] = React.useState([]);
  const { data, isLoading, isError } = useQuery(
    ['projects'],
    async () => {
      try {
        const response = await fetch(`${HOST_URL}/projects`);
        const { _data }: FetchResponse<Record<'projects', Array<Project>>> = await response.json();

        return _data.projects;
      } catch (error) {}
    },
    { staleTime: Number.MAX_SAFE_INTEGER }
  );

  React.useEffect(() => {
    if (!!data) {
      const projects = data.reduce((acc: Option[], { projectId, description }: Project) => {
        acc.push({
          label: projectId,
          value: projectId,
        });
        return acc;
      }, []);
      setProjects(projects);
    }
  }, [data]);

  return { projects, isLoading, isError };
}
