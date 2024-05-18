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
import {Input} from '../../components/Input/style';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/auth';
function Login() {
  const {signIn} = useAuth();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focusedInputId, setFocusedInputId] = useState(0);
  const handleFocus = (inputId: number) => {
    setIsFocused(true);
    setFocusedInputId(inputId);
  };
  const handleBlur = () => {
    setFocusedInputId(0);
  };
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
                placeholder="Login"
                onFocus={() => handleFocus(1)}
                onBlur={handleBlur}
                isFocused={focusedInputId === 1}
              />
              <Input
                onChangeText={text => setSenha(text)}
                value={senha}
                placeholderTextColor={'white'}
                placeholder="Senha"
                secureTextEntry={true}
                onFocus={() => handleFocus(2)}
                onBlur={handleBlur}
                isFocused={focusedInputId === 2}
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
