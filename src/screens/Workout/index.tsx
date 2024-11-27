import React from 'react';
import CustonButton from '../../components/CustomizeButton';

import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  PageTitleText,
  ScreenBackgroundRegister,
} from './style';
import {useNavigation} from '@react-navigation/native';

function Workout({}) {
  const navigation = useNavigation();
  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <PageTitleText>Treinos</PageTitleText>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <CustonButton
          texto="Novo Treino"
          onPress={() => navigation.navigate('PlanWorkout')}
        />
        <CustonButton
          texto="Meus treinos"
          onPress={() => navigation.navigate('WorkoutRoutines')}
        />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default Workout;
