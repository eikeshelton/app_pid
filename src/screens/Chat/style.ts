import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.backgroundColor};
  padding: 5px 25px;
`;
export const Header = styled.View`
  flex-direction: row;
  width: 40%;
  align-items: flex-start;
  padding: 10px 0px;
`;
const PictureProfileHeight = Dimensions.get('window').height * 0.14;
const PictureProfileWidth = Dimensions.get('window').width * 0.2;

export const PictureProfile = styled.Image`
  border-radius: 100px;
  height: ${PictureProfileHeight}px;
  width: ${PictureProfileWidth}px;
`;
