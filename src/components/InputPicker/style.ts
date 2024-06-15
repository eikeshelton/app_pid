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
    zIndex: 5,
  },
  dropDownContainerStyle: {
    backgroundColor: 'rgba(48,48,48,1)',
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: RFValue(18),
    zIndex: 10,
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: RFValue(14),
  },
  placeholderStyle: {
    color: 'silver',
    fontSize: RFValue(14),
  },
  selectedItemContainerStyle: {
    backgroundColor: '#934dd2',
  },
};
