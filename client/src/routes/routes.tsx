import type { RouteObject } from 'react-router-dom';
import {} from 'react-router-dom';
import { MainContainer } from 'src/containers/MainContainer';
import ErrorContainer from 'src/containers/ErrorContainer';
import Layout from 'src/layouts/Layout';
import AuthLayout from 'src/layouts/AuthLayout';
import LoginContainer from 'src/containers/auth/LoginContainer';
import JoinContainer from 'src/containers/auth/JoinContainer';
import FindIdContainer from 'src/containers/auth/FindIdContainer';
import FindPasswordContainer from 'src/containers/auth/FindPasswordContainer';
import ChangePasswordContainer from 'src/containers/auth/ChangePasswordContainer';
import ServiceContainer from 'src/containers/ServiceContainer';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainContainer /> },
      { path: '/:id', element: <ServiceContainer /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { index: false },
      {
        path: '/auth/login',
        element: <LoginContainer />,
      },
      {
        path: '/auth/join',
        element: <JoinContainer />,
      },
      {
        path: '/auth/find',
        children: [
          { index: false },
          { path: '/auth/find/id', element: <FindIdContainer /> },
          { path: '/auth/find/password', element: <FindPasswordContainer /> },
        ],
      },
      {
        path: '/auth/change',
        children: [
          { index: false },
          { path: '/auth/change/password', element: <ChangePasswordContainer /> },
        ],
      },
    ],
  },
  { path: '*', element: <ErrorContainer /> },
];

export default routes;
