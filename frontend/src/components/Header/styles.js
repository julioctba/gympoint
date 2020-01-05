import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

    display: flex;
    align-items: center;

    img {
      padding-right: 20px;
      border-right: 1px solid #eee;
      margin-top: 16px;
    }

    a {
      font-weight: bold;
      color: #999999;
    }
    ul{
      display: flex;
      align-items: center;

      li{
        text-transform: uppercase;
        margin: 0 20px 0px 0px;
        line-height: 36px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    color: #333;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 10px;
  }
  button {
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #de3b3b;
    text-align: right;
    background: none;
    border: 0px;
    padding-top: 2px;
  }
`;
