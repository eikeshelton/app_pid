import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  padding-top: ${RFValue(10)}px;
  height: ${RFValue(50)}px;
`;

export const IconBack = styled(Ionicons)`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(30)}px;
  justify-content: flex-start;
`;
