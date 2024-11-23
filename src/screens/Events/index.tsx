import React from 'react';
import {
  ContainerImagemRegister,
  ContainerRegister,
  ContainerSearch,
  ContainerSeparator,
  ContainerTrainingPartnerNav,
  Header,
  PageTitleText,
  RegisterText,
  ScreenBackground,
  SearchText,
  SeparatorText,
} from './styles';
import TopImage from '../../components/TopImage';
import CustomButton from '../../components/CustomizeButton';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';

export default function Events() {
  const navigation = useNavigation();
  return (
    <ScreenBackground>
      <ContainerTrainingPartnerNav>
        <Header>
          <BackButton />
        </Header>
        <PageTitleText>Mural de Eventos</PageTitleText>
        <ContainerImagemRegister>
          <TopImage />
        </ContainerImagemRegister>
        <ContainerRegister>
          <RegisterText>
            Cadastre um evento para que outros usuários possam participar:
          </RegisterText>
          <CustomButton
            texto="Cadastrar Evento"
            onPress={() => navigation.navigate('EventsRegister')}
          />
        </ContainerRegister>
        <ContainerSeparator>
          <SeparatorText>OU</SeparatorText>
        </ContainerSeparator>
        <ContainerSearch>
          <SearchText>Encontre eventos acontecendo na sua cidade:</SearchText>
          <CustomButton
            texto="Buscar Eventos"
            onPress={() => navigation.navigate('EventsSearch')}
          />
        </ContainerSearch>
      </ContainerTrainingPartnerNav>
    </ScreenBackground>
  );
}
