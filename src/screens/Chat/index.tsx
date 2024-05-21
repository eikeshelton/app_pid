import React, {useState} from 'react';
import {Container, Header, PictureProfile} from './style';
import fotopropid from '../../assets/imagens/fotopropid.jpg';
import BackButton from '../../components/BackButton';
import {Input} from '../../components/Input/style';
export function Chat() {
  const [pesquisa, setPesquisa] = useState('');
  return (
    <Container>
      <Header>
        <BackButton />
        <PictureProfile source={fotopropid} />
      </Header>
      <Input
        onChangeText={text => setPesquisa(text)}
        value={pesquisa}
        placeholderTextColor={'white'}
        placeholder="Mensagem..."
      />
    </Container>
  );
}
