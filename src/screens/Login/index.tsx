import React, {useState} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import TopImage from '../../components/TopImage';
import CustonButton from '../../components/CustomizeButton';
import {
  ClickText,
  Container,
  ContainerImagem,
  ContainerInputLogin,
  ContentLogin,
  FooterDescription,
  FooterLogin,
  NewHere,
  TermsUse,
} from './style';

import {Input} from '../../components/Input/style';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView} from 'react-native';
import {useAuth} from '../../hooks/auth';

interface Login {
  login: string;
  senha: string;
}

function Login() {
  const {signIn} = useAuth();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handlelogin = () => {
    signIn({
      login,
      senha,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <KeyboardAvoidingView behavior="position">
          <ContainerImagem>
            <TopImage />
          </ContainerImagem>

          <ContentLogin>
            <ContainerInputLogin>
              <Input
                onChangeText={text => setLogin(text)}
                value={login}
                placeholderTextColor={'white'}
                placeholder="Login:"
              />
              <Input
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholderTextColor={'white'}
                placeholder="Senha:"
                secureTextEntry={true}
              />
            </ContainerInputLogin>

            <TouchableOpacity onPress={() => navigation.navigate('MyPassword')}>
              <ClickText>Esqueci minha senha</ClickText>
            </TouchableOpacity>

            <CustonButton texto="Entrar" onPress={handlelogin} />
          </ContentLogin>

          <FooterLogin>
            <NewHere>
              <FooterDescription>Novo aqui ?</FooterDescription>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <ClickText> Cadastre-se</ClickText>
              </TouchableOpacity>
            </NewHere>
            <TermsUse>
              <FooterDescription>
                Ao usar o aplicativo, você concorda com os nossos
              </FooterDescription>
              <TouchableOpacity onPress={() => navigation.navigate('TermsUse')}>
                <ClickText>Termos de uso </ClickText>
              </TouchableOpacity>
            </TermsUse>
          </FooterLogin>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
export default Login;
