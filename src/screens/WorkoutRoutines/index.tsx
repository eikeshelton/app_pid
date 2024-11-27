import React from 'react';
import {
  ButtonEdit,
  Container,
  ContainerEdit,
  ContainerExerciseList,
  ContainerFlatList,
  ContainerList,
  IconEdit,
  LabelText,
  PageTitleText,
} from './styles';
import BackButton from '../../components/BackButton';
import {FlatList} from 'react-native';

export function WorkoutRoutines() {
  const dataitem = [
    {
      nome: 'A',
      idTreino: 1,
      descricao: 'Treino focado no aumento de força',
      DiaSemana: 'Segunda-feira',
      exercicios: [
        {
          nome: 'Flexão',
          idExercicio: 1,
          series: 3,
          carga: 10,
          repeticoes: 15,
          tempoDescanso: 60,
        },
        {
          nome: 'Agachamento',
          idExercicio: 2,
          series: 4,
          carga: 20,
          repeticoes: 12,
          tempoDescanso: 90,
        },
      ],
    },
    {
      nome: 'B',
      idTreino: 2,
      descricao: 'Treino focado no aumento de força',
      DiaSemana: 'Segunda-feira',
      exercicios: [
        {
          nome: 'Flexão',
          idExercicio: 1,
          series: 3,
          carga: 10,
          repeticoes: 15,
          tempoDescanso: 60,
        },
        {
          nome: 'Agachamento',
          idExercicio: 2,
          series: 4,
          carga: 20,
          repeticoes: 12,
          tempoDescanso: 90,
        },
      ],
    },
  ];
  return (
    <Container>
      <BackButton />
      <PageTitleText>Meus treinos</PageTitleText>
      <ContainerFlatList>
        <FlatList
          data={dataitem}
          renderItem={({item}) => (
            <ContainerList>
              <ContainerEdit>
                <LabelText>Treino: {item.nome}</LabelText>
                <ButtonEdit>
                  <IconEdit name="edit" />
                </ButtonEdit>
              </ContainerEdit>
              <LabelText>Descriçao: {item.descricao}</LabelText>
              {item.exercicios.map(exercicio => (
                <ContainerExerciseList>
                  <LabelText> {exercicio.nome}</LabelText>
                  <LabelText> Séries: {exercicio.series}</LabelText>
                  <LabelText> Repetições: {exercicio.repeticoes}</LabelText>
                </ContainerExerciseList>
              ))}
            </ContainerList>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ContainerFlatList>
    </Container>
  );
}
