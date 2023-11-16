import React, {useState} from 'react';
import CustonButton from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {Input} from '../../components/Input/style';


export default function  TrainingPartner () {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [grupamentoMuscular, setGrupamentoMuscular] = useState('');
  const [local, setLocal] = useState('');
  const [sexo, setSexo] = useState('');
  const [modalidade, setModalidade] = useState('');




  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <Input
            onChangeText={text => setData(text)}
            value={data}
            placeholderTextColor={'white'}
            placeholder="Data:"
          />
          <Input
            onChangeText={text => setHorario(text)}
            value={horario}
            placeholderTextColor={'white'}
            placeholder="Horário:"
          />

          <Input
            onChangeText={text => setGrupamentoMuscular(text)}
            value={grupamentoMuscular}
            placeholderTextColor={'white'}
            placeholder="Grupamento muscular:"

          />
          <Input
            onChangeText={text => setLocal(text)}
            value={local}
            placeholderTextColor={'white'}
            placeholder="Local:"

          />
          <Input
            onChangeText={text => setSexo(text)}
            value={sexo}
            placeholderTextColor={'white'}
            placeholder="Sexo:"
          />
          <Input
            onChangeText={text => setModalidade(text)}
            value={modalidade}
            placeholderTextColor={'white'}
            placeholder="Modalidade:"
          />
        </ScrollView>
        <CustonButton texto="Procurar" />

      </ContainerInputRegister>

    </ScreenBackgroundRegister>
  );
}

