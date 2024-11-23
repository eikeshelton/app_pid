import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {PickerContainer, dropDownPickerStyles} from './style';

interface InputPickerProps {
  items: {label: string; value: any}[];
  onValueChange: (value: any) => void;
  placeholder?: {label: string; value: any};
  onOpen?: () => void;
  onClose?: () => void;
  itemKey?: string;
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

  const borderColor = open ? '#934dd2' : 'gray';

  return (
    <PickerContainer>
      <DropDownPicker
        itemKey={itemKey}
        open={open}
        onClose={() => {
          setOpen(false);
          if (onClose) {
            onClose();
          }
        }}
        onOpen={() => {
          setOpen(true);
          if (onOpen) {
            onOpen();
          }
        }}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={onValueChange}
        placeholder={placeholder?.label || 'Select an option'}
        style={{
          ...dropDownPickerStyles.containerStyle,
          borderColor: borderColor,
        }}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: false,
        }}
        dropDownContainerStyle={{
          ...dropDownPickerStyles.dropDownContainerStyle,
          borderColor: borderColor,
          maxHeight: 148,
        }}
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
