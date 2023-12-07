
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${({theme}) => theme.colors.backgroundColor};
`;


export const ContainerInputBio = styled.View`
flex: 1;
    width:60%;
    justify-content: center;

 

`;
export const ProfileImageContainer = styled.TouchableOpacity`
    width: 100%;
    height: 150px;
    border-radius: 75px;
    background-color:#ccc ;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    

`;
