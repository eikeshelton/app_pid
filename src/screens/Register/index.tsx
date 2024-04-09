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
import { useNavigation } from '@react-navigation/native';

function Register() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [datanascimento, setDataNascimento] = useState('');
  const [tipousuario, setTipoUsuario] = useState('');




  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <Input
            onChangeText={text => setUsuario(text)}
            value={usuario}
            placeholderTextColor={'white'}
            placeholder="Usuário:"
          />
          <Input
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor={'white'}
            placeholder="Email:"
            keyboardType="email-address"
          />

          <Input
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Senha:"
            secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
          />
          <Input
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Confirmar senha:"
            secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
          />
          <Input
            onChangeText={text => setDataNascimento(text)}
            value={datanascimento}
            placeholderTextColor={'white'}
            placeholder="Data de nascimento:"
          />
          <Input
            onChangeText={text => setTipoUsuario(text)}
            value={tipousuario}
            placeholderTextColor={'white'}
            placeholder="Tipo de usuário:"
          />
        </ScrollView>
        <CustonButton texto="Cadastre-se" onPress={() => navigation.navigate('Login')} />

      </ContainerInputRegister>

    </ScreenBackgroundRegister>
  );
}
export default Register;
