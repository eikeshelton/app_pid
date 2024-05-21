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
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {InputComponent} from '../../components/Input';
import InputPicker from '../../components/InputPicker';

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

    const novaData = new Date(
      parseInt(ano, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10),
    );

    const dataFormatada = format(novaData, 'yyyy-MM-dd');

    const usuarioCreate: UsuarioCreate = {
      email: email,
      nome_usuario: usuario,
      login: login,
      senha: senha,
      tipo_usuario: tipoUsuario,
      data_nascimento: dataFormatada,
      foto_perfil: '',
      bio: '',
    };

    criarUsuario(usuarioCreate)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  };

  const tipoUsuarioItems = [
    {label: 'Atleta', value: 'atleta'},
    {label: 'Entusiasta', value: 'entusiasta'},
    {label: 'Nutricionista', value: 'nutricionista'},
    {label: 'Treinador', value: 'treinador'},
  ];

  return (
    <ScreenBackgroundRegister>
      <ContainerImagemRegister>
        <TopImage />
      </ContainerImagemRegister>

      <ContainerInputRegister>
        <ScrollView>
          <InputComponent
            onChangeText={text => setUsuario(text)}
            value={usuario}
            placeholderTextColor={'white'}
            placeholder="Nome"
            isFocused={true}
            inputId={10}
          />
          <InputComponent
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor={'white'}
            placeholder="Email"
            keyboardType="email-address"
            isFocused={true}
            inputId={11}
          />
          <InputComponent
            onChangeText={text => setLogin(text)}
            value={login}
            placeholderTextColor={'white'}
            placeholder="Login"
            isFocused={true}
            inputId={12}
          />
          <InputComponent
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Senha"
            secureTextEntry={true}
            isFocused={true}
            inputId={3}
          />
          <InputComponent
            onChangeText={text => setConfirmarSenha(text)}
            value={confirmarSenha}
            placeholderTextColor={'white'}
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            isFocused={true}
            inputId={14}
          />
          <InputComponent
            onChangeText={(formatted, extracted: any) => {
              return setDataNascimento(extracted);
            }}
            mask="[00]/[00]/[0000]"
            placeholderTextColor={'white'}
            placeholder="Data de Nascimento"
            keyboardType="numeric"
            isFocused={true}
            inputId={15}
          />
          <InputPicker
            items={tipoUsuarioItems}
            onValueChange={(value: string) => setTipoUsuario(value)}
            placeholder={{label: 'Tipo de Usuário', value: null}}
          />
        </ScrollView>
        <CustomButton texto="Cadastre-se" onPress={handleRegister} />
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default Register;
