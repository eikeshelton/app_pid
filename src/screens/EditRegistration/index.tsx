import React, {useState} from 'react';
import {Container, ContainerInputBio} from './styles';
import {useAuth} from '../../hooks/auth';
import {Input} from '../../components/Input/style';
import BackButton from '../../components/BackButton';
import TopImage from '../../components/TopImage';
import CustonButton from '../../components/CustomizeButton';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
export function EditReg() {
  const navigation = useNavigation();
  const {editLogin, checkCredentials} = useAuth();
  const {user} = useAuth();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha_antiga, setSenha_antiga] = useState('');
  const [senha, setSenha] = useState('');
  const [senha_verifica, setSenha_verifica] = useState(false);

  const handleupdate = () => {
    if (senha_antiga !== senha) {
      editLogin({
        email: email,
        id: user.id,
        login: login,
        senha: senha,
      });
      navigation.goBack();
    } else {
      Alert.alert('A nova senha deve ser diferente da atual');
    }
  };
  const verificar = async () => {
    const credenciaisValidas = await checkCredentials({
      email: user.email,
      senha: senha_antiga,
    });

    setSenha_verifica(credenciaisValidas);
  };
  return senha_verifica ? (
    <Container>
      <BackButton />
      <TopImage />
      <ContainerInputBio showsVerticalScrollIndicator={false}>
        <Input
          onChangeText={text => setSenha(text)}
          value={senha}
          placeholderTextColor={'white'}
          placeholder="Nova senha"
          secureTextEntry={true}
        />
        <Input
          onChangeText={text => setLogin(text)}
          value={login}
          placeholderTextColor={'white'}
          placeholder="Novo login"
        />
        <Input
          onChangeText={text => setEmail(text)}
          value={email}
          placeholderTextColor={'white'}
          placeholder="Novo email:"
          keyboardType="email-address"
        />
      </ContainerInputBio>

      <CustonButton texto="Salvar alterações" onPress={handleupdate} />
    </Container>
  ) : (
    <Container>
      <BackButton />
      <TopImage />
      <ContainerInputBio showsVerticalScrollIndicator={false}>
        <Input
          value={senha_antiga}
          placeholderTextColor={'white'}
          placeholder="Senha atual"
          onChangeText={text => setSenha_antiga(text)}
          secureTextEntry={true}
        />
      </ContainerInputBio>

      <CustonButton texto="Verificar" onPress={verificar} />
    </Container>
  );
}
