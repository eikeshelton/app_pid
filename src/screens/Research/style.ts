import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;
export const Container = styled.View`
  padding: 22px;
`;
export const PictureContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border: solid 1px ${({theme}) => theme.colors.primary};
  border-radius: 24px;
  margin-bottom: ${RFValue(10)}px;
  margin-left: ${RFValue(10)}px;
  height: ${RFValue(150)}px;
  width: ${RFValue(130)}px;
`;

const ProfilePictureHeight = Dimensions.get('window').height * 0.1;
const ProfilePictureWidth = Dimensions.get('window').width * 0.2;
export const ProfilePicture = styled.Image`
  border-radius: 100px;
  height: ${ProfilePictureHeight}px;
  width: ${ProfilePictureWidth}px;
`;
export const ContainerPubFoll = styled.View`
  flex-direction: row;
  background-color: red;
  padding: 0 10px;
`;
export const ContainerFollowers = styled.View``;
export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
`;
export const ContainerButton = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const FilterButton = styled.TouchableOpacity`
  border-radius: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  width: 40%;
  align-items: center;
  padding: 0 ${RFValue(6)}px 0 ${RFValue(6)}px;
  border: solid 2px ${({theme}) => theme.colors.primary};
  margin-bottom: ${RFValue(10)}px;
`;
export const EventButton = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: ${RFValue(12)}px;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  width: 40%;
  align-items: center;
  justify-content: space-around;
  padding: 0 ${RFValue(6)}px 0 ${RFValue(6)}px;
  border: solid 2px ${({theme}) => theme.colors.primary};
  margin-bottom: ${RFValue(10)}px;
`;
export const EventIcon = styled(MaterialIcons)`
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const FilterContainer = styled.View``;
export const ClickableText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  font-size: ${RFValue(16)}px;
  margin: ${RFValue(10)}px 0 ${RFValue(6)}px 0;
`;
