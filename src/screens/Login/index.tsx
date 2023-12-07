import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import { useAuth } from '../../hooks/auth';
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

import { Input } from '../../components/Input/style';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const navigation = useNavigation();
  const data = useAuth();
  console.log(data);


  return (
    <Container>
      <ContainerImagem>
        <TopImage />
      </ContainerImagem>

      <ContentLogin>
        <ContainerInputLogin>
          <Input
            value={usuario}
            placeholder="Usuário"
            placeholderTextColor={'white'}
            onChangeText= {setUsuario}

          />
          <Input
            onChangeText={text => setSenha(text)}
            value={senha}
            placeholderTextColor={'white'}
            placeholder="Senha"
            secureTextEntry={true} // Para ocultar a senha enquanto o usuário digita
          />
        </ContainerInputLogin>

        <TouchableOpacity onPress={() => navigation.navigate('MyPassword')} >
          <ClickText>Esqueci minha senha</ClickText>
        </TouchableOpacity>

        <CustonButton
          texto="Entrar"
          onPress={() => navigation.navigate('AppTabNav')}
        />

      </ContentLogin>

      <FooterLogin>
        <NewHere>
          <FooterDescription>Novo aqui ?</FooterDescription>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <ClickText>Cadastre-se</ClickText>
          </TouchableOpacity>
        </NewHere>
        <TermsUse>
          <FooterDescription>
            Ao usar o aplicativo, você concorda com os nossos
          </FooterDescription>
          <TouchableOpacity onPress={() => navigation.navigate('TermsUse')}>
            <ClickText >Termos de uso </ClickText>
          </TouchableOpacity>
        </TermsUse>

      </FooterLogin>
    </Container>
  );
}
export default Login;
