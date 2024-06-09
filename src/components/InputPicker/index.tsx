import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerContainer, dropDownPickerStyles} from './style';

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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <PickerContainer>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={onValueChange}
        placeholder={placeholder?.label || 'Select an option'}
        style={dropDownPickerStyles.containerStyle}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        dropDownContainerStyle={dropDownPickerStyles.dropDownContainerStyle}
        textStyle={dropDownPickerStyles.textStyle}
        placeholderStyle={dropDownPickerStyles.placeholderStyle}
        selectedItemContainerStyle={
          dropDownPickerStyles.selectedItemContainerStyle
        }
      />
    </PickerContainer>
  );
};

export default InputPicker;
