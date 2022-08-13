import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;

  }

  :root {
    /* primary */
    --primary: #0d6efd;
    --primary_hover: #0a58ca;

    /* gray color */
    --gray100: #f8f9fa;
    --gray200: #e9ecef;
    --gray300: #dee2e6;
    --gray400: #ced4da;
    --gray500: #adb5bd;
    --gray600: #6c757d;
    --gray700: #495057;
    --gray800: #343a40;
    --gray900: #212529;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button,input {
    outline: none;
    background: none;
    border: none;
  }



    ::-webkit-scrollbar {
        width: 4px;
        /* margin-right: 4px; */
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: transparent;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 10px;
        border-radius: 10px;
        background: #aaaaaa; 
    }

`;

export default GlobalStyle;
