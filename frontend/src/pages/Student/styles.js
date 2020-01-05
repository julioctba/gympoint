import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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

export const HeaderRight = styled.div``;

export const ButtonHader = styled.button`
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

  svg {
    display: block;
    float: left;
  }
`;
export const InputHeader = styled.input`
  padding: 8px;
  border: #dddddd 1px solid;
  border-radius: 4px;
  margin-left: 20px;
`;

export const DivTable = styled.div`
  padding: 20px;
  background: #fff;
`;

export const ContentTable = styled.table`
  background: #fff;
  flex: 1;
  width: 100%;

  border-spacing: 0px !important;
  border-collapse: collapse;

  thead {
    font-weight: bold;
    color: #444444;
  }

  tbody {
    color: #666666;
  }

  td {
    padding: 15px;
  }
  tr {
    border-bottom: 1px solid #eee !important;
  }

  .edit {
    color: #4d85ee;
    border: 0px;
    margin-right: 10px;
  }
  .delete {
    color: #de3b3b;
    border: 0px;
    margin-right: 10px;
  }
  .action {
    text-align: right;
  }
`;

export const Button = styled.button.attrs({
  type: 'button',
})`
  background: #fff;
`;
