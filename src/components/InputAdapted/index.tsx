import React, {useEffect, useState} from 'react';
import {StyledTextInput} from './styles';
import {TextInputProps} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface AutoExpandingTextInputProps extends TextInputProps {
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  isFocused: boolean;
  value?: string; // tipo para o valor
  onChangeText: (text: string) => void; // função para lidar com a mudança de texto
  placeholder?: string; // opcional
  showModels?: () => void;
  placeholderTextColor: string; // Adicionando tipo para a cor do texto do placeholder
}

export function AutoExpandingTextInput({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  showModels,
  isFocused,
  textAlignVertical,
}: AutoExpandingTextInputProps) {
  const HeightInitial = RFValue(50); // Altura inicial responsiva
  const [height, setHeight] = useState(HeightInitial); // Altura inicial

  const [focusedInputId, setFocusedInputId] = useState<number | null>(null);
  const [inputId, setInputId] = useState<number>(0);

  useEffect(() => {
    const newInputId = inputId + 1; // Incrementa o inputId
    setInputId(newInputId); // Atualiza o estado do inputId
  }, []); // Executa apenas uma vez durante a montagem do componente

  const handleFocus = () => {
    setFocusedInputId(inputId);
    if (showModels) {
      showModels();
    }
  };

  const handleBlur = () => {
    setFocusedInputId(null);
  };

  return (
    <StyledTextInput
      textAlignVertical={textAlignVertical}
      multiline
      value={value}
      onChangeText={onChangeText}
      onContentSizeChange={contentSize => {
        // Atualiza a altura com base no tamanho do conteúdo
        setHeight(contentSize.nativeEvent.contentSize.height);
      }}
      // Define a altura
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      isFocused={isFocused && inputId === focusedInputId}
      inputId={inputId}
      onFocus={handleFocus}
      onBlur={handleBlur}
      height={height > HeightInitial ? height : HeightInitial} // Define a altura mínima
    />
  );
}
