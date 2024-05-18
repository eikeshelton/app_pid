import React, {useState} from 'react';
import CustomButton from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import TopImage from '../../components/TopImage';
import {format} from 'date-fns';
import {
  ContainerImagemRegister,
  ContainerInputRegister,
  ScreenBackgroundRegister,
} from './style';
import {Input} from '../../components/Input/style';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
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
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');

  const handleRegister = () => {
    if (senha !== confirmarSenha) {
      console.error('As senhas não correspondem.');
      return;
    }
    const cleanedText = dataNascimento.replace(/\D/g, '');
    const dia = cleanedText.substring(0, 2);
    const mes = cleanedText.substring(2, 4);
    const ano = cleanedText.substring(4, 8);

    // Cria um novo objeto Date
    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
    );

    // Formata a data no formato desejado (yyyy-mm-dd)
    const dataFormatada = format(novaData, 'yyyy-MM-dd');

    // Aqui você pode chamar a função para criar o usuário
    const usuarioCreate: UsuarioCreate = {
      email: email,
      nome_usuario: usuario,
      login: login, // Ou qualquer outro valor que seja apropriado
      senha: senha,
      tipo_usuario: tipoUsuario,
      data_nascimento: dataFormatada,
      foto_perfil: '', // Você precisa definir um valor para a foto de perfil
      bio: '', // Você precisa definir um valor para a bio
    };

    criarUsuario(usuarioCreate)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  };

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
            placeholder="Nome"
          />
          <Input
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor={'white'}
            placeholder="Email"
            keyboardType="email-address"
          />
          <Input
            onChangeText={text => setLogin(text)}
            value={login}
            placeholderTextColor={'white'}
            placeholder="Login"
          />
          <Input
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Senha"
            secureTextEntry={true}
          />
          <Input
            onChangeText={text => setConfirmarSenha(text)}
            value={confirmarSenha}
            placeholderTextColor={'white'}
            placeholder="Confirmar Senha"
            secureTextEntry={true}
          />
          <Input
            onChangeText={(formatted, extracted: any) => {
              return setDataNascimento(extracted);
            }}
            mask="[00]/[00]/[0000]"
            placeholderTextColor={'white'}
            placeholder="Data de Nascimento"
            keyboardType="numeric"
          />
          <Input
            onChangeText={text => setTipoUsuario(text)}
            value={tipoUsuario}
            placeholderTextColor={'white'}
            placeholder="Tipo de Usuário"
          />
        </ScrollView>
        <CustomButton texto="Cadastre-se" onPress={handleRegister} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default Register;
