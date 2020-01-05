import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #dddddd;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const ContentInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Status = styled.Text`
  font-weight: bold;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${props => (props.answered ? '#42cb59' : '#999999')};
`;

export const Time = styled.Text`
  color: #999;
  font-size: 13px;
  margin-top: 4px;
`;

export const TextQuestion = styled.Text`
  color: #999;
  font-size: 14px;
  margin-top: 4px;
  flex: 1;
  width: 100%;
  padding: 15px 0px;
`;
