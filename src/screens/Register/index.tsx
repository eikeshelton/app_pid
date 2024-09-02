import React, {useState} from 'react';
import CustomButton from '../../components/CustomizeButton';
import {ScrollView} from 'react-native';
import {format} from 'date-fns';
import {
  ContainerInputRegister,
  Header,
  PageTitleContainer,
  PageTitleText,
  ScreenBackgroundRegister,
} from './style';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {InputComponent} from '../../components/Input';
import InputPicker from '../../components/InputPicker';
import BackButton from '../../components/BackButton';

interface UsuarioCreate {
  email: string;
  nome_usuario: string;
  login: string;
  senha: string;
  tipo_usuario: string;
  data_nascimento: string;
  foto_perfil: string;
  bio: string;
  sexo: string;
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
  const [sexo, setSexo] = useState('');

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
      sexo: sexo,
    };

    criarUsuario(usuarioCreate)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => console.error('Erro ao criar usuário:', error));
  };

  const tipoUsuarioItems = [
    {label: 'Atleta', value: 'Atleta'},
    {label: 'Entusiasta', value: 'Entusiasta'},
    {label: 'Nutricionista', value: 'Nutricionista'},
    {label: 'Treinador', value: 'Treinador'},
  ];

  const sexoItems = [
    {label: 'Masculino', value: 'Masculino'},
    {label: 'Feminino', value: 'Feminino'},
    {label: 'Prefiro não responder', value: 'Outro'},
  ];

  return (
    <ScreenBackgroundRegister>
      <Header>
        <BackButton />
      </Header>
      <PageTitleContainer>
        <PageTitleText>Cadastro de Usuário</PageTitleText>
      </PageTitleContainer>
      <ContainerInputRegister>
        <ScrollView>
          <InputComponent
            onChangeText={text => setUsuario(text)}
            value={usuario}
            placeholderTextColor={'silver'}
            placeholder="Nome"
            isFocused={true}
          />
          <InputPicker
            items={tipoUsuarioItems}
            onValueChange={(value: string) => setTipoUsuario(value)}
            placeholder={{label: 'Tipo de Usuário', value: null}}
          />
          <InputComponent
            onChangeText={text => setLogin(text)}
            value={login}
            placeholderTextColor={'silver'}
            placeholder="Login"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setEmail(text)}
            value={email}
            placeholderTextColor={'silver'}
            placeholder="Email"
            keyboardType="email-address"
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'silver'}
            placeholder="Senha"
            secureTextEntry={true}
            isFocused={true}
          />
          <InputComponent
            onChangeText={text => setConfirmarSenha(text)}
            value={confirmarSenha}
            placeholderTextColor={'silver'}
            placeholder="Confirmar Senha"
            secureTextEntry={true}
            isFocused={true}
          />
          <InputPicker
            items={sexoItems}
            onValueChange={(value: string) => setSexo(value)}
            placeholder={{label: 'Sexo', value: null}}
          />
          <InputComponent
            onChangeText={(extracted: any) => {
              return setDataNascimento(extracted);
            }}
            mask="[00]/[00]/[0000]"
            placeholderTextColor={'silver'}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            keyboardType="numeric"
            isFocused={true}
          />
          <CustomButton texto="Cadastre-se" onPress={handleRegister} />
        </ScrollView>
      </ContainerInputRegister>
    </ScreenBackgroundRegister>
  );
}

export default Register;
