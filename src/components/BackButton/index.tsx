import React from 'react';

import {Container, IconBack} from './styles';
import {useNavigation} from '@react-navigation/native';

function BackButton() {
  const navigation = useNavigation();
  return (
    <Container onPress={navigation.goBack}>
      <IconBack name="arrow-back" />
    </Container>
  );
}

export default BackButton;
