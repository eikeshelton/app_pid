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
  ContainerForgotPassword,
  ContentLogin,
  FooterDescription,
  FooterLogin,
  NewHere,
  TermsUse,
} from './style';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
import {InputComponent} from '../../components/Input';
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
              <InputComponent
                onChangeText={text => setLogin(text)}
                value={login}
                placeholderTextColor={'silver'}
                placeholder="Login"
                isFocused={true} // O campo está focado quando esta prop é true
              />
              <InputComponent
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholderTextColor={'silver'}
                placeholder="Senha"
                secureTextEntry={true}
                isFocused={true} // O campo está focado quando esta prop é true
              />
            </ContainerInputLogin>

            <CustonButton texto="Entrar" onPress={handlelogin} />
          </ContentLogin>

          <FooterLogin>
            <ContainerForgotPassword>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyPassword')}>
                <ClickText>Esqueci minha senha</ClickText>
              </TouchableOpacity>
            </ContainerForgotPassword>
            <NewHere>
              <FooterDescription>Novo por aqui?</FooterDescription>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <ClickText>Cadastre-se</ClickText>
              </TouchableOpacity>
            </NewHere>
            <TermsUse>
              <FooterDescription>Ao usar o aplicativo,</FooterDescription>
              <FooterDescription>você concorda com nossos</FooterDescription>
              <TouchableOpacity onPress={() => navigation.navigate('TermsUse')}>
                <ClickText>Termos de Uso</ClickText>
              </TouchableOpacity>
            </TermsUse>
          </FooterLogin>
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}
export default Login;
