import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.backgroundColor};
    padding: 10px;
`;
const ImageWidth = Dimensions.get('window').width * 1;
export const Imagem = styled.Image`
width: ${ImageWidth}px;
    height: 500px;
    margin: 5px;
    
`;
