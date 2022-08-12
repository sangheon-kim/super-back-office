import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from 'src/routes/routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyles';
import Theme from './assets/styles/Theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {
  const [appTheme, setAppTheme]: ['dark' | 'light', any] = React.useState('dark');
  const element = useRoutes(routes);
  const location = useLocation();

  React.useEffect(() => {
    const query: { [key: string]: any } = (location.search.split('?')[1] || '')
      .split('&')
      .reduce((acc: { [key: string]: any }, cur) => {
        let [key, value] = cur.split('=');

        if (value !== '' && key !== '') acc[key] = value;

        return acc;
      }, {});

    const theme = query['theme'];

    if (!!theme) {
      localStorage.setItem('theme', theme);
    }

    const storageTheme = localStorage.getItem('theme') as 'dark' | 'light';
    setAppTheme(storageTheme);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme(appTheme || 'dark')}>
        <GlobalStyle />
        {element}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
