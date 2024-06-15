import React from 'react';
import {
  ContainerImagemRegister,
  ContainerRegister,
  ContainerSearch,
  ContainerSeparator,
  ContainerTrainingPartnerNav,
  PageTitleText,
  RegisterText,
  ScreenBackground,
  SearchText,
  SeparatorText,
} from './style';
import CustomButton from '../../components/CustomizeButton';
import {useNavigation} from '@react-navigation/native';
import TopImage from '../../components/TopImage';

export default function TrainingPartner() {
  const navigation = useNavigation();

  return (
    <ScreenBackground>
      <ContainerTrainingPartnerNav>
        <PageTitleText>Parceiro de Treino</PageTitleText>
        <ContainerImagemRegister>
          <TopImage />
        </ContainerImagemRegister>
        <ContainerRegister>
          <RegisterText>
            Cadastre um treino para que outros usuários possam te chamar para
            treinar junto:
          </RegisterText>
          <CustomButton
            texto="Cadastrar Treino"
            onPress={() => navigation.navigate('TrainingPartnerRegister')}
          />
        </ContainerRegister>
        <ContainerSeparator>
          <SeparatorText>OU</SeparatorText>
        </ContainerSeparator>
        <ContainerSearch>
          <SearchText>
            Busque por usuários que já possuam treinos cadastrados:
          </SearchText>
          <CustomButton
            texto="Buscar Parceiro"
            onPress={() => navigation.navigate('TrainingPartnerSearch')}
          />
        </ContainerSearch>
      </ContainerTrainingPartnerNav>
    </ScreenBackground>
  );
}
