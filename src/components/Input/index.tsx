import React, {useState} from 'react';
import {Input} from './style';
import {TextInputMaskProps} from 'react-native-text-input-mask';
interface InputMaskProps extends TextInputMaskProps {
  isFocused: boolean;
  inputId: number; // Identificador único do campo de entrada
}

export function InputComponent({isFocused, inputId, ...rest}: InputMaskProps) {
  const [focusedInputId, setFocusedInputId] = useState(0);

  const handleFocus = () => {
    setFocusedInputId(inputId);
  };

  const handleBlur = () => {
    setFocusedInputId(0);
  };
  return (
    <Input
      {...rest}
      isFocused={isFocused && inputId === focusedInputId}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
