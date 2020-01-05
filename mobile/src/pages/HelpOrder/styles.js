import styled from 'styled-components';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const HeaderTop = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
`;

export const List = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 15 },
})``;

export const NewCheckinButton = styled(RectButton)`
  height: 46px;
  background: #ee4e62;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 30px 15px 0px 15px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
