import axios from 'axios';

const HOST_URL = 'http://localhost:4000';
const SERVICE_URL = '/projects';
const URL = `${HOST_URL}${SERVICE_URL}`;

/** 프로젝트 리스트 */
export const getProjects = async () => {
  const res = await axios.get<FetchResponse<Record<'projects', Array<Project>>>>(URL);
  return res.data._data;
};

/** 해당 프로젝트 정보 */
export const getProject = async (id: string) => {
  const res = await axios.get<FetchResponse<Record<'project', Project>>>(`${URL}/${id}`);
  return res.data._data.project;
};

/** 프로젝트 생성 */
export const createProject = async (project: Project) => {
  const res = await axios.post<FetchResponse<Record<'project', Project>>>(URL, { ...project });
  return res.data._data.project;
};

/** 프로젝트 수정 */
export const updateProject = async (project: Project) => {
  await axios.put<FetchResponse<string>>(`${URL}/${project.projectId}`, {
    ...project,
  });
  return 'OK';
};

/** 프로젝트 삭제 */
export const deleteProject = async (projectId: string) => {
  await axios.delete<FetchResponse<string>>(`${URL}/${projectId}`);
  return 'OK';
};
