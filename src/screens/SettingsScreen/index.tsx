import React from 'react';
import {
  Container,
  ContainerOptions,
  OptionsText,
  Title,
  TouchOptions,
} from './styles';
import CustonButton from '../../components/CustomizeButton';
import {useAuth} from '../../hooks/auth';
import BackButton from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';

export function SettingsScreen() {
  const navigation = useNavigation();
  const {signOut} = useAuth();
  function HandleLogout() {
    signOut();
  }
  function HandleEditReg() {
    navigation.navigate('EditReg');
  }
  return (
    <Container>
      <BackButton />
      <Title>Configurações</Title>
      <ContainerOptions>
        <TouchOptions onPress={HandleEditReg}>
          <OptionsText>Editar Cadastro</OptionsText>
        </TouchOptions>
      </ContainerOptions>
      <CustonButton texto="Sair" onPress={HandleLogout} />
    </Container>
  );
}
