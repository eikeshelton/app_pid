import React from 'react';
import {Container, GradientInputButton, InputButton, TextButton} from './style';
import {TouchableOpacityProps} from 'react-native';

interface CustomizeButtonProps extends TouchableOpacityProps {
  texto: string;
  onPress: () => void;
}

function CustomButton({texto, ...rest}: CustomizeButtonProps) {
  return (
    <Container>
      <InputButton {...rest}>
        <GradientInputButton>
          <TextButton>{texto}</TextButton>
        </GradientInputButton>
      </InputButton>
    </Container>
  );
}

export default CustomButton;
