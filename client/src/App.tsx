import React from 'react';
import { useLocation, useRoutes } from 'react-router-dom';
import routes from 'src/routes/routes';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/globalStyles';
import Theme from './assets/styles/Theme';

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
    <ThemeProvider theme={Theme(appTheme)}>
      <GlobalStyle />
      {element}
    </ThemeProvider>
  );
}

export default App;
