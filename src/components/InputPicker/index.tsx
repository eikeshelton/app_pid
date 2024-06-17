import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerContainer, dropDownPickerStyles} from './style';

interface InputPickerProps {
  items: {label: string; value: any}[];
  onValueChange: (value: any) => void;
  placeholder?: {label: string; value: any};
  onOpen?: () => void;
  onClose?: () => void;
  itemKey?: string; // Adicionando itemKey como opcional
}

const InputPicker: React.FC<InputPickerProps> = ({
  items,
  onValueChange,
  placeholder,
  onOpen,
  onClose,
  itemKey,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <PickerContainer>
      <DropDownPicker
        itemKey={itemKey}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={onValueChange}
        placeholder={placeholder?.label || 'Select an option'}
        style={dropDownPickerStyles.containerStyle}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: false,
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
