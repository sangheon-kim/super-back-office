import React from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const HOST_URL = 'http://localhost:4000';
const SERVICE_URL = '/projects';
const URL = `${HOST_URL}${SERVICE_URL}`;
export default function useProjects() {
  const navigate = useNavigate();
  const [projects, setProjects]: [Option[], any] = React.useState([]);

  const { data, isLoading, isError, refetch } = useQuery(
    ['projects'],
    async () => {
      try {
        const response = await axios.get<FetchResponse<Record<'projects', Array<Project>>>>(URL);

        const { _data } = await response.data;

        return _data.projects;
      } catch (error) {}
    },
    { staleTime: Number.MAX_SAFE_INTEGER }
  );

  React.useEffect(() => {
    if (!!data) {
      const projects = data.reduce((acc: Option[], { projectId }: Project) => {
        acc.push({
          label: projectId,
          value: projectId,
        });
        return acc;
      }, []);
      setProjects(projects);
    }
  }, [data]);

  const addProject = useMutation(
    async (project: Project) => {
      const {
        data: { _data },
      } = await axios.post<FetchResponse<Record<'project', Project>>>(URL, project);

      return _data.project;
    },
    {
      onSuccess: (project: Project) => {
        const { projectId } = project;
        refetch();
        navigate(`/config/${projectId}`);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const deleteProject = useMutation(
    async (projectId: string) => {
      const {
        data: { _data },
      } = await axios.delete<FetchResponse<string>>(`${URL}/${projectId}`);

      return _data;
    },
    {
      onSuccess: () => {
        refetch();
        navigate(`/config`);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  return { projects, isLoading, isError, addProject, deleteProject };
}
