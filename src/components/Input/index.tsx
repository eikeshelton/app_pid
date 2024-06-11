import React, {useState, useEffect} from 'react';
import {Input} from './style';
import {TextInputMaskProps} from 'react-native-text-input-mask';

interface InputMaskProps extends TextInputMaskProps {
  isFocused: boolean;
}

export function InputComponent({isFocused, ...rest}: InputMaskProps) {
  const [focusedInputId, setFocusedInputId] = useState<number | null>(null);
  const [inputId, setInputId] = useState<number>(0);

  useEffect(() => {
    // Gerar um novo ID único apenas durante a montagem do componente
    const newInputId = inputId + 1; // Incrementa o inputId
    setInputId(newInputId); // Atualiza o estado do inputId
  }, []); // Executa apenas uma vez durante a montagem do componente

  const handleFocus = () => {
    setFocusedInputId(inputId);
  };

  const handleBlur = () => {
    setFocusedInputId(null);
  };

  return (
    <Input
      {...rest}
      isFocused={isFocused && inputId === focusedInputId}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputId={inputId} // Passa o inputId gerado para o componente Input
    />
  );
}
