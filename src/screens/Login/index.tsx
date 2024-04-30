import React, {useState} from 'react';
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
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
import {useAuth} from '../../hooks/auth';
function Login() {
  const {signIn} = useAuth();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();

  const handlelogin = () => {
    signIn({
      login,
      senha,
    }).catch(_error => {
      setShowAlert(true);
    });
  };
  if (showAlert === true) {
    Alert.alert(
      'Erro de autenticação',
      'Login ou senha incorretos. Por favor, tente novamente.',
      [
        {text: 'OK', onPress: () => setShowAlert(false)}, // O botão "OK" fecha o alerta
      ],
    );
  }
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
