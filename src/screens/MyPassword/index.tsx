import React, {useState} from 'react';

import {Container, ContainerEmail} from './style';
import {Input} from '../../components/Input/style';
import CustomButton from '../../components/CustomizeButton';
import TopImage from '../../components/TopImage';
import {useNavigation} from '@react-navigation/native';


export default function MyPassword(){
  const [Email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
    <Container>
      <TopImage/>
      <ContainerEmail>
      <Input
      value= {Email}
      placeholder="Email"
      onChangeText={setEmail}
      placeholderTextColor={'white'}

      />
      <CustomButton texto="Enviar" onPress={() => navigation.navigate('Login')}
/>
</ContainerEmail>

    </Container>
  );
}
