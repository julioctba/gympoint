import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import api from '../../services/api';
import logo from '../../assets/logo.png';

import { Container, NewCheckinButton, HeaderTop, List, Text } from './styles';

import HelpOrdersItem from '../../components/HelpOrdersItem';

function HelpOrder({ isFocused, navigation }) {
  const profile = useSelector(state => state.user.profile);
  console.tron.log(profile);

  const [helpOrders, setHelpOrders] = useState([]);

  async function loadHelpOrders() {
    const response = await api.get(`/students/${profile.id}/help-orders`);
    setHelpOrders(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Container>
      <NewCheckinButton onPress={() => navigation.navigate('NewHelpOrder')}>
        <Text>Novo pedido de auxílio</Text>
      </NewCheckinButton>
      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HelpOrdersItem navigation={navigation} data={item} />
        )}
      />
    </Container>
  );
}

HelpOrder.navigationOptions = ({ navigation }) => ({
  headerTitle: () => (
    <HeaderTop>
      <Image source={logo} style={{ width: 60, height: 38 }} />
    </HeaderTop>
  ),
});

export default withNavigationFocus(HelpOrder);
