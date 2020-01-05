import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../../assets/logo.png';

import { Container, Content, Title, HeaderTop, Text } from './styles';

// import { Container } from './styles';

function ShowAnswer({ isFocused, navigation }) {
  const data = navigation.getParam('data');

  return (
    <Container>
      <Content>
        <Title>Pergunta</Title>
        <Text>{data.question}</Text>
        {data.answer && (
          <>
            <Title>Resposta</Title>
            <Text>{data.answer}</Text>
          </>
        )}
      </Content>
    </Container>
  );
}

ShowAnswer.navigationOptions = ({ navigation }) => ({
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

export default withNavigationFocus(ShowAnswer);
