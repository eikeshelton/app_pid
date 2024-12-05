import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';
export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const ContainerFlatList = styled.View`
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
  flex: 1;
`;
export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  padding: ${RFValue(10)}px 0 0 0;
`;
export const ContainerList = styled.View`
  border: solid 1px ${({theme}) => theme.colors.primary};
  padding: ${RFValue(9)}px ${RFValue(10)}px;
  border-radius: 10px;
  margin: ${RFValue(12)}px 0;
  gap: ${RFValue(10)}px;
`;
export const ContainerEdit = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const ButtonEdit = styled.TouchableOpacity``;
export const IconEdit = styled(Feather)`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(30)}px;
`;
export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const ContainerExerciseList = styled.View`
  border: solid 1px ${({theme}) => theme.colors.primary};
  border-radius: 10px;
  padding: ${RFValue(5)}px ${RFValue(10)}px;
`;
