import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, TouchableOpacity, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../../assets/logo.png';

import api from '../../../services/api';

import { Container, HeaderTop, Form, SubmitButton, TextArea } from './styles';

function NewHelpOrder({ isFocused, navigation }) {
  const [helpOrder, setHelpOrder] = useState('');

  const profile = useSelector(state => state.user.profile);

  async function handleSubmit() {
    try {
      console.tron.log(helpOrder);
      await api.post(`/students/${profile.id}/help-orders`, {
        question: helpOrder,
      });

      Alert.alert('Sucesso!', 'Pergunta enviada com sucesso!');
      navigation.goBack();
    } catch (err) {
      Alert.alert(
        'Falha no envio da pergunta',
        'Revise as informações enviadas'
      );
    }
  }

  return (
    <Container>
      <Form>
        <TextArea
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="send"
          multiline
          numberOfLines={20}
          value={helpOrder}
          onChangeText={setHelpOrder}
          style={{ textAlignVertical: 'top' }}
        />

        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Form>
    </Container>
  );
}

NewHelpOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: () => (
    <HeaderTop>
      <Image source={logo} style={{ width: 60, height: 38, marginRight: 56 }} />
    </HeaderTop>
  ),
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#000000" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(NewHelpOrder);
