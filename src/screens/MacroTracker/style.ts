import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const Navbar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: ${RFValue(10)}px ${RFValue(20)}px;
  margin-bottom: ${RFValue(20)}px;
  background-color: 'rgb(48, 48, 48)';
`;

export const Arrow = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const ContainerInput = styled.View``;
export const ButtonSubmit = styled.TouchableOpacity`
  border: 1px solid ${({theme}) => theme.colors.primary};
  padding: ${RFValue(5)}px;
  border-radius: 10px;
`;
export const ButtonSubmitText = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
  text-align: center;
`;
export const Day = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.colorWhite};
`;

export const DailyDisplay = styled.View`
  margin-bottom: ${RFValue(20)}px;
  align-items: center;
  padding: 0 ${RFValue(20)}px;
`;

export const DailyCalories = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.primary};
`;

export const DailyMacrosBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  margin-top: ${RFValue(10)}px;
`;

export const DailyMacros = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.colorWhite};
`;
export const DailyMacrosBoxGraphic = styled.View``;
export const MealContainer = styled.View`
  margin-bottom: ${RFValue(20)}px;
`;

export const MealTitleContainer = styled.View`
  margin-bottom: ${RFValue(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  width: 100%;
  background-color: 'rgb(48, 48, 48)';
  padding: ${RFValue(10)}px ${RFValue(20)}px;
`;

export const MealTitle = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.colorWhite};
`;

export const MealText = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.bold};
  color: ${({theme}) => theme.colors.colorWhite};
`;

export const AddFoodContainer = styled.View`
  justify-content: center;
  margin: 0 auto;
  padding: 0 ${RFValue(20)}px;
  margin-top: ${RFValue(10)}px;
`;

export const FoodItem = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${RFValue(10)}px;
  padding: 0 ${RFValue(0)}px 0 ${RFValue(20)}px;
  border: solid 1px ${({theme}) => theme.colors.primary};
`;
export const FoodItemNameContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
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
export const FoodListContainer = styled.TouchableOpacity`
  border: solid ${({theme}) => theme.colors.primary};
  border-radius: 16px;
  margin-bottom: ${RFValue(8)}px;
  padding: ${RFValue(8)}px 0 ${RFValue(8)}px ${RFValue(8)}px;
`;

export const FoodName = styled.Text`
  color: ${({theme}) => theme.colors.colorWhite};
`;
