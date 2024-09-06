import React from 'react';
import {Container, InputButton, TextButton} from './style';
import {TouchableOpacityProps} from 'react-native';

interface LiteButtonProps extends TouchableOpacityProps {
  texto: string;
  onPress: () => void;
}

function LiteButton({texto, onPress}: LiteButtonProps) {
  return (
    <Container>
      <InputButton onPress={onPress}>
        <TextButton>{texto}</TextButton>
      </InputButton>
    </Container>
  );
}

export default LiteButton;
