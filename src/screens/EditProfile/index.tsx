// EditProfileScreen.js
import React, { useState }  from 'react';
import {Text} from 'react-native';
import TopImage from '../../components/TopImage';
import CustonButton from '../../components/CustomizeButton';
import { Container, ContainerInputBio, ProfileImageContainer } from './style';

import { useNavigation } from '@react-navigation/native';
import { Input } from '../../components/Input/style';



const EditProfile = () => {
  const navigation = useNavigation();
  const [bio,setBio] = useState('');

const handleNavigateToProfile = () => {
  navigation.navigate('Profile');
};
  return (
    <Container>
      <TopImage/>
      <ContainerInputBio>
      <Input
            onChangeText={text => setBio(text)}
            value={bio}
            placeholderTextColor={'white'}
            placeholder="bio"

          />
          <ProfileImageContainer >
          <Text>alterar foto</Text>
        </ProfileImageContainer>
        <CustonButton texto="Salvar alterações"onPress={handleNavigateToProfile}/>
      </ContainerInputBio>


    </Container>

  );
};
export default EditProfile;
