import styled from 'styled-components';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 15px;
`;

export const HeaderTop = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
`;

export const Title = styled.Text`
  color: #444444;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  padding-bottom: 15px;
`;

export const Form = styled.View``;

export const TextArea = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  font-size: 15px;
  color: #333;
  padding: 15px;

  border: 1px solid #dddddd;
  background: #fff;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
