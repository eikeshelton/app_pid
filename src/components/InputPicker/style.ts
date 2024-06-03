import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const PickerContainer = styled.View`
  margin-bottom: ${RFValue(12)}px;
`;

export const dropDownPickerStyles = {
  containerStyle: {
    backgroundColor: 'rgba(48,48,48,0.5)',
    height: RFValue(50),
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: RFValue(18),
    paddingLeft: RFValue(14),
  },
  dropDownContainerStyle: {
    backgroundColor: 'rgba(48,48,48,1)',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: RFValue(18),
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(14),
  },
  placeholderStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(14),
  },
  selectedItemContainerStyle: {
    backgroundColor: '#934dd2',
  },
  itemSeparatorStyle: {
    height: 2,
    color: 'red',
  },
};