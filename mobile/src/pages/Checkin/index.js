import React, { useState, useEffect } from 'react';
import { Image, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, NewCheckinButton, HeaderTop, List, Text } from './styles';

import CheckinItem from '../../components/CheckinItem';

function Checkin({ isFocused }) {
  const profile = useSelector(state => state.user.profile);
  console.tron.log(profile);

  const [checkins, setCheckins] = useState([]);

  async function loadCheckins() {
    const response = await api.get(`/students/${profile.id}/checkins`);
    setCheckins(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function handleCheckin(id) {
    try {
      await api.post(`/students/${id}/checkins`);
      loadCheckins();
      Alert.alert('Sucesso!', 'Checkin Seu Checkin foi registrado!');
    } catch (err) {
      Alert.alert('Falha!', 'Não foi possivel registrar o Checkin');
    }
  }

  return (
    <Container>
      <NewCheckinButton onPress={() => handleCheckin(profile.id)}>
        <Text>Novo check-in</Text>
      </NewCheckinButton>
      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CheckinItem data={item} />}
      />
    </Container>
  );
}

Checkin.navigationOptions = ({ navigation }) => ({
  headerTitle: () => (
    <HeaderTop>
      <Image source={logo} style={{ width: 60, height: 38 }} />
    </HeaderTop>
  ),
});

export default withNavigationFocus(Checkin);
