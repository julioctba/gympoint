import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import TouchableOpacity from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Status, Time, TextQuestion, ContentInfo } from './styles';

export default function CheckinItem({ data, navigation }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <Container
      onStartShouldSetResponder={() => {
        navigation.navigate('ShowAnswer', { data });
      }}
    >
      <ContentInfo>
        <Status answered={!!data.answer}>
          <Icon name="check-circle" size={16} />
          {data.answer ? 'Respondido' : 'Sem resposta'}
        </Status>
        <Time>{dateParsed}</Time>
      </ContentInfo>
      <TextQuestion>{data.question}</TextQuestion>
    </Container>
  );
}
