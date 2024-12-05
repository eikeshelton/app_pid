import React, {useEffect, useState} from 'react';
import {
  Container,
  ContainerBackButton,
  ContainerInputRegister,
  ContainerList,
  ContainerListHeaderComponent,
  ContainerWorkouts,
  IconBack,
  LabelText,
  ModalContainer,
  PageTitleText,
  WorkoutsName,
} from './styles';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';
import {FlatList} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomizeButton';
import {Alert, Modal, ScrollView} from 'react-native';
import InputPicker from '../../components/InputPicker';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';
interface Workout {
  id: number;
  nome: string;
  descricao: string;
}
export function PlanWorkout() {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [load, setLoad] = useState('');
  const [rest, setRest] = useState('');
  const [observation, setObservation] = useState('');
  const [description, setDescription] = useState('');
  const [weekday, setWeekday] = useState('');
  const [nameWorkout, setNameWorkout] = useState('');
  const [workout, setWorkout] = useState('');
  const [idWorkout, setIdworkout] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const [dataitem, setDataitem] = useState<
    {
      nome: string;
      series: number; // Alterado para number
      carga: number; // Alterado para number
      repeticoes: number; // Alterado para number
      tempoDescanso: number; // Alterado para number
      nota: string;
      id_exercicio: number;
    }[]
  >([]);
  const handleAddExercise = () => {
    if (nameWorkout.trim() === '') {
      return;
    }

    const newExercise = {
      nome: nameWorkout,
      series: sets ? parseInt(sets, 10) : 0, // Corrigido para "series"
      repeticoes: reps ? parseInt(reps, 10) : 0,
      carga: load ? parseFloat(load) : 0,
      tempoDescanso: rest ? parseInt(rest, 10) : 0,
      nota: observation,
      id_exercicio: idWorkout ? parseInt(idWorkout, 10) : 0,
    };

    setDataitem(prevDataitem => [...prevDataitem, newExercise]);
    console.log(dataitem);
    // Limpar os campos após adicionar
    setNameWorkout('');
    setReps('');
    setSets('');
    setLoad('');
    setRest('');
  };
  const handleOpenModal = () => {
    setModalVisible(true);
    console.log(dataitem);
  };
  const handleSelectWorkout = (item: any) => {
    setIdworkout(item.id);
    setNameWorkout(item.nome);
  };
  const handleChangeText = (text: string) => {
    setNameWorkout(text);
  };
  const Buscar_exercicio_por_nome = async () => {
    try {
      const response = await api.get(`exercicio_api/${nameWorkout}`);

      setWorkouts(response.data);
    } catch (error) {}
  };
  const handleSearchWorkout = React.useCallback(() => {
    Buscar_exercicio_por_nome();
  }, [nameWorkout]);
  const clearUsersSearch = async () => {
    setWorkouts([]);
  };
  const enviar_lista_exercicios = async () => {
    try {
      const response = await api.post(`/treinamento/${user.id}`, {
        nome: workout,
        descricao: description,
        dia_da_semana: weekday,
        exercicios: dataitem,
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Treinamento enviado com sucesso!', [
          {text: 'OK', onPress: () => navigation.navigate('Workout')},
        ]);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Erro',
        'Não foi possível enviar o treinamento. Tente novamente.',
        [{text: 'OK', onPress: () => console.log('Alerta de erro fechado')}],
      );
    }
  };
  useEffect(() => {
    if (nameWorkout.length > 0) {
      handleChangeText(nameWorkout);
      handleSearchWorkout();
    } else {
      clearUsersSearch();
      // Chame a função para limpar userssearch
    }
  }, [nameWorkout]);
  return (
    <Container>
      <BackButton />
      <ContainerInputRegister>
        <FlatList
          ListHeaderComponent={
            <ContainerListHeaderComponent>
              <PageTitleText>Inserir exercício</PageTitleText>
              <LabelText>Nome do exercício</LabelText>
              <InputComponent
                onChangeText={text => handleChangeText(text)}
                value={nameWorkout}
                placeholderTextColor={'silver'}
                placeholder="Obrigatório"
                isFocused={true}
              />
              <FlatList
                data={workouts}
                renderItem={({item}) => (
                  <ContainerWorkouts onPress={() => handleSelectWorkout(item)}>
                    <WorkoutsName>{item.nome}</WorkoutsName>
                    <WorkoutsName>{item.descricao}</WorkoutsName>
                  </ContainerWorkouts>
                )}
                keyExtractor={item => item.id.toString()}
              />

              <LabelText>Séries</LabelText>
              <InputComponent
                onChangeText={text => setSets(text)}
                value={sets}
                placeholderTextColor={'silver'}
                placeholder="Opcional:"
                isFocused={true}
                keyboardType="numeric"
              />
              <LabelText>Repetições</LabelText>
              <InputComponent
                onChangeText={text => setReps(text)}
                value={reps}
                placeholderTextColor={'silver'}
                placeholder="Opcional:"
                isFocused={true}
                keyboardType="numeric"
              />
              <LabelText>Carga</LabelText>
              <InputComponent
                onChangeText={text => setLoad(text)}
                value={load}
                placeholderTextColor={'silver'}
                placeholder="Opcional em KG:"
                isFocused={true}
                keyboardType="numeric"
              />
              <LabelText>Tempo de descanso</LabelText>
              <InputComponent
                onChangeText={text => setRest(text)}
                value={rest}
                placeholderTextColor={'silver'}
                placeholder="Opcional em Segundos:"
                isFocused={true}
                keyboardType="numeric"
              />
              <LabelText>Observações</LabelText>
              <InputComponent
                onChangeText={text => setObservation(text)}
                value={observation}
                placeholderTextColor={'silver'}
                placeholder="Opcional:"
                isFocused={true}
                keyboardType="numeric"
              />
              {nameWorkout && (
                <CustomButton
                  texto="Cadastrar exercício"
                  onPress={handleAddExercise}
                />
              )}
              {dataitem.length > 0 && <PageTitleText>Exercícios</PageTitleText>}
            </ContainerListHeaderComponent>
          }
          data={dataitem}
          renderItem={({item}) => (
            <ContainerList>
              <LabelText>Nome: {item.nome}</LabelText>
              <LabelText>Séries: {item.series}</LabelText>
              <LabelText>Carga: {item.carga}KG</LabelText>
              <LabelText>Repetições: {item.repeticoes}</LabelText>
              <LabelText>Tempo de descanso: {item.tempoDescanso}Seg</LabelText>
            </ContainerList>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            dataitem.length === 0 ? <ContainerListHeaderComponent /> : null
          }
        />
        {dataitem.length > 0 && (
          <CustomButton texto="Cadatrar" onPress={handleOpenModal} />
        )}
      </ContainerInputRegister>
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <ModalContainer>
          <ContainerBackButton onPress={() => setModalVisible(false)}>
            <IconBack name="arrow-back" />
          </ContainerBackButton>
          <ContainerInputRegister>
            <ScrollView>
              <PageTitleText>Lista de Exercícios</PageTitleText>
              <LabelText>Nome do Treino</LabelText>
              <InputComponent
                onChangeText={text => setWorkout(text)}
                value={workout}
                placeholderTextColor={'silver'}
                placeholder="Obrigatório:"
                isFocused={true}
              />
              <LabelText>Descrição</LabelText>
              <InputComponent
                onChangeText={text => setDescription(text)}
                value={description}
                placeholderTextColor={'silver'}
                placeholder="Opcional:"
                isFocused={true}
              />
              <LabelText>Dia da semana</LabelText>
              <InputPicker
                items={[
                  {label: 'Segunda-feira', value: 'Segunda-feira'},
                  {label: 'Terça-feira', value: 'Terça-feira'},
                  {label: 'Quarta-feira', value: 'Quarta-feira'},
                  {label: 'Quinta-feira', value: 'Quinta-feira'},
                  {label: 'Sexta-feira', value: 'Sexta-feira'},
                  {label: 'Sábado-feira', value: 'Sábado-feira'},
                  {label: 'Domingo-feira', value: 'Domingo-feira'},
                ]}
                onValueChange={(value: string) => setWeekday(value)}
                placeholder={{
                  label: 'Opcional',
                  value: null,
                }}
              />
              {dataitem.map((item, index) => (
                <ContainerList key={index}>
                  <LabelText>Nome: {item.nome}</LabelText>
                  <LabelText>Séries: {item.series}</LabelText>
                  <LabelText>Carga: {item.carga}KG</LabelText>
                  <LabelText>Repetições: {item.repeticoes}</LabelText>
                  <LabelText>
                    Tempo de descanso: {item.tempoDescanso}Seg
                  </LabelText>
                </ContainerList>
              ))}
            </ScrollView>

            <CustomButton
              texto="Confirmar"
              onPress={() => enviar_lista_exercicios()}
            />
          </ContainerInputRegister>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
