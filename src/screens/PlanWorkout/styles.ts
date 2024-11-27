import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 0 ${RFValue(10)}px;
`;
export const ContainerInputRegister = styled.View`
  width: 100%;
  flex: 1;
  padding-left: ${RFValue(24)}px;
  padding-right: ${RFValue(24)}px;
`;

export const LabelText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;
export const ContainerListHeaderComponent = styled.View``;
export const PageTitleText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
  font-size: ${RFValue(24)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  padding: ${RFValue(10)}px 0 0 0;
`;
export const ContainerList = styled.View`
  border: solid 1px ${({theme}) => theme.colors.primary};
  padding: ${RFValue(5)}px ${RFValue(10)}px;
  border-radius: 10px;
  margin: ${RFValue(12)}px 0;
`;
export const ModalContainer = styled.SafeAreaView`
  flex: 1;

  background-color: ${({theme}) => theme.colors.backgroundColor};
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const ModalHeader = styled.View`
  padding: ${RFValue(25)}px ${RFValue(20)}px 0 ${RFValue(20)}px;
`;
export const ModalBody = styled.View`
  padding: ${RFValue(20)}px;
  justify-content: space-between;
`;
export const ContainerBackButton = styled.TouchableOpacity`
  padding-top: ${RFValue(10)}px;
  height: ${RFValue(50)}px;
`;
export const IconBack = styled(Ionicons)`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(30)}px;
  justify-content: flex-start;
`;
