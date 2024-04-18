import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  align-items: center;
  justify-content: center;
`;
export const ContainerImagem = styled.View`
  width: 100%;
  height: ${RFValue(300)}px;
`;
export const Title = styled.Text`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${RFValue(20)}px;
`;
