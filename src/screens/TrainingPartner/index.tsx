import React, {useState} from 'react';
import CustonButton from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {InputComponent} from '../../components/Input';

export default function TrainingPartner() {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [grupamentoMuscular, setGrupamentoMuscular] = useState('');
  const [local, setLocal] = useState('');
  const [sexo, setSexo] = useState('');
  const [modalidade, setModalidade] = useState('');
  const handlePress = () => {
    // Função vazia, não faz nada
  };

  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <InputComponent
            onChangeText={text => setData(text)}
            value={data}
            placeholderTextColor={'white'}
            placeholder="Data:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={26}
          />
          <InputComponent
            onChangeText={text => setHorario(text)}
            value={horario}
            placeholderTextColor={'white'}
            placeholder="Horário:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={27}
          />

          <InputComponent
            onChangeText={text => setGrupamentoMuscular(text)}
            value={grupamentoMuscular}
            placeholderTextColor={'white'}
            placeholder="Grupamento muscular:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={28}
          />
          <InputComponent
            onChangeText={text => setLocal(text)}
            value={local}
            placeholderTextColor={'white'}
            placeholder="Local:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={29}
          />
          <InputComponent
            onChangeText={text => setSexo(text)}
            value={sexo}
            placeholderTextColor={'white'}
            placeholder="Sexo:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={30}
          />
          <InputComponent
            onChangeText={text => setModalidade(text)}
            value={modalidade}
            placeholderTextColor={'white'}
            placeholder="Modalidade:"
            isFocused={true} // O campo está focado quando esta prop é true
            inputId={31}
          />
        </ScrollView>
        <CustonButton texto="Procurar" onPress={handlePress} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}
