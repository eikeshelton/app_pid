import React, {useState} from 'react';
import {
  Container,
  ContainerBackButton,
  ContainerInputRegister,
  ContainerList,
  ContainerListHeaderComponent,
  IconBack,
  LabelText,
  ModalContainer,
  PageTitleText,
} from './styles';
import BackButton from '../../components/BackButton';
import {InputComponent} from '../../components/Input';
import {FlatList} from 'react-native-gesture-handler';
import CustomButton from '../../components/CustomizeButton';
import {Modal, ScrollView} from 'react-native';
import InputPicker from '../../components/InputPicker';

export function PlanWorkout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [load, setLoad] = useState('');
  const [rest, setRest] = useState('');
  const [description, setDescription] = useState('');
  const [weekday, setWeekday] = useState('');
  const [nameWorkout, setNameWorkout] = useState('');
  const [dataitem, setDataitem] = useState<
    {
      nome: string;
      series: number; // Alterado para number
      carga: number; // Alterado para number
      repeticoes: number; // Alterado para number
      tempoDescanso: number; // Alterado para number
    }[]
  >([]);

  const handleAddExercise = () => {
    if (exercise.trim() === '') {
      return;
    }

    const newExercise = {
      nome: exercise,
      series: sets ? parseInt(sets, 10) : 0, // Corrigido para "series"
      repeticoes: reps ? parseInt(reps, 10) : 0,
      carga: load ? parseFloat(load) : 0,
      tempoDescanso: rest ? parseInt(rest, 10) : 0,
    };

    setDataitem(prevDataitem => [...prevDataitem, newExercise]);

    // Limpar os campos após adicionar
    setExercise('');
    setReps('');
    setSets('');
    setLoad('');
    setRest('');
  };
  const handleOpenModal = () => {
    setModalVisible(true);
  };
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
                onChangeText={text => setExercise(text)}
                value={exercise}
                placeholderTextColor={'silver'}
                placeholder="Obrigatório"
                isFocused={true}
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
              {exercise && (
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
                onChangeText={text => setNameWorkout(text)}
                value={nameWorkout}
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
              onPress={() => setModalVisible(false)}
            />
          </ContainerInputRegister>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
