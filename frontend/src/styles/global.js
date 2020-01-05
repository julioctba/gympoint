import { createGlobalStyle, keyframes } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    *:focus{
        outline: 0;
    }

    html, body, #root{
        height: auto;
    }

    body{
        -webkit-font-smoothing: antialiased;
    }

    body, input,textarea, select, button{
        font: 14px 'Roboto', sans-serif!important;
    }

    a{
        text-decoration: none;
    }

    ul{
        list-style: none;
    }

    button{
        cursor: pointer;
    }

    label {
      font-weight: bold;
      color: #444444;
      margin-bottom: 10px;
      display: block;
    }
    .grid-1 input, .grid-1 select,.grid-3 input, .grid-3 select{
      border-radius: 6px;
    }

  .grid-1 input, .grid-1 select,  .grid-3 input, .grid-3 select  {
    width: 100%;
    min-height: 46px;
    max-height: 46px;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #dddddd;
  }

  .grid-1 .item {
    flex-flow: column nowrap;
  }
  .grid-1 {
    flex-flow: row nowrap;
    margin-bottom: 15px;
  }

  .grid-3 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  @-webkit-keyframes rotating {
      from{
          -webkit-transform: rotate(0deg);
      }
      to{
          -webkit-transform: rotate(360deg);
      }
  }

  .loading-class {
      -webkit-animation: rotating 1s linear infinite;
      margin: 20px;
  }
`;
