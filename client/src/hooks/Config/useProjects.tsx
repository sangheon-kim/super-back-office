import React from 'react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as projectAPI from 'src/api/services/projectApi';

const HOST_URL = 'http://localhost:4000';
const SERVICE_URL = '/projects';
const URL = `${HOST_URL}${SERVICE_URL}`;
export default function useProjects() {
  const navigate = useNavigate();
  const [projects, setProjects]: [Option[], any] = React.useState([]);

  const { isLoading, isError, refetch } = useQuery(
    ['projects'],
    projectAPI.getProjects.bind(null),
    {
      staleTime: Number.MAX_SAFE_INTEGER,
      onSuccess: (data) => {
        if (!data) return false;
        const { projects } = data;
        const list = projects.reduce((acc: Option[], { projectId }: Project) => {
          acc.push({
            label: projectId,
            value: projectId,
          });
          return acc;
        }, []);
        setProjects(list);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const addProject = useMutation(projectAPI.createProject, {
    onSuccess: (project: Project) => {
      const { projectId } = project;
      refetch();
      navigate(`/config/${projectId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const deleteProject = useMutation(projectAPI.deleteProject, {
    onSuccess: () => {
      refetch();
      navigate(`/config`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { projects, isLoading, isError, addProject, deleteProject };
}
