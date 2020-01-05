import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;

  form {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
  }
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;

  .grid-3 .item {
    flex-flow: column nowrap;
    width: 32%;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30px 0px;
  flex: 1;

  h1 {
    color: #444444;
    font-size: 24px;
  }
`;

export const HeaderRight = styled.div`
  svg {
    display: block;
    float: left;
  }
`;

export const ButtonHaderBack = styled.button`
  cursor: pointer;
  padding: 10px;
  background: #cccccc;
  border: 0px;
  border-radius: 4px;
  min-width: 142px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold !important;
  line-height: 20px !important;
  margin-right: 20px;
`;

export const ButtonHaderSave = styled.button`
  cursor: pointer;
  padding: 10px;
  background: #ee4d64;
  border: 0px;
  border-radius: 4px;
  min-width: 142px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold !important;
  line-height: 20px !important;
`;
