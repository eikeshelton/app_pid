import React, {useState} from 'react';

import {Container, ContainerEmail} from './style';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import TopImage from '../../components/TopImage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import BackButton from '../../components/BackButton';

export default function MyPassword() {
  const {requestPasswordReset} = useAuth();
  const [Email, setEmail] = useState('');
  const navigation = useNavigation();
  function handlerequestPasswordReset() {
    requestPasswordReset({
      email: Email,
    });
    navigation.navigate('ResetPassword');
  }
  return (
    <Container>
      <BackButton />
      <TopImage />
      <ContainerEmail>
        <Input
          onChangeText={text => setEmail(text)}
          value={Email}
          placeholderTextColor={'white'}
          placeholder="Email"
        />
        <CustomButton texto="Enviar" onPress={handlerequestPasswordReset} />
      </ContainerEmail>
    </Container>
  );
}
