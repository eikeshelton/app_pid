import React from 'react';
import {Container, InputButton, TextButton} from './style';
import {TouchableOpacityProps} from 'react-native';

interface LiteButtonProps extends TouchableOpacityProps {
  texto: string;
  onPress: () => void;
}

function LiteButton({texto, ...rest}: LiteButtonProps) {
  return (
    <Container>
      <InputButton {...rest}>
        <TextButton>{texto}</TextButton>
      </InputButton>
    </Container>
  );
}

export default LiteButton;
