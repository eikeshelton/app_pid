import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity`
  width: 100%;
  padding-left: ${RFValue(10)}px;
  padding-top: ${RFValue(10)}px;
`;

export const IconBack = styled(Ionicons)`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(30)}px;
  justify-content: flex-start;
`;
