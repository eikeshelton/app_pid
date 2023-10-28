import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';


export const Container = styled.View`
  flex:1;
`;
export const InputButton = styled.TouchableOpacity`
flex:0.9;
    background-color : ${({theme}) => theme.colors.primary};
    justify-content:center;
    align-items:center;
    border-radius: ${RFValue(8)}px;

`;
export const TextButton = styled.Text`
text-align:center;
    color: white;
    font-size: ${RFValue(20)}px;
    font-weight: bold;
`;

