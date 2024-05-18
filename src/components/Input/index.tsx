import React from 'react';
import {Input} from './style';
import {TextInputMaskProps} from 'react-native-text-input-mask';

export function InputComponent({...rest}: TextInputMaskProps) {
  return <Input {...rest} />;
}
