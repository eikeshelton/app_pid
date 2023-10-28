import React from 'react';
import {Container, InputButton, TextButton} from './style';

function BotaoPersonalizado({ texto,onPress}: { texto: string}) {
  return (
    <Container>
    <InputButton onPress={onPress}>
      <TextButton>{texto}</TextButton>
    </InputButton>
    </Container>
  );
}



export default BotaoPersonalizado;
