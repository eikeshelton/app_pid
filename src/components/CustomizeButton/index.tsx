import React from 'react';
import {Container, InputButton, TextButton} from './style';
import { TouchableOpacityProps } from 'react-native';

interface CustomizeButtonProps extends TouchableOpacityProps{
  texto:string;

}
function CustomButton({ texto,onPress}: CustomizeButtonProps) {
  return (
    <Container>
    <InputButton onPress={onPress}>
      <TextButton>{texto}</TextButton>
    </InputButton>
    </Container>
  );
}



export default CustomButton;
