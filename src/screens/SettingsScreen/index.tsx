import React from 'react';
import {Container, Title} from './styles';
import CustonButton from '../../components/CustomizeButton';
import {useAuth} from '../../hooks/auth';

export function SettingsScreen() {
  const {signOut} = useAuth();
  function HandleLogout() {
    signOut();
  }
  return (
    <Container>
      <Title>Configurações</Title>
      <CustonButton texto="Sair" onPress={HandleLogout} />
    </Container>
  );
}
