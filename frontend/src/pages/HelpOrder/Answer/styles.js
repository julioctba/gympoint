import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 0px;
`;

export const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;

  h2 {
    font-weight: bold;
    color: #444444;
    margin-bottom: 10px;
    display: block;
    font-size: 14px;
    text-transform: uppercase;
  }
  p {
    font-size: 16px;
    padding-bottom: 20px;
  }
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #dddddd;
    min-height: 150px;
    text-size-adjust: auto;
  }
  button {
    width: 100%;
    margin: 5px 0 0;
    height: 44px;
    background: #ee4d64;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    font-weight: bold;

    &:hover {
      background: ${darken(0.03, '#ee4d64')};
    }
  }
`;
