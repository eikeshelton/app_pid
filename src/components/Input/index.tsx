import React from 'react';
import { Input } from './style';
import { TextInputProps } from 'react-native';

export function InputComponent({...rest}: TextInputProps){
  return (
    <Input
       {...rest} />
  );
}
