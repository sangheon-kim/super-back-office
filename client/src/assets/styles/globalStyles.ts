import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button,input {
    outline: none;
    background: none;
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
