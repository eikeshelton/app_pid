import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';



export const Container = styled.View`
  height: ${RFValue(50)}px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-style: solid;
  margin-bottom: ${RFValue(10)}px;
`;
export const InputButton = styled.TouchableOpacity`
    

`;
export const GradientInputButton = styled.View`
  height:${RFValue(50)}px;
  justify-content:center;
  align-items:center;
  border-radius: ${RFValue(15)}px;
  background-color:${({ theme }) => theme.colors.primary} ;
  
    `;
export const TextButton = styled.Text`
  text-align:center;
  color: white;
  font-size: ${RFValue(20)}px;
  font-family:${({ theme }) => theme.fonts.bold};
    
`;

