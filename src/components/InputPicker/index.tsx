import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {PickerContainer} from './style';

interface InputPickerProps {
  items: {label: string; value: any}[];
  onValueChange: (value: any) => void;
  placeholder?: {label: string; value: any};
}

const InputPicker: React.FC<InputPickerProps> = ({
  items,
  onValueChange,
  placeholder,
}) => {
  return (
    <PickerContainer>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: {
            color: 'white',
            fontSize: 16,
          },
        }}
      />
    </PickerContainer>
  );
};

export default InputPicker;
