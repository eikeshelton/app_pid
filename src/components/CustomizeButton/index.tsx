import React from 'react';
import {Container, InputButton, TextButton} from './style';
import { TouchableOpacityProps } from 'react-native';

interface CustomizeButtonProps extends TouchableOpacityProps{
  texto:string;
  onPress: () => void;
}
function CustomButton({texto, ...rest}: CustomizeButtonProps) {
  return (
    <Container>
    <InputButton {...rest}>
      <TextButton>{texto}</TextButton>
    </InputButton>
    </Container>
  );
}



export default CustomButton;
