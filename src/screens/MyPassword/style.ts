import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const ContainerImagem = styled.View`
  width: 100%;
  height: ${RFValue(220)}px;
  margin: ${RFValue(24)}px 0;
`;
export const ContainerEmail = styled.View`
  flex: 1;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;
