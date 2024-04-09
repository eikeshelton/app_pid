import React, {useState} from 'react';
import CustomButton  from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import TopImage from '../../components/TopImage';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {Input} from '../../components/Input/style';
import { useNavigation } from '@react-navigation/native';
import api from '../../../server/api';
interface UsuarioCreate {
  email: string;
  nome_usuario: string;
  login: string;
  senha: string;
  tipo_usuario: string;
  data_nascimento: string;
  foto_perfil: string;
  bio: string;
}

const criarUsuario = async (usuarioCreate: UsuarioCreate) => {
  console.log(usuarioCreate);
  try {
    const response = await api.post('/usuarios/', usuarioCreate);

    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

function Register() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleRegister = () => {
    if (senha !== confirmarSenha) {
      console.error('As senhas não correspondem.');
      return;
    }

    // Aqui você pode chamar a função para criar o usuário
    const usuarioCreate: UsuarioCreate = {
      email,
      nome_usuario: usuario,
      login: email, // Ou qualquer outro valor que seja apropriado
      senha,
      tipo_usuario: tipoUsuario,
      data_nascimento: dataNascimento,
      foto_perfil: '', // Você precisa definir um valor para a foto de perfil
      bio: '', // Você precisa definir um valor para a bio
    };

    criarUsuario(usuarioCreate)
      .then(() => {
        console.log('Usuário criado com sucesso!');
        navigation.navigate('Login');
      })
      .catch((error) => console.error('Erro ao criar usuário:', error));

  };

  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <Input
            onChangeText={(text) => setUsuario(text)}
            value={usuario}
            placeholderTextColor={'white'}
            placeholder="Usuário:"
          />
          <Input
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholderTextColor={'white'}
            placeholder="Email:"
            keyboardType="email-address"
          />
          <Input
            onChangeText={(text) => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Senha:"
            secureTextEntry={true}
          />
          <Input
            onChangeText={(text) => setConfirmarSenha(text)}
            value={confirmarSenha}
            placeholderTextColor={'white'}
            placeholder="Confirmar senha:"
            secureTextEntry={true}
          />
          <Input
            onChangeText={(text) => setDataNascimento(text)}
            value={dataNascimento}
            placeholderTextColor={'white'}
            placeholder="Data de nascimento:"
          />
          <Input
            onChangeText={(text) => setTipoUsuario(text)}
            value={tipoUsuario}
            placeholderTextColor={'white'}
            placeholder="Tipo de usuário:"
          />
        </ScrollView>
        <CustomButton texto="Cadastre-se" onPress={handleRegister} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default Register;
