import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 15px;
`;

export const Content = styled.View`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dddddd;
  flex-direction: column;
`;

export const HeaderTop = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
`;

export const Text = styled.Text`
  color: #666666;
  font-weight: normal;
  font-size: 14px;
  padding-bottom: 15px;
`;

export const Title = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding-bottom: 15px;
`;
