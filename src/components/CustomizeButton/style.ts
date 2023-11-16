import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';


export const Container = styled.View`
  height: ${RFValue(58)}px;
`;
export const InputButton = styled.TouchableOpacity`
flex:1;
    background-color : ${({theme}) => theme.colors.primary};
    justify-content:center;
    align-items:center;
    border-radius: ${RFValue(8)}px;
    margin-bottom:${RFValue(10)}px; ;
    
`;
export const TextButton = styled.Text`
text-align:center;
    color: white;
    font-size: ${RFValue(20)}px;
    font-family:${({theme}) => theme.fonts.bold};
    
`;

