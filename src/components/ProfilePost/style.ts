import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 0px ${RFValue(10)}px;
`;

const ImageWidth = Dimensions.get('window').width / 2 - 15;
export const Imagem = styled.Image`
  width: ${ImageWidth}px;
  height: 200px;
  margin: 5px;
`;
