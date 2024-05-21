import React, {useState} from 'react';
import {Container, ContainerEmail} from './style';
import CustomButton from '../../components/CustomizeButton';
import TopImage from '../../components/TopImage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';

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
        <InputComponent
          onChangeText={text => setEmail(text)}
          value={Email}
          placeholderTextColor={'white'}
          placeholder="Email"
          isFocused={true} // O campo está focado quando esta prop é true
          inputId={9}
        />
        <CustomButton texto="Enviar" onPress={handlerequestPasswordReset} />
      </ContainerEmail>
    </Container>
  );
}
