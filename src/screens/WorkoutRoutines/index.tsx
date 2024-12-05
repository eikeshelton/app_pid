import React, {useEffect, useState} from 'react';
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
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
interface Exercicio {
  notas: string;
  series: number;
  tempo_descanso_seg: number;
  id: number;
  nome_exercicio: string;
  repeticoes: number;
  carga_kg: number;
  descricao: string;
}

interface Treinamento {
  usuario_id: number;
  descricao: string;
  is_publico: boolean;
  nome: string;
  id: number;
  dia_da_semana: string | null;
}

interface TreinamentoComExercicios {
  treinamento: Treinamento;
  exercicios: Exercicio[];
}

export function WorkoutRoutines() {
  const {user} = useAuth();
  const [dataItem, setDataItem] = useState<TreinamentoComExercicios[]>([]);
  const ListaTreinamentos = async () => {
    try {
      const response = await api.get(`/treinamentos/${user.id}`);
      setDataItem(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    ListaTreinamentos();
  }, []);
  return (
    <Container>
      <BackButton />
      <PageTitleText>Meus treinos</PageTitleText>
      <ContainerFlatList>
        <FlatList
          data={dataItem}
          renderItem={({item}) => (
            <ContainerList>
              <ContainerEdit>
                <LabelText>Treino: {item.treinamento.nome}</LabelText>
                <ButtonEdit>
                  <IconEdit name="edit" />
                </ButtonEdit>
              </ContainerEdit>
              <LabelText>Descrição: {item.treinamento.descricao}</LabelText>
              <LabelText>
                Dia: {item.treinamento.dia_da_semana || 'Não definido'}
              </LabelText>
              {item.exercicios.map(exercicio => (
                <ContainerExerciseList key={exercicio.id}>
                  <LabelText>{exercicio.nome_exercicio}</LabelText>
                  <LabelText>Séries: {exercicio.series}</LabelText>
                  <LabelText>Repetições: {exercicio.repeticoes}</LabelText>
                  <LabelText>Carga (kg): {exercicio.carga_kg}</LabelText>
                  <LabelText>Descriçao: {exercicio.descricao}</LabelText>
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
