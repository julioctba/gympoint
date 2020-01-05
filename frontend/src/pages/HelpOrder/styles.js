import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 700px;
  margin: 0 auto;

  .popup-content {
    max-width: 450px;
    border-radius: 7px;
    padding: 30px !important;
    text-align: left;
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
    background: #fff;
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

export const StatusQuestion = styled.td`
  span {
    background: #f79400;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    font-size: 12px;
  }
  ${props =>
    props.answered &&
    css`
      span {
        background: #42cb59;
        color: #fff;
      }
    `}
`;
